import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CookieIcon, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setOpen(false);
    toast({
      title: "Preferences saved",
      description: "Cookie preferences saved successfully.",
    });
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setOpen(false);
    toast({
      title: "Preferences saved",
      description: "Only essential cookies will be used.",
    });
  };

  const handleDismiss = () => {
    localStorage.setItem("cookieConsent", "dismissed");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4"
        >
          <Card className="mx-auto max-w-4xl border border-border/50 bg-background/95 backdrop-blur-sm shadow-lg">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon and Content */}
                <div className="flex items-start gap-3 flex-1">
                  <CookieIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      We value your privacy
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      We use cookies to enhance your experience and analyze site usage. 
                      You can accept all cookies or manage your preferences.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:flex-shrink-0">
                  <div className="flex gap-2 order-2 sm:order-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleReject}
                      className="flex-1 sm:flex-initial text-xs px-3 py-2"
                    >
                      Decline
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleAccept}
                      className="flex-1 sm:flex-initial text-xs px-3 py-2"
                    >
                      Accept All
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismiss}
                    className="order-1 sm:order-2 self-end sm:self-center p-1 h-auto"
                    aria-label="Close cookie banner"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
