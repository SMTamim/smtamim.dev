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
import { createBlog } from '@/lib/services/blog';

export default function PostNewBlog() {

    const { control, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<TBlog>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            blogId: "",
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            date: "",
            readTime: 0,
            featuredImage: "",
            tags: [],
        }
    });
    console.log(errors);

    const onSubmit: SubmitHandler<TBlog> = async (data) => {
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
        const res = await createBlog(data);
        console.log({ res });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Post New Blog</Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-full sm:max-w-[90%] md:max-w-3xl lg:max-w-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto rounded-xl shadow-lg">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Post New Blog</DialogTitle>
                        <DialogDescription>
                            Please enter the blog details here:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="title" className="text-right">
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
                            <Label htmlFor="slug" className="text-right">
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
                            <Label htmlFor="featuredImage" className="text-right">
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
                            <Label htmlFor="content" className="text-right">
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
                    </div>
                    <DialogFooter>
                        <Button className='bg-primary text-white' type="submit" disabled={!isValid || isSubmitting}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}