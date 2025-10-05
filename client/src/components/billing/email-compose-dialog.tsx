import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";

interface EmailComposeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (message: string) => void;
  invoiceNumber: string;
  customerName: string;
  isReminder?: boolean;
  isPending?: boolean;
}

export function EmailComposeDialog({
  open,
  onOpenChange,
  onSend,
  invoiceNumber,
  customerName,
  isReminder = false,
  isPending = false,
}: EmailComposeDialogProps) {
  const [customMessage, setCustomMessage] = useState("");

  const defaultMessage = isReminder
    ? `We wanted to follow up regarding Invoice ${invoiceNumber}. We notice that payment is still outstanding.\n\nIf you have already sent payment, please disregard this message. Otherwise, we kindly request that you process this invoice at your earliest convenience.\n\nPlease let us know if you have any questions or concerns.`
    : `Thank you for your business! We've prepared Invoice ${invoiceNumber} for you.\n\nPlease review the details and let us know if you have any questions.`;

  const handleSend = () => {
    onSend(customMessage || defaultMessage);
    setCustomMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {isReminder ? "Send Payment Reminder" : "Send Invoice"}
          </DialogTitle>
          <DialogDescription>
            {isReminder
              ? `Send a payment reminder to ${customerName} for Invoice ${invoiceNumber}`
              : `Send Invoice ${invoiceNumber} to ${customerName}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message">Custom Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder={defaultMessage}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={8}
              className="resize-none"
              data-testid="textarea-custom-message"
            />
            <p className="text-sm text-muted-foreground">
              {customMessage.length > 0
                ? "Your custom message will be included in the email."
                : "Leave empty to use the default message shown above."}
            </p>
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="text-sm font-semibold">Email Details:</h4>
            <div className="text-sm space-y-1">
              <p><strong>To:</strong> {customerName}</p>
              <p><strong>Subject:</strong> {isReminder ? `Reminder: ` : ''}Invoice {invoiceNumber}</p>
              <p><strong>Tracking:</strong> Email opens will be tracked automatically</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setCustomMessage("");
              onOpenChange(false);
            }}
            disabled={isPending}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={isPending}
            data-testid="button-send-email"
          >
            {isPending ? (
              <>Sending...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {isReminder ? "Send Reminder" : "Send Invoice"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
