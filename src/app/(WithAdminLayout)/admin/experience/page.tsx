"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Pencil, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    getAllWorkExperiences,
} from "@/lib/services/work-experience.actions";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { WorkExperience, WorkExperienceSchema } from "../../../../../generated/zod";
import { toast } from "sonner";
import ConfirmModal from "@/components/shared/confirm-modal";

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<WorkExperience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentExperience, setCurrentExperience] = useState<WorkExperience | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const formSchema = WorkExperienceSchema;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: currentExperience || {
            position: "",
            company: "",
            companyWebsite: "",
            startDate: new Date(),
            endDate: null,
            onGoing: false,
            responsibilities: [],
        },
    });

    useEffect(() => {
        if (currentExperience) {
            form.reset({
                ...currentExperience,
                startDate: new Date(currentExperience.startDate),
                endDate: currentExperience.endDate ? new Date(currentExperience.endDate) : null,
            });
        } else {
            form.reset({
                position: "",
                company: "",
                companyWebsite: "",
                startDate: new Date(),
                endDate: null,
                onGoing: false,
                responsibilities: [],
            });
        }
    }, [currentExperience, form]);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const data = await getAllWorkExperiences();
                setExperiences(data);
            } catch (error) {
                console.error("Error fetching experiences:", error);
                toast.error("Failed to fetch work experiences");
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log({ values });
        setIsSubmitting(true);
        try {
            let result;
            if (currentExperience) {
                result = await updateWorkExperience({ ...values, wId: currentExperience.wId });
            } else {
                result = await createWorkExperience(values);
            }

            if (result.success) {
                toast.success(currentExperience ? "Experience updated successfully" : "Experience added successfully");
                setIsDialogOpen(false);
                if (currentExperience) {
                    const updatedExperiences = await getAllWorkExperiences();
                    setExperiences(updatedExperiences);
                } else {
                    form.reset();
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while saving the experience");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (wId: string) => {
        setIsDeleting(true);
        try {
            const result = await deleteWorkExperience(wId);
            if (result.success) {
                toast.success("Experience deleted successfully");
                const updatedExperiences = await getAllWorkExperiences();
                setExperiences(updatedExperiences);
            }
        } catch (error) {
            console.error("Error deleting experience:", error);
            toast.error("Failed to delete experience");
        } finally {
            setIsDeleting(false);
        }
    };

    const openEditDialog = (experience: WorkExperience) => {
        setCurrentExperience(experience);
        setIsDialogOpen(true);
    };

    const openCreateDialog = () => {
        setCurrentExperience(null);
        setIsDialogOpen(true);
    };

    const formatDateRange = (startDate: Date, endDate: Date | null, onGoing: boolean) => {
        const start = format(new Date(startDate), "MMM yyyy");
        if (onGoing) return `${start} - Present`;
        if (!endDate) return start;
        return `${start} - ${format(new Date(endDate), "MMM yyyy")}`;
    };

    return (
        <div className="dark:text-white p-4 md:p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-medium">Work Experience</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={openCreateDialog}
                            className="flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Add Experience
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {currentExperience ? "Edit Experience" : "Add New Experience"}
                            </DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Position*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Software Engineer" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Acme Inc." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="companyWebsite"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Website</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://company.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Start Date*</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="onGoing"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col justify-end">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="onGoing"
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                    <label
                                                        htmlFor="onGoing"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Currently working here
                                                    </label>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!form.watch("onGoing") && (
                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>End Date*</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value || undefined}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < form.getValues("startDate")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={form.control}
                                    name="responsibilities"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Responsibilities (one per line)*</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={`- Developed new features\n- Fixed bugs\n- Collaborated with team`}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    onBlur={(e) =>
                                                        field.onChange(
                                                            e.target.value.split("\n").filter((line) => line.trim())
                                                        )
                                                    }
                                                    className="min-h-[120px]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={() => handleSubmit(form.getValues())} disabled={isSubmitting}>
                                        {isSubmitting && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        {currentExperience ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="p-6">
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                                <Skeleton className="h-4 w-1/3 mt-2" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-full" />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : experiences.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p>No work experiences found</p>
                        </CardContent>
                    </Card>
                ) : (
                    experiences.map((exp) => (
                        <Card key={exp.wId} className="p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{exp.position}</CardTitle>
                                    <div className="text-gray-600 dark:text-gray-300 mt-1">
                                        {exp.company}
                                        {exp.companyWebsite && (
                                            <a
                                                href={exp.companyWebsite}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                (Website)
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {formatDateRange(exp.startDate, exp.endDate, exp.onGoing)}
                                    </div>
                                    <ul className="mt-4 space-y-2 pl-5 list-disc dark:text-gray-300">
                                        {exp.responsibilities?.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openEditDialog(exp)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <ConfirmModal
                                        trigger={
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                )}
                                            </Button>
                                        }
                                        onConfirm={() => handleDelete(exp.wId as string)}
                                        description={`Are you sure you want to delete this work experience of ${exp.position} in ${exp.company}?`}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}