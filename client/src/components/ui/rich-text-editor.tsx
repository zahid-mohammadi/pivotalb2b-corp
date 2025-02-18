import { Editor } from '@tinymce/tinymce-react';
import { useState, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  const editorRef = useRef(null);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  // Get API key from environment
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setEditorError('TinyMCE API key is not configured');
    } else {
      setEditorError(null);
    }
  }, [apiKey]);

  if (editorError) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertDescription>{editorError}</AlertDescription>
        </Alert>
        <div className="space-y-2">
          {label && (
            <div className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </div>
          )}
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={10}
            className="min-h-[200px]"
          />
          {error && (
            <div className="text-sm font-medium text-destructive">{error}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </div>
      )}
      <Editor
        apiKey={apiKey}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setIsEditorLoaded(true);
        }}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'textcolor', 'forecolor', 'backcolor'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; font-size: 14px }',
        }}
      />
      {error && (
        <div className="text-sm font-medium text-destructive">{error}</div>
      )}
    </div>
  );
}