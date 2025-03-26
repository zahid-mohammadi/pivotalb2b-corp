import React, { useState, useRef, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  X,
  Download
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

interface SocialSharePreviewProps {
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
}

const PLATFORMS = {
  twitter: {
    name: 'Twitter',
    icon: Twitter,
    dimensions: '1200 × 675px',
    characterLimit: 280,
    backgroundColor: '#15202b',
    textColor: '#ffffff',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    dimensions: '1200 × 630px',
    characterLimit: 63206,
    backgroundColor: '#ffffff',
    textColor: '#1c1e21',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    dimensions: '1200 × 627px',
    characterLimit: 3000,
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  }
};

export function SocialSharePreview({ 
  title, 
  description,
  imageUrl,
  url 
}: SocialSharePreviewProps) {
  const [platform, setPlatform] = useState<'twitter' | 'facebook' | 'linkedin'>('twitter');
  const [customTitle, setCustomTitle] = useState(title);
  const [customDescription, setCustomDescription] = useState(description);
  const [copied, setCopied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Reset custom fields when dialog opens
  useEffect(() => {
    if (dialogOpen) {
      setCustomTitle(title);
      setCustomDescription(description);
      setCopied(false);
    }
  }, [dialogOpen, title, description]);

  const handlePlatformChange = (value: string) => {
    setPlatform(value as 'twitter' | 'facebook' | 'linkedin');
  };

  const remainingChars = PLATFORMS[platform].characterLimit - 
    (customTitle.length + customDescription.length + url.length + 5); // +5 for spaces and other chars

  const generateShareUrl = () => {
    const encodedTitle = encodeURIComponent(customTitle);
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      default:
        return '';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link copied",
      description: "Share URL has been copied to clipboard",
    });
  };

  const downloadPreview = async () => {
    if (!previewRef.current) return;
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Better quality
        backgroundColor: PLATFORMS[platform].backgroundColor,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `${platform}-preview-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "Preview downloaded",
        description: `Your ${PLATFORMS[platform].name} preview has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating the preview image",
        variant: "destructive"
      });
    }
  };

  const handleShare = () => {
    const shareUrl = generateShareUrl();
    window.open(shareUrl, '_blank');
  };

  const formatDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return url;
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Preview
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Social Media Share Preview</DialogTitle>
          <DialogDescription>
            Customize how your content will appear when shared on social media.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue="twitter" 
          value={platform} 
          onValueChange={handlePlatformChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              Facebook
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={customTitle} 
                onChange={(e) => setCustomTitle(e.target.value)}
                maxLength={100}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={customDescription} 
                onChange={(e) => setCustomDescription(e.target.value)}
                rows={3}
                maxLength={platform === 'twitter' ? 220 : 1000}
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              Recommended image: {PLATFORMS[platform].dimensions}
              {platform === 'twitter' && (
                <span className="ml-2">
                  {remainingChars} characters remaining
                </span>
              )}
            </p>
            
            <Card className="border shadow-sm overflow-hidden" ref={previewRef}>
              <CardContent className="p-0">
                {/* Preview container */}
                <div
                  style={{
                    backgroundColor: PLATFORMS[platform].backgroundColor,
                    color: PLATFORMS[platform].textColor,
                    fontFamily: PLATFORMS[platform].fontFamily,
                    padding: '16px',
                  }}
                >
                  {/* Platform header */}
                  <div className="flex items-center gap-2 mb-3">
                    {React.createElement(PLATFORMS[platform].icon, { 
                      className: 'h-5 w-5' 
                    })}
                    <span className="text-sm font-bold">
                      {PLATFORMS[platform].name} Preview
                    </span>
                  </div>
                  
                  {/* Content preview */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {imageUrl && (
                      <div className="md:w-2/5">
                        <div className="rounded-md overflow-hidden bg-gray-100 aspect-video">
                          <img 
                            src={imageUrl} 
                            alt="Preview"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className={imageUrl ? 'md:w-3/5' : 'w-full'}>
                      {platform === 'twitter' ? (
                        <div className="space-y-2">
                          <p className="font-bold text-base line-clamp-2">{customTitle}</p>
                          <p className="text-sm opacity-80 line-clamp-3">{customDescription}</p>
                          <div className="text-xs opacity-60 flex items-center gap-1 mt-2">
                            <span>{formatDomain(url)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-xs opacity-60">{formatDomain(url)}</div>
                          <p className="font-bold text-base line-clamp-2">{customTitle}</p>
                          <p className="text-sm opacity-80 line-clamp-3">{customDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            Copy Link
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={downloadPreview}
          >
            <Download className="h-4 w-4" />
            Download Preview
          </Button>
          
          <Button 
            size="sm" 
            className="gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share Now
          </Button>
          
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}