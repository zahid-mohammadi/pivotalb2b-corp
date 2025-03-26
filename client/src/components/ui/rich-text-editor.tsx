import { useState, useEffect, useRef } from "react";
import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, 
  AlignJustify, Link2, Image, Code, Heading1, Heading2, Heading3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, label, error }: RichTextEditorProps) {
  const [content, setContent] = useState(value || "");
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  // Handle external value changes
  useEffect(() => {
    if (value !== content) {
      setContent(value || "");
    }
  }, [value, content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onChange(e.target.value);
  };

  const insertTag = (startTag: string, endTag: string = "", defaultContent: string = "") => {
    if (!editorRef.current) return;
    
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultContent;
    
    const newContent = 
      content.substring(0, start) + 
      startTag + selectedText + endTag + 
      content.substring(end);
    
    setContent(newContent);
    onChange(newContent);
    
    // Set focus back to textarea after the insertion
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + startTag.length;
      textarea.selectionEnd = start + startTag.length + selectedText.length;
    }, 0);
  };
  
  const insertPrompt = (tag: string, promptMessage: string, defaultPlaceholder: string = "") => {
    const userInput = prompt(promptMessage);
    if (userInput !== null) {
      if (tag === 'link') {
        insertTag(`<a href="${userInput}" target="_blank">`, '</a>', defaultPlaceholder);
      } else if (tag === 'image') {
        insertTag(`<img src="${userInput}" alt="Image" style="max-width: 100%;" />`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const textarea = editorRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert tab
      const newContent = 
        content.substring(0, start) + 
        "    " + // 4 spaces for tab
        content.substring(end);
      
      setContent(newContent);
      onChange(newContent);
      
      // Set caret position after the tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </div>
      )}
      
      <div className="border rounded-md border-input bg-background overflow-hidden">
        <div className="p-1 border-b flex flex-wrap gap-1 items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<strong>', '</strong>')}
            title="Bold"
            type="button">
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<em>', '</em>')}
            title="Italic"
            type="button">
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<u>', '</u>')}
            title="Underline"
            type="button">
            <Underline className="h-4 w-4" />
          </Button>
          <span className="w-px h-6 bg-border mx-1"></span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<h1>', '</h1>')}
            title="Heading 1"
            type="button">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<h2>', '</h2>')}
            title="Heading 2"
            type="button">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<h3>', '</h3>')}
            title="Heading 3"
            type="button">
            <Heading3 className="h-4 w-4" />
          </Button>
          <span className="w-px h-6 bg-border mx-1"></span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>', 'List item')}
            title="Bulleted List"
            type="button">
            <List className="h-4 w-4" />
          </Button>
          <span className="w-px h-6 bg-border mx-1"></span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<div style="text-align: left;">', '</div>')}
            title="Align Left"
            type="button">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<div style="text-align: center;">', '</div>')}
            title="Align Center"
            type="button">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<div style="text-align: right;">', '</div>')}
            title="Align Right"
            type="button">
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<div style="text-align: justify;">', '</div>')}
            title="Justify"
            type="button">
            <AlignJustify className="h-4 w-4" />
          </Button>
          <span className="w-px h-6 bg-border mx-1"></span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertPrompt('link', 'Enter URL:', 'Link text')}
            title="Insert Link"
            type="button">
            <Link2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertPrompt('image', 'Enter image URL:')}
            title="Insert Image"
            type="button">
            <Image className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => insertTag('<pre><code>', '</code></pre>')}
            title="Code"
            type="button">
            <Code className="h-4 w-4" />
          </Button>
        </div>
        
        <Textarea
          ref={editorRef}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          rows={12}
          className="min-h-[300px] border-0 focus-visible:ring-0 resize-y rounded-none rounded-b-md p-3"
          placeholder="Type your content here..."
        />
      </div>
      
      {error && (
        <div className="text-sm font-medium text-destructive">{error}</div>
      )}
    </div>
  );
}