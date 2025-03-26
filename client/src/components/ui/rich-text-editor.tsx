import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  const [content, setContent] = useState(value || "");

  // Handle external value changes
  useEffect(() => {
    if (value !== content) {
      setContent(value || "");
    }
  }, [value]);

  const handleChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent);
  };

  // Quill modules/formats configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
      ["blockquote", "code-block"],
    ],
  };

  const formats = [
    "header",
    "bold", "italic", "underline", "strike",
    "list", "bullet",
    "align",
    "link", "image",
    "blockquote", "code-block"
  ];

  return (
    <div className="space-y-2">
      {label && (
        <div className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </div>
      )}
      
      <div className="border rounded-md border-input bg-background overflow-hidden">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className="min-h-[300px] rounded-md"
          placeholder="Type your content here..."
        />
      </div>
      
      {error && (
        <div className="text-sm font-medium text-destructive">{error}</div>
      )}
    </div>
  );
}