import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  noindex?: boolean;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: Record<string, any>;
  lang?: string;
}

export function MetaTags({
  title,
  description,
  keywords,
  noindex = false,
  canonicalUrl,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  lang = "en",
}: MetaTagsProps) {
  const siteTitle = "Pivotal B2B - Lead Generation & Marketing Solutions";
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = "Transform your B2B marketing with Pivotal B2B's premium lead generation services, intelligent content strategies, and targeted marketing solutions.";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{pageTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="Pivotal B2B" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}