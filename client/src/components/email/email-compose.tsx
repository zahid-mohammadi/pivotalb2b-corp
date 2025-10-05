import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Send, X } from "lucide-react";

interface EmailComposeProps {
  open: boolean;
  onClose: () => void;
  defaultTo?: string;
  defaultSubject?: string;
  onSuccess?: () => void;
}

export function EmailCompose({ open, onClose, defaultTo = "", defaultSubject = "", onSuccess }: EmailComposeProps) {
  const { toast } = useToast();
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");

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
      setTo("");
      setSubject("");
      setMessage("");
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
    if (!to || !subject || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    sendMutation.mutate({
      to,
      subject,
      htmlContent: message.replace(/\n/g, "<br>"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl">
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
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              className="font-sans"
              data-testid="textarea-email-message"
            />
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
