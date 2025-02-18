import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  // Simple textarea-based editor
  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          Using basic text editor. Rich text editing will be available once domain registration is complete.
        </AlertDescription>
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
          className="min-h-[200px] font-mono"
          placeholder="Enter your content here. Basic formatting is supported."
        />
        {error && (
          <div className="text-sm font-medium text-destructive">{error}</div>
        )}
      </div>
    </div>
  );
}