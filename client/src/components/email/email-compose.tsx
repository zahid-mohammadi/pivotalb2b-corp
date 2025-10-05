import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Send, X, Paperclip, Trash2, Signature } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EmailComposeProps {
  open: boolean;
  onClose: () => void;
  defaultTo?: string;
  defaultSubject?: string;
  onSuccess?: () => void;
}

interface User {
  id: number;
  username: string;
  fullName?: string;
  title?: string;
  company?: string;
  phone?: string;
  website?: string;
}

export function EmailCompose({ open, onClose, defaultTo = "", defaultSubject = "", onSuccess }: EmailComposeProps) {
  const { toast } = useToast();
  const editorRef = useRef<any>(null);
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  // Generate beautiful email signature
  const getEmailSignature = () => {
    if (!user) return "";
    
    return `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-family: Arial, sans-serif;">
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr>
            <td style="padding: 0;">
              <div style="margin-bottom: 10px;">
                <strong style="font-size: 16px; color: #1f2937;">${user.fullName || user.username}</strong>
              </div>
              ${user.title ? `<div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">${user.title}</div>` : ""}
              ${user.company ? `<div style="font-size: 14px; color: #6b7280; margin-bottom: 12px;">${user.company}</div>` : ""}
              <div style="margin-top: 12px;">
                ${user.phone ? `<div style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">📞 ${user.phone}</div>` : ""}
                ${user.website ? `<div style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">🌐 <a href="${user.website}" style="color: #2563eb; text-decoration: none;">${user.website}</a></div>` : ""}
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;
  };

  useEffect(() => {
    if (open) {
      setTo(defaultTo);
      setSubject(defaultSubject);
      setAttachments([]);
    }
  }, [open, defaultTo, defaultSubject]);

  const sendMutation = useMutation({
    mutationFn: async (data: { to: string; subject: string; htmlContent: string }) => {
      const res = await apiRequest("POST", "/api/m365/send-email", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to send email");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Email sent",
        description: "Your email has been sent successfully",
      });
      if (editorRef.current) {
        editorRef.current.setContent("");
      }
      setTo("");
      setSubject("");
      setAttachments([]);
      onClose();
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send email",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSend = () => {
    if (!to || !subject) {
      toast({
        title: "Missing information",
        description: "Please provide recipient and subject",
        variant: "destructive",
      });
      return;
    }

    if (!editorRef.current) {
      toast({
        title: "Editor not ready",
        description: "Please wait for the editor to load",
        variant: "destructive",
      });
      return;
    }

    const content = editorRef.current.getContent();
    const signature = getEmailSignature();
    const fullContent = content + signature;

    sendMutation.mutate({
      to,
      subject,
      htmlContent: fullContent,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const insertSignature = () => {
    if (editorRef.current) {
      const signature = getEmailSignature();
      editorRef.current.insertContent(signature);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compose Email</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="email"
              placeholder="recipient@example.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              data-testid="input-email-to"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              data-testid="input-email-subject"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Message</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={insertSignature}
                data-testid="button-insert-signature"
              >
                <Signature className="h-4 w-4 mr-2" />
                Insert Signature
              </Button>
            </div>
            <div className="border rounded-md">
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic underline strikethrough | forecolor backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | link | removeformat | help',
                  content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
                  branding: false,
                  promotion: false,
                }}
              />
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                data-testid="button-attach-file"
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Attach Files
              </Button>
              {attachments.length > 0 && (
                <Badge variant="secondary">
                  {attachments.length} file{attachments.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <Paperclip className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        data-testid={`button-remove-attachment-${index}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={sendMutation.isPending}
            data-testid="button-cancel-email"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={sendMutation.isPending}
            data-testid="button-send-email"
          >
            {sendMutation.isPending ? (
              <>Sending...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
