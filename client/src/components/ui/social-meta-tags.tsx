import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SocialMetaTagsProps {
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  type?: 'article' | 'website';
  siteName?: string;
  twitterUsername?: string;
}

export function SocialMetaTags({
  title,
  description,
  imageUrl,
  url,
  type = 'article',
  siteName = 'Pivotal B2B',
  twitterUsername = '@PivotalB2B'
}: SocialMetaTagsProps) {
  // Clean up description to avoid any HTML tags
  const cleanDescription = description?.replace(/<[^>]*>/g, '') || '';
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={cleanDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={cleanDescription} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={cleanDescription} />
      {imageUrl && <meta property="twitter:image" content={imageUrl} />}
      {twitterUsername && <meta property="twitter:site" content={twitterUsername} />}
      
      {/* Additional Meta Tags for Rich Snippets */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={new Date().toISOString()} />
          <meta property="article:author" content="Zahid Mohammadi" />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}