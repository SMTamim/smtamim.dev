"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { skills } from "@/lib/constants/skills";
import { ImageIcon, X, Star } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type Skill = {
    name: string;
    type: "technical" | "soft";
    category: string;
    proficiency: number;
    imageUrl?: string;
    icon?: string;
};

export default function SkillsPage() {
    const [skillsList, setSkillsList] = useState<Skill[]>(() => [
        ...skills.technical.map(skill => ({
            ...skill,
            type: "technical" as const
        })),
        ...skills.soft.map(skill => ({
            ...skill,
            type: "soft" as const
        }))
    ]);

    const [newSkill, setNewSkill] = useState("");
    const [skillType, setSkillType] = useState<"technical" | "soft">("technical");
    const [skillCategory, setSkillCategory] = useState(skills.categories[0].name);
    const [proficiency, setProficiency] = useState(80);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleAddSkill = () => {
        if (newSkill.trim() === "") return;

        const newSkillItem: Skill = {
            name: newSkill,
            type: skillType,
            category: skillCategory,
            proficiency,
            imageUrl: imagePreview || undefined
        };

        setSkillsList([...skillsList, newSkillItem]);
        setNewSkill("");
        setImageFile(null);
        setImagePreview(null);
        setProficiency(80);
    };

    const handleDeleteSkill = (skillName: string) => {
        setSkillsList(skillsList.filter(skill => skill.name !== skillName));
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

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Manage Skills</h1>
            </div>

            {/* Add New Skill Form */}
            <div className="bg-card rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Add New Skill</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="skill-name">Skill Name</Label>
                            <Input
                                id="skill-name"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Enter skill name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Skill Type</Label>
                            <Select
                                value={skillType}
                                onValueChange={(value: "technical" | "soft") => setSkillType(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select skill type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technical">Technical</SelectItem>
                                    <SelectItem value="soft">Soft Skill</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                                value={skillCategory}
                                onValueChange={setSkillCategory}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {skills.categories.map(category => (
                                        <SelectItem key={category.name} value={category.name}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Proficiency Level</Label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setProficiency(star * 20)}
                                                className="text-muted-foreground hover:text-primary"
                                            >
                                                <Star
                                                    className={`h-5 w-5 ${star <= proficiency / 20 ? 'fill-primary' : 'fill-muted'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <span className="text-sm font-medium w-16 text-right">
                                    {proficiency}%
                                </span>
                            </div>
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
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
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
                                    <span className="text-sm font-medium text-primary hover:text-primary/90">
                                        {imageFile ? "Change image" : "Upload image"}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleAddSkill} className="mt-4">
                        Add Skill
                    </Button>
                </div>
            </div>

            {/* Skills by Category */}
            <div className="space-y-6">
                {skills.categories.map((category) => {
                    const categorySkills = skillsList.filter(
                        (skill) => skill.category === category.name
                    );

                    if (categorySkills.length === 0) return null;

                    return (
                        <div key={category.name} className="bg-card rounded-lg shadow p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Image
                                    src={category.icon}
                                    width={24}
                                    height={24}
                                    alt={category.name}
                                    className="dark:invert"
                                />
                                <h2 className="text-lg font-semibold">{category.name}</h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {categorySkills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="relative group border rounded-lg p-4 hover:bg-accent transition-colors"
                                    >
                                        {skill.imageUrl ? (
                                            <div className="flex flex-col items-center space-y-2">
                                                <Image
                                                    src={skill.imageUrl}
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
                                            onClick={() => handleDeleteSkill(skill.name)}
                                            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-opacity"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}