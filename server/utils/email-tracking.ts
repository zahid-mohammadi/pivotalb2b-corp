export function addTrackingPixel(htmlContent: string, sendId: number, baseUrl: string): string {
  const trackingPixel = `<img src="${baseUrl}/api/track/open/${sendId}" width="1" height="1" alt="" style="display:none;" />`;
  
  // Try to insert before closing </body> tag
  if (htmlContent.includes('</body>')) {
    return htmlContent.replace('</body>', `${trackingPixel}</body>`);
  }
  
  // If no </body> tag, append to end
  return htmlContent + trackingPixel;
}

export function getBaseUrl(req: any): string {
  const protocol = req.protocol || 'https';
  const host = req.get('host') || req.hostname || 'localhost:5000';
  return `${protocol}://${host}`;
}
