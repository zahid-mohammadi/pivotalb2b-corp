import { Editor } from '@tinymce/tinymce-react';
import { useState, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  const editorRef = useRef(null);
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

  if (!apiKey) {
    console.error('TinyMCE API key is not configured');
    return (
      <div className="text-destructive">
        Error: TinyMCE API key is not configured. Please check your environment variables.
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
          // @ts-ignore
          editorRef.current = editor;
        }}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
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