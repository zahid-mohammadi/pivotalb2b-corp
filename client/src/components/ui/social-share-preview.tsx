import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Facebook, Linkedin } from "lucide-react";

interface SocialSharePreviewProps {
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
}

export function SocialSharePreview({ 
  title, 
  description, 
  imageUrl, 
  url 
}: SocialSharePreviewProps) {
  const [activeTab, setActiveTab] = useState("twitter");
  
  // Ensure image URL is absolute
  const absoluteImageUrl = imageUrl ? (
    imageUrl.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`
  ) : undefined;
  
  // Truncate description based on platform
  const truncateDescription = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };
  
  const twitterDescription = truncateDescription(description, 200);
  const facebookDescription = truncateDescription(description, 300);
  const linkedinDescription = truncateDescription(description, 300);
  
  // Get domain from URL
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain;
    } catch (e) {
      return window.location.hostname;
    }
  };
  
  return (
    <div className="w-full">
      <Tabs 
        defaultValue="twitter" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="twitter" className="flex items-center gap-1">
            <Twitter className="w-4 h-4" />
            <span className="hidden sm:inline">Twitter</span>
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-1">
            <Facebook className="w-4 h-4" />
            <span className="hidden sm:inline">Facebook</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-1">
            <Linkedin className="w-4 h-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Twitter Preview */}
        <TabsContent value="twitter" className="mt-4">
          <Card className="border border-muted shadow-sm">
            <CardContent className="p-0 overflow-hidden rounded-md">
              <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-md shadow overflow-hidden">
                {/* Twitter Card */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
                  {/* Image */}
                  {absoluteImageUrl && (
                    <div className="w-full h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={absoluteImageUrl} 
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {getDomain(url)}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{twitterDescription}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Facebook Preview */}
        <TabsContent value="facebook" className="mt-4">
          <Card className="border border-muted shadow-sm">
            <CardContent className="p-0 overflow-hidden rounded-md">
              <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-md shadow overflow-hidden">
                {/* Facebook Card */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
                  {/* Image */}
                  {absoluteImageUrl && (
                    <div className="w-full h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={absoluteImageUrl} 
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-3">
                    <div className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                      {getDomain(url)}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl mb-2 line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{facebookDescription}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* LinkedIn Preview */}
        <TabsContent value="linkedin" className="mt-4">
          <Card className="border border-muted shadow-sm">
            <CardContent className="p-0 overflow-hidden rounded-md">
              <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-md shadow overflow-hidden">
                {/* LinkedIn Card */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
                  {/* Image */}
                  {absoluteImageUrl && (
                    <div className="w-full h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={absoluteImageUrl} 
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center text-gray-500">
                        <img src="/logo.png" alt="Company" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">Pivotal B2B</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Shared via LinkedIn</div>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{linkedinDescription}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {getDomain(url)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}