"use client";
import RichTextEditor from './blog-editor';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TBlog } from '@/lib/types';
import ImageDropzone from '../shared/image-dropzone';
import { TagsInput } from '../shared/tags-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '@/lib/schemas/blog.schema';
import { createBlog, getSingleBlog, updateBlog } from '@/lib/services/blog';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';


interface IPostNewBlogProps {
    fetchBlogs: () => void,
    onClose?: () => void;
    blogId?: string,
}


export default function PostNewBlog({ fetchBlogs, blogId, onClose }: IPostNewBlogProps) {

    const [open, setOpen] = useState(false);

    const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm<TBlog>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            blogId: "",
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            createdAt: "",
            readTime: 0,
            featuredImage: "",
            tags: [],
        }
    });

    useEffect(() => {
        if (!blogId) {
            reset();
            setOpen(false);
            return;
        }

        const fetchBlogDetails = async () => {
            const toastId = toast.loading("Fetching blog details...");
            try {
                const blog = await getSingleBlog({ params: { blogId } });
                if (blog) {
                    reset(blog);
                    setOpen(true);
                }
            } catch (err) {
                console.error("Blog fetching error:", err);
            } finally {
                toast.dismiss(toastId);
            }
        };

        fetchBlogDetails();
    }, [blogId, reset]);

    const onSubmit: SubmitHandler<TBlog> = async (data) => {
        const toastId = toast.loading(blogId ? "Updating blog..." : "Creating blog...");
        try {
            if (data.featuredImage instanceof File) {
                const formData = new FormData();
                formData.append("file", data.featuredImage);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const json = await res.json();
                console.log({ json });
                data.featuredImage = json.url;
            }

            console.log("Final blog data:", data);
            const res = blogId ? await updateBlog(data) : await createBlog(data);
            if (res.success) {
                toast.success(blogId ? "Blog updated successfully" : "Blog created successfully", { id: toastId });
                fetchBlogs();
                setOpen(false);
                reset();
                onClose?.();
            }
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message || blogId ? "Blog update failed!" : "Blog creation failed!", { id: toastId });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) onClose?.();
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">{blogId ? "Update Blog" : `Post New Blog`}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-full sm:max-w-[90%] md:max-w-3xl lg:max-w-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto rounded-xl shadow-lg">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>{blogId ? "Update Blog" : `Post New Blog`}</DialogTitle>
                        <DialogDescription>
                            Please enter the blog details here:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="title" className="mb-2">
                                Title
                            </Label>
                            <div className="items-center gap-4">
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className={errors.title ? "border-red-500" : ""}
                                        />
                                    )}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="slug" className="mb-2">
                                Slug
                            </Label>
                            <div className="items-center gap-4">
                                <Controller
                                    name="slug"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className={errors.slug ? "border-red-500" : ""}
                                        />
                                    )}
                                />
                                {errors.slug && (
                                    <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="tags">Tags</Label>
                            <Controller
                                name="tags"
                                control={control}
                                render={({ field }) => (
                                    <TagsInput value={field.value!} onChange={field.onChange} />
                                )}
                            />
                            {errors.tags && (
                                <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="featuredImage" className="mb-2">
                                Featured Image
                            </Label>
                            <div className="items-center gap-4">
                                <Controller
                                    name="featuredImage"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageDropzone value={field.value!} onChange={field.onChange} />
                                    )}
                                />
                                {errors.featuredImage && (
                                    <p className="text-red-500 text-sm mt-1">{errors.featuredImage.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="content" className="mb-2">
                                Content
                            </Label>
                            <div className="items-center gap-4">
                                <Controller
                                    name="content"
                                    control={control}
                                    render={({ field }) => (
                                        <RichTextEditor
                                            content={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="readTime" className="mb-2">
                                Read time
                            </Label>
                            <div className="items-center gap-4">
                                <Controller
                                    name="readTime"
                                    control={control}
                                    render={({ field }) => (
                                        <Input value={field.value!} onChange={field.onChange} />
                                    )}
                                />
                                {errors.readTime && (
                                    <p className="text-red-500 text-sm mt-1">{errors.readTime.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className='bg-primary text-white' type="submit" disabled={!isValid || isSubmitting}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}