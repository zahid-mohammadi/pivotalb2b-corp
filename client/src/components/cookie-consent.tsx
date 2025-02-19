import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
      description: "Thank you for accepting cookies. Your preferences have been saved.",
    });
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setOpen(false);
    toast({
      title: "Preferences saved",
      description: "You've chosen to reject cookies. Some features may be limited.",
    });
  };

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="h-auto max-w-none p-0">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="container mx-auto max-w-7xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <SheetHeader>
                <SheetTitle>Cookie Settings</SheetTitle>
                <SheetDescription>
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </SheetDescription>
              </SheetHeader>
            </div>
            <SheetFooter className="sm:justify-start md:justify-end flex gap-4 !mt-0">
              <Button variant="outline" onClick={handleReject}>
                Reject All
              </Button>
              <Button onClick={handleAccept}>
                Accept All
              </Button>
            </SheetFooter>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
