"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, X, Star, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
    createSkill,
    deleteSkill,
    getAllSkillCategories,
    getAllSkills,
    updateSkill,
    createSkillCategory,
    deleteSkillCategory
} from "@/lib/services/skill.actions";
import { Skill, SkillCategory } from "../../../../../generated/zod";
import { SkillType } from "../../../../../generated/prisma";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form schemas
const skillFormSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    type: z.nativeEnum(SkillType),
    sCategoryId: z.string().min(1, "Category is required"),
    proficiency: z.number().min(0).max(100),
    icon: z.string().optional()
});

const categoryFormSchema = z.object({
    name: z.string().min(1, "Category name is required"),
    icon: z.string().optional()
});

type SkillFormValues = z.infer<typeof skillFormSchema>;
type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function SkillsPage() {
    const [skillsList, setSkillsList] = useState<Skill[]>([]);
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);

    // Skill form
    const {
        control: skillControl,
        handleSubmit: handleSkillSubmit,
        reset: resetSkillForm,
        setValue: setSkillValue,
        // watch: watchSkill,
        formState: { errors: skillErrors }
    } = useForm<SkillFormValues>({
        resolver: zodResolver(skillFormSchema),
        defaultValues: {
            name: "",
            type: SkillType.TECHNICAL_SKILL,
            sCategoryId: "",
            proficiency: 80,
            icon: ""
        }
    });

    // Category form
    const {
        control: categoryControl,
        handleSubmit: handleCategorySubmit,
        reset: resetCategoryForm,
        formState: { errors: categoryErrors }
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: "",
            icon: ""
        }
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

    const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
    const [categoryImagePreview, setCategoryImagePreview] = useState<string | null>(null);
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [categoriesData, skillsData] = await Promise.all([
                    getAllSkillCategories(),
                    getAllSkills()
                ]);

                setCategories(categoriesData);
                setSkillsList(skillsData);
                if (categoriesData.length > 0) {
                    setSkillValue("sCategoryId", categoriesData[0].sCatId);
                }
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message || "Failed to fetch skills data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setSkillValue]);

    const handleAddSkill = async (data: SkillFormValues) => {
        try {
            setFormLoading(true);

            let imageUrl = '';
            if (imageFile instanceof File) {
                const formData = new FormData();
                formData.append("file", imageFile);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const json = await res.json();
                imageUrl = json.url as string;
            }

            const skillData = {
                ...data,
                icon: imageUrl || undefined
            };

            let result;
            if (editingSkillId) {
                result = await updateSkill({
                    ...skillData,
                    sId: editingSkillId
                });
                toast.success("Skill updated successfully");
            } else {
                result = await createSkill(skillData);
                toast.success("Skill added successfully");
            }

            if (result.success) {
                const updatedSkills = await getAllSkills();
                setSkillsList(updatedSkills);
                resetSkillForm();
                setImageFile(null);
                setImagePreview(null);
                setEditingSkillId(null);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "Failed to save skill");
            }
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteSkill = async (sId: string) => {
        try {
            setFormLoading(true);
            const result = await deleteSkill(sId);
            if (result.success) {
                toast.success("Skill deleted successfully");
                const updatedSkills = await getAllSkills();
                setSkillsList(updatedSkills);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "Failed to delete skill");
            }
        } finally {
            setFormLoading(false);
        }
    };

    const handleEditSkill = (skill: Skill) => {
        setSkillValue("name", skill.name);
        setSkillValue("type", skill.type);
        setSkillValue("sCategoryId", skill.sCategoryId);
        setSkillValue("proficiency", skill.proficiency);
        if (skill.icon) setImagePreview(skill.icon);
        setEditingSkillId(skill.sId);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    // Category management functions
    const handleAddCategory = async (data: CategoryFormValues) => {
        try {
            setFormLoading(true);

            let imageUrl = '';
            if (categoryImageFile instanceof File) {
                const formData = new FormData();
                formData.append("file", categoryImageFile);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const json = await res.json();
                imageUrl = json.url as string;
            }

            const result = await createSkillCategory({
                name: data.name,
                icon: imageUrl || ""
            });

            if (result.success) {
                toast.success("Category created successfully");
                const updatedCategories = await getAllSkillCategories();
                setCategories(updatedCategories);
                setSkillValue("sCategoryId", updatedCategories[0]?.sCatId || "");
                resetCategoryForm();
                setCategoryImageFile(null);
                setCategoryImagePreview(null);
                setIsCategoryDialogOpen(false);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "Failed to create category");
            }
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteCategory = async (sCatId: string) => {
        try {
            setFormLoading(true);
            const result = await deleteSkillCategory(sCatId);
            if (result.success) {
                toast.success("Category deleted successfully");
                const updatedCategories = await getAllSkillCategories();
                setCategories(updatedCategories);
                setSkillValue("sCategoryId", updatedCategories[0]?.sCatId || "");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "Failed to delete category");
            }
        } finally {
            setFormLoading(false);
        }
    };

    const handleCategoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCategoryImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCategoryImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeCategoryImage = () => {
        setCategoryImageFile(null);
        setCategoryImagePreview(null);
    };

    // const currentProficiency = watchSkill("proficiency");

    if (loading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-8 w-1/4" />

                {/* Add New Skill Form Skeleton */}
                <div className="bg-card rounded-lg shadow p-6 space-y-4">
                    <Skeleton className="h-6 w-1/5" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                    <Skeleton className="h-10 w-24" />
                </div>

                {/* Skills by Category Skeleton */}
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-card rounded-lg shadow p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-6 w-1/5" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {[...Array(5)].map((_, j) => (
                                    <Skeleton key={j} className="h-32 w-full rounded-lg" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Manage Skills</h1>
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCategorySubmit(handleAddCategory)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="category-name">Category Name</Label>
                                <Controller
                                    name="name"
                                    control={categoryControl}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="category-name"
                                            placeholder="Enter category name"
                                            disabled={formLoading}
                                        />
                                    )}
                                />
                                {categoryErrors.name && (
                                    <p className="text-sm text-destructive">{categoryErrors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label>Category Icon (Optional)</Label>
                                <div className="flex items-center gap-4">
                                    {categoryImagePreview ? (
                                        <div className="relative">
                                            <Image
                                                src={categoryImagePreview}
                                                alt="Category preview"
                                                width={80}
                                                height={80}
                                                className="rounded-md object-cover h-20 w-20"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeCategoryImage}
                                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                                                disabled={formLoading}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-20 w-20">
                                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    )}
                                    <label className="cursor-pointer">
                                        <span className={`text-sm font-medium text-primary hover:text-primary/90 ${formLoading ? 'opacity-50' : ''}`}>
                                            {categoryImageFile ? "Change image" : "Upload image"}
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCategoryImageUpload}
                                            className="hidden"
                                            disabled={formLoading}
                                        />
                                    </label>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={formLoading}
                                className="mt-4"
                            >
                                {formLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                        Creating...
                                    </span>
                                ) : "Create Category"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Add New Skill Form */}
            <div className="bg-card rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">
                    {editingSkillId ? "Edit Skill" : "Add New Skill"}
                </h2>
                <form onSubmit={handleSkillSubmit(handleAddSkill)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="skill-name">Skill Name</Label>
                            <Controller
                                name="name"
                                control={skillControl}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id="skill-name"
                                        placeholder="Enter skill name"
                                        disabled={formLoading}
                                    />
                                )}
                            />
                            {skillErrors.name && (
                                <p className="text-sm text-destructive">{skillErrors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Skill Type</Label>
                            <Controller
                                name="type"
                                control={skillControl}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={formLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select skill type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={SkillType.TECHNICAL_SKILL}>Technical</SelectItem>
                                            <SelectItem value={SkillType.SOFT_SKILL}>Soft Skill</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <div className="flex gap-2">
                                <Controller
                                    name="sCategoryId"
                                    control={skillControl}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={formLoading || categories?.length === 0}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={categories?.length === 0 ? "No categories" : "Select category"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories?.map(category => (
                                                    <SelectItem key={category.sCatId} value={category.sCatId}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button type="button" size="icon" variant="outline" disabled={formLoading}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create New Category</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleCategorySubmit(handleAddCategory)} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="category-name">Category Name</Label>
                                                <Controller
                                                    name="name"
                                                    control={categoryControl}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            id="category-name"
                                                            placeholder="Enter category name"
                                                            disabled={formLoading}
                                                        />
                                                    )}
                                                />
                                                {categoryErrors.name && (
                                                    <p className="text-sm text-destructive">{categoryErrors.name.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Category Icon (Optional)</Label>
                                                <div className="flex items-center gap-4">
                                                    {categoryImagePreview ? (
                                                        <div className="relative">
                                                            <Image
                                                                src={categoryImagePreview}
                                                                alt="Category preview"
                                                                width={80}
                                                                height={80}
                                                                className="rounded-md object-cover h-20 w-20"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={removeCategoryImage}
                                                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                                                                disabled={formLoading}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-20 w-20">
                                                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    <label className="cursor-pointer">
                                                        <span className={`text-sm font-medium text-primary hover:text-primary/90 ${formLoading ? 'opacity-50' : ''}`}>
                                                            {categoryImageFile ? "Change image" : "Upload image"}
                                                        </span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleCategoryImageUpload}
                                                            className="hidden"
                                                            disabled={formLoading}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={formLoading}
                                                className="mt-4"
                                            >
                                                {formLoading ? (
                                                    <span className="flex items-center gap-2">
                                                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                                        Creating...
                                                    </span>
                                                ) : "Create Category"}
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {skillErrors.sCategoryId && (
                                <p className="text-sm text-destructive">{skillErrors.sCategoryId.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Proficiency Level</Label>
                            <Controller
                                name="proficiency"
                                control={skillControl}
                                render={({ field }) => (
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => field.onChange(star * 20)}
                                                        className="text-muted-foreground hover:text-primary"
                                                        disabled={formLoading}
                                                    >
                                                        <Star
                                                            className={`h-5 w-5 ${star <= field.value / 20 ? 'fill-primary' : 'fill-muted'}`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium w-16 text-right">
                                            {field.value}%
                                        </span>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Skill Image (Optional)</Label>
                            <div className="flex items-center gap-4">
                                {imagePreview ? (
                                    <div className="relative">
                                        <Image
                                            src={imagePreview}
                                            alt="Skill preview"
                                            width={80}
                                            height={80}
                                            className="rounded-md object-cover h-20 w-20"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                                            disabled={formLoading}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-20 w-20">
                                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                )}
                                <label className="cursor-pointer">
                                    <span className={`text-sm font-medium text-primary hover:text-primary/90 ${formLoading ? 'opacity-50' : ''}`}>
                                        {imageFile ? "Change image" : "Upload image"}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={formLoading}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button
                            type="submit"
                            disabled={formLoading}
                        >
                            {formLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    {editingSkillId ? "Updating..." : "Adding..."}
                                </span>
                            ) : editingSkillId ? "Update Skill" : "Add Skill"}
                        </Button>
                        {editingSkillId && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    resetSkillForm();
                                    setImageFile(null);
                                    setImagePreview(null);
                                    setEditingSkillId(null);
                                }}
                                disabled={formLoading}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            {/* Skills by Category */}
            <div className="space-y-6">
                {categories?.length === 0 ? (
                    <div className="bg-card rounded-lg shadow p-6 text-center">
                        <p className="text-muted-foreground">No skill categories found</p>
                    </div>
                ) : (
                    categories?.map((category) => {
                        const categorySkills = skillsList.filter(
                            (skill) => skill.sCategoryId === category.sCatId
                        );

                        if (categorySkills.length === 0) return null;

                        return (
                            <div key={category.sCatId} className="bg-card rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        {category.icon && (
                                            <Image
                                                src={category.icon}
                                                width={24}
                                                height={24}
                                                alt={category.name}
                                                className="dark:invert"
                                            />
                                        )}
                                        <h2 className="text-lg font-semibold">{category.name}</h2>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteCategory(category.sCatId)}
                                        disabled={formLoading}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {categorySkills.map((skill) => (
                                        <div
                                            key={skill.sId}
                                            className="relative group border rounded-lg p-4 hover:bg-accent transition-colors"
                                        >
                                            {skill.icon ? (
                                                <div className="flex flex-col items-center space-y-2">
                                                    <Image
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        width={40}
                                                        height={40}
                                                        className="h-10 w-10 object-contain"
                                                    />
                                                    <span className="text-sm text-center">{skill.name}</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center space-y-2">
                                                    <div className="flex items-center justify-center h-10 w-10 bg-muted rounded-full mx-auto">
                                                        <span className="text-lg font-medium">
                                                            {skill.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-center">{skill.name}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-center mt-2">
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`h-3 w-3 ${star <= skill.proficiency / 20
                                                                ? 'fill-primary'
                                                                : 'fill-muted'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteSkill(skill.sId)}
                                                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-opacity"
                                                disabled={formLoading}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleEditSkill(skill)}
                                                className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 bg-primary text-primary-foreground rounded-full p-1 hover:bg-primary/90 transition-opacity"
                                                disabled={formLoading}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}