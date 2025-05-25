'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Image from '@tiptap/extension-image'
import { useCallback, useRef } from 'react'
import MenuBar from './blog-menu-bar'
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)


interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}


export default function RichTextEditor({
    content,
    onChange,
}: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3 dark:text-white",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3 dark:text-white",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 dark:bg-slate-900 py-2 px-3 dark:text-white prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            },
            handleDrop: (view, event, slice, moved) => {
                if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
                    const file = event.dataTransfer.files[0]
                    if (file.type.includes('image/')) {
                        event.preventDefault()
                        handleImageUpload(file)
                        return true
                    }
                }
                return false
            },
            handlePaste: (view, event) => {
                const items = event.clipboardData?.items
                if (items) {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].type.includes('image/')) {
                            const file = items[i].getAsFile()
                            if (file) {
                                event.preventDefault()
                                handleImageUpload(file)
                                return true
                            }
                        }
                    }
                }
                return false
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const handleImageUpload = useCallback((file: File) => {
        if (!editor) return

        // Validate file type
        if (!file.type.includes('image/')) {
            alert('Please select an image file')
            return
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB')
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            const src = e.target?.result as string
            if (src) {
                // Insert image at current cursor position
                editor.chain().focus().setImage({ src }).run()
            }
        }
        reader.readAsDataURL(file)
    }, [editor])

    const openImageDialog = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleImageUpload(file)
        }
        // Reset input value to allow selecting the same file again
        e.target.value = ''
    }, [handleImageUpload])

    // Add image upload function to editor for use in MenuBar
    if (editor) {
        (editor as any).uploadImage = openImageDialog
    }

    return (
        <div className="w-full">
            <MenuBar editor={editor} onImageUpload={openImageDialog} />
            <div className="relative">
                <EditorContent editor={editor} />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                />
            </div>

            {/* Upload instructions */}
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <p>💡 Tips: You can also drag & drop images or paste them directly into the editor</p>
            </div>
        </div>
    );
}