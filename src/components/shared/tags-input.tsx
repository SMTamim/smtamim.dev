import { useState, KeyboardEvent } from "react";

interface TagsInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
}

export function TagsInput({ value, onChange }: TagsInputProps) {
    const [input, setInput] = useState("");

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInput("");
        }
    };

    const removeTag = (index: number) => {
        const newTags = value.filter((_, i) => i !== index);
        onChange(newTags);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {value.map((tag, i) => (
                    <span key={i} className="flex items-center bg-muted px-2 py-1 rounded text-sm">
                        {tag}
                        <button type="button" onClick={() => removeTag(i)} className="ml-1 text-red-500">×</button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag and press Enter"
                />
                <button type="button" onClick={addTag} className="bg-primary text-white px-3 py-1 rounded">
                    Add
                </button>
            </div>
        </div>
    );
}
