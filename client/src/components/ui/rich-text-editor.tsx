import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/components/theme-provider";
import { useState, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [editorContent, setEditorContent] = useState(value || "");
  
  // Handle external value changes
  useEffect(() => {
    if (value !== editorContent) {
      setEditorContent(value || "");
    }
  }, [value]);
  
  // Determine if we should use dark mode
  const isDarkMode = theme.appearance === 'dark' || 
    (theme.appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    onChange(content);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </div>
      )}
      
      {isLoading && (
        <div className="min-h-[200px] w-full flex items-center justify-center border rounded-md border-input bg-background">
          <div className="text-sm text-muted-foreground">Loading editor...</div>
        </div>
      )}
      
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <Editor
          init={{
            height: 400,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'searchreplace', 'code', 'fullscreen', 'media', 'table', 
              'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'link image media table | removeformat | help',
            content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; font-size: 14px }',
            skin: isDarkMode ? 'oxide-dark' : 'oxide',
            content_css: isDarkMode ? 'dark' : 'default',
            promotion: false,
            branding: false
          }}
          onInit={() => setIsLoading(false)}
          value={editorContent}
          onEditorChange={handleEditorChange}
        />
      </div>
      
      {error && (
        <div className="text-sm font-medium text-destructive">{error}</div>
      )}
    </div>
  );
}