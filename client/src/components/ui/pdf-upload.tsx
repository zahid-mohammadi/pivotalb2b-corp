interface PdfUploadProps {
  onPdfUpload: (url: string) => void;
  currentPdfUrl?: string;
}

export function PdfUpload({ onPdfUpload, currentPdfUrl }: PdfUploadProps) {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }

      const data = await response.json();
      onPdfUpload(data.url);
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        id="pdf-upload"
      />
      <div className="flex items-center gap-4">
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
        >
          Upload PDF
        </label>
        {currentPdfUrl && (
          <a
            href={currentPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View Current PDF
          </a>
        )}
      </div>
    </div>
  );
}
