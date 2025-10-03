export function addTrackingPixel(htmlContent: string, sendId: number, baseUrl: string): string {
  const trackingPixel = `<img src="${baseUrl}/api/track/open/${sendId}" width="1" height="1" alt="" style="display:none;" />`;
  
  // Try to insert before closing </body> tag
  if (htmlContent.includes('</body>')) {
    return htmlContent.replace('</body>', `${trackingPixel}</body>`);
  }
  
  // If no </body> tag, append to end
  return htmlContent + trackingPixel;
}

export function wrapLinksWithTracking(htmlContent: string, sendId: number, baseUrl: string): string {
  // Match all <a> tags with href attributes
  const linkRegex = /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>/gi;
  
  return htmlContent.replace(linkRegex, (match, before, url, after) => {
    // Don't track tracking pixels or internal anchors
    if (url.startsWith('#') || url.includes('/api/track/')) {
      return match;
    }
    
    // Encode the original URL and create tracking URL
    const encodedUrl = encodeURIComponent(url);
    const trackingUrl = `${baseUrl}/api/track/click/${sendId}?url=${encodedUrl}`;
    
    return `<a ${before}href="${trackingUrl}"${after}>`;
  });
}

export function getBaseUrl(req: any): string {
  const protocol = req.protocol || 'https';
  const host = req.get('host') || req.hostname || 'localhost:5000';
  return `${protocol}://${host}`;
}
