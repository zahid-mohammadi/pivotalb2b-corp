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
  twitterUsername = '@pivotalb2b'
}: SocialMetaTagsProps) {
  // Ensure image URL is absolute
  const absoluteImageUrl = imageUrl ? (
    imageUrl.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`
  ) : undefined;

  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {absoluteImageUrl && <meta property="og:image" content={absoluteImageUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absoluteImageUrl && <meta name="twitter:image" content={absoluteImageUrl} />}
      
      {/* Optional: Add structured data for articles */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: description,
            image: absoluteImageUrl,
            publisher: {
              '@type': 'Organization',
              name: siteName,
              logo: {
                '@type': 'ImageObject',
                url: `${window.location.origin}/logo.png`
              }
            }
          })}
        </script>
      )}
    </Helmet>
  );
}