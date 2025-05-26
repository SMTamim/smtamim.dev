"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { useState } from "react";
import { toast } from "sonner";
import RichTextEditor from "@/components/admin/blog-editor";
import { ProjectFormSchema } from "@/lib/types/validationSchemas";
import { createProject } from "@/lib/services/project";
import { Checkbox } from "@/components/ui/checkbox";

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

const techOptions: Option[] = [
    { label: 'nextjs', value: 'nextjs' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember', disable: true },
    { label: 'Gatsby', value: 'gatsby', disable: true },
    { label: 'Astro', value: 'astro' },
];

export default function AddProjectPage() {
    const router = useRouter();
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {
            isFeatured: false,
            title: "",
            slug: "",
            shortDescription: "",
            fullDescription: "",
            technologies: [],
            features: [""],
            challenges: [""],
            frontendDemoUrl: "",
            backendDemoUrl: "",
            frontendGitUrl: "",
            backendGitUrl: "",
        }
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        setFiles([...files, ...newFiles]);

        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);

        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const onSubmit = async (data: z.infer<typeof ProjectFormSchema>) => {
        const toastId = toast.loading("Uploading images...");
        try {
            const images = files.map(async (file) => {
                if (file instanceof File) {
                    const formData = new FormData();
                    formData.append("file", file);

                    const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    const json = await res.json();
                    console.log({ json });
                    return json.url as string;
                }
                return "";
            })

            const imageUrls = (await Promise.all(images)).filter((url) => url !== "");

            console.log("Project images:", files);
            toast.loading("Creating project...", { id: toastId })
            const response = await createProject({
                ...data,
                images: imageUrls,
                features: data.features.filter(f => f.trim() !== ""),
                challenges: data.challenges.filter(c => c.trim() !== ""),
            });
            if (response.success) {
                toast.success("Project created successfully", { id: toastId });
                router.push("/admin/projects");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || toast.error('An error occurred while saving the project.', { id: toastId }));
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <h1 className="text-2xl font-semibold">Add New Project</h1>
                <div className="w-24" /> {/* Spacer for alignment */}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="flex gap-4">
                                {/* Project Title */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Project Title*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="My Awesome Project" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Is Featured Checkbox */}
                                <FormField
                                    control={form.control}
                                    name="isFeatured"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Featured</FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="mt-2"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug*</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-2">
                                                <Input placeholder="my-awesome-project" {...field} />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        const title = form.getValues("title");
                                                        if (title) {
                                                            form.setValue("slug", generateSlug(title));
                                                        }
                                                    }}
                                                >
                                                    Generate
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="shortDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description*</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Brief description (displayed in listings)"
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fullDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Description*</FormLabel>
                                        <FormControl>
                                            <RichTextEditor
                                                content={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="technologies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Technologies Used*</FormLabel>
                                        <FormControl>
                                            <MultipleSelector
                                                options={techOptions}
                                                placeholder="Select technologies..."
                                                value={field.value.map(tech => ({ label: tech, value: tech }))}
                                                onChange={(options: Option[]) =>
                                                    form.setValue("technologies", options.map(opt => opt.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Features */}
                            <div className="space-y-2">
                                <Label>Key Features*</Label>
                                {form.watch("features").map((_, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <Input
                                            value={form.watch(`features.${index}`)}
                                            onChange={(e) => {
                                                const newFeatures = [...form.getValues("features")];
                                                newFeatures[index] = e.target.value;
                                                form.setValue("features", newFeatures);
                                            }}
                                            placeholder={`Feature ${index + 1}`}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => {
                                                const newFeatures = form.getValues("features").filter((_, i) => i !== index);
                                                form.setValue("features", newFeatures);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.setValue("features", [...form.getValues("features"), ""])}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Feature
                                </Button>
                                {form.formState.errors.features && (
                                    <p className="text-sm font-medium text-destructive">
                                        {form.formState.errors.features.message}
                                    </p>
                                )}
                            </div>

                            {/* Challenges */}
                            <div className="space-y-2">
                                <Label>Challenges & Solutions*</Label>
                                {form.watch("challenges").map((_, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <Input
                                            value={form.watch(`challenges.${index}`)}
                                            onChange={(e) => {
                                                const newChallenges = [...form.getValues("challenges")];
                                                newChallenges[index] = e.target.value;
                                                form.setValue("challenges", newChallenges);
                                            }}
                                            placeholder={`Challenge ${index + 1}`}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => {
                                                const newChallenges = form.getValues("challenges").filter((_, i) => i !== index);
                                                form.setValue("challenges", newChallenges);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.setValue("challenges", [...form.getValues("challenges"), ""])}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Challenge
                                </Button>
                                {form.formState.errors.challenges && (
                                    <p className="text-sm font-medium text-destructive">
                                        {form.formState.errors.challenges.message}
                                    </p>
                                )}
                            </div>

                            {/* URLs */}
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="frontendDemoUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Frontend Demo URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://frontend-demo.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="backendDemoUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Backend Demo URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://backend-demo.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="frontendGitUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Frontend GitHub URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://github.com/user/frontend" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="backendGitUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Backend GitHub URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://github.com/user/backend" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label>Project Images</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Plus className="w-6 h-6 mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> project screenshots
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Uploaded Images ({imagePreviews.length})</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative aspect-video">
                                                <Image
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save Project"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}