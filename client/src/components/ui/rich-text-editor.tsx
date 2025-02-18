import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          Using Markdown editor. Rich text editing will be available once domain registration is complete.
          Basic Markdown formatting is supported (e.g., # for headers, ** for bold, * for italic).
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        {label && (
          <div className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "write" | "preview")}>
          <TabsList className="mb-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="mt-0">
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={10}
              className="min-h-[200px] font-mono"
              placeholder="# Header
## Subheader

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)"
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="min-h-[200px] p-4 border rounded-md prose prose-sm max-w-none">
              {value.split('\n').map((line, i) => (
                <p key={i} className="mb-2">
                  {line.startsWith('# ') ? (
                    <h1 className="text-2xl font-bold">{line.slice(2)}</h1>
                  ) : line.startsWith('## ') ? (
                    <h2 className="text-xl font-bold">{line.slice(3)}</h2>
                  ) : line.startsWith('- ') ? (
                    <span className="block ml-4">• {line.slice(2)}</span>
                  ) : line.match(/^\d+\. /) ? (
                    <span className="block ml-4">{line}</span>
                  ) : (
                    line.split('**').map((segment, j) => (
                      j % 2 === 0 ? (
                        segment.split('*').map((s, k) => (
                          k % 2 === 0 ? s : <em key={k}>{s}</em>
                        ))
                      ) : <strong key={j}>{segment}</strong>
                    ))
                  )}
                </p>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="text-sm font-medium text-destructive">{error}</div>
        )}
      </div>
    </div>
  );
}