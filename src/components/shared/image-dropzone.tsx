import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import Image from "next/image";

type Props = {
    value: File | string | null;
    onChange: (file: File) => void;
};

export default function ImageDropzone({ value, onChange }: Props) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onChange(acceptedFiles[0]);
            }
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    return (
        <div
            {...getRootProps()}
            className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-40 cursor-pointer p-4 bg-muted/50"
        >
            <input {...getInputProps()} />
            {value ? (
                <Image
                    src={typeof value === "string" ? value : URL.createObjectURL(value)}
                    alt="preview"
                    className="h-full object-contain"
                    height={100}
                    width={100}
                />
            ) : (
                <p>{isDragActive ? "Drop the image here..." : "Drag & drop or click to upload"}</p>
            )}
        </div>
    );
}
