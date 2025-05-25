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
import { IBlog } from '@/lib/types';

export default function PostNewBlog() {

    const { control, handleSubmit, formState: { errors } } = useForm<IBlog>({
        defaultValues: {
            id: "",
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

    const onSubmit: SubmitHandler<IBlog> = data => {
        console.log(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Post New Blog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-full w-9/12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Post New Blog</DialogTitle>
                        <DialogDescription>
                            Please enter the blog details here:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Controller name="title" control={control} render={({ field }) => <Input {...field} />} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">
                                Slug
                            </Label>
                            <Controller name="slug" control={control} render={({ field }) => <Input {...field} />} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">
                                Featured Image
                            </Label>
                            <Controller name="slug" control={control} render={({ field }) => <Input {...field} />} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="content" className="text-right">
                                Content
                            </Label>
                            <Controller name="content" control={control} render={({ field }) => <RichTextEditor content={field.value} onChange={field.onChange} />} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

}
