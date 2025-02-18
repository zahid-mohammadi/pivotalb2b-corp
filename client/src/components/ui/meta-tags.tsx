import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  noindex?: boolean;
}

export function MetaTags({
  title,
  description,
  keywords,
  noindex = false,
}: MetaTagsProps) {
  const siteTitle = "Pivotal B2B - Lead Generation & Marketing Solutions";
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
