import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onFileUpload: (fileUrl: string) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  className?: string;
  buttonVariant?: "default" | "outline" | "secondary";
  buttonText?: string;
  currentFileUrl?: string;
}

export function FileUpload({
  onFileUpload,
  acceptedFileTypes = ".csv,.xlsx,.xls,.pdf",
  maxFileSizeMB = 5,
  className = "",
  buttonVariant = "outline",
  buttonText = "Upload File",
  currentFileUrl,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
  
  // Extract filename from URL if it exists
  const currentFileName = currentFileUrl ? currentFileUrl.split('/').pop() : "";

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeBytes) {
      setErrorMessage(`File size exceeds maximum limit of ${maxFileSizeMB}MB`);
      return false;
    }
    
    // Check file type if acceptedFileTypes is provided
    if (acceptedFileTypes) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const acceptedTypes = acceptedFileTypes.split(',');
      
      if (!acceptedTypes.includes(fileExtension)) {
        setErrorMessage(`File type ${fileExtension} is not supported. Please upload ${acceptedFileTypes}`);
        return false;
      }
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMessage("");
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        uploadFile(droppedFile);
      } else {
        setUploadStatus("error");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        uploadFile(selectedFile);
      } else {
        setUploadStatus("error");
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFile = async (file: File) => {
    setUploadStatus("uploading");
    
    const formData = new FormData();
    
    // Determine the endpoint based on file type
    let endpoint = '/api/upload';
    
    // Check file type and select the appropriate endpoint
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === '.pdf') {
      formData.append("pdf", file);
      endpoint = '/api/upload-pdf';
    } else if (['.csv', '.xls', '.xlsx'].includes(fileExtension)) {
      formData.append("file", file);
      endpoint = '/api/upload-target-accounts';
    } else {
      formData.append("image", file);
    }
    
    try {
      // Simulating upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const next = prev + 10;
          if (next >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return next;
        });
      }, 200);
      
      // Actual upload
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUploadProgress(100);
      setUploadStatus("success");
      
      // Call the callback function with the URL (handle different response formats)
      const fileUrl = data.url || data.fileUrl;
      onFileUpload(fileUrl);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus("error");
      setErrorMessage("Upload failed. Please try again.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileUpload(""); // Clear the file URL
  };

  return (
    <div className={className}>
      {/* Show current file if it exists */}
      {currentFileUrl && !file && uploadStatus === "idle" && (
        <div className="mb-3">
          <Card className="border-dashed border-primary/40 bg-primary/5">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <File className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">{currentFileName}</p>
                  <p className="text-xs text-muted-foreground">Previously uploaded</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main upload area */}
      <div
        className={`relative border-2 rounded-md p-6 ${
          isDragging ? "border-primary" : "border-dashed border-muted-foreground/30"
        } cursor-pointer transition-colors text-center`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {uploadStatus === "idle" || uploadStatus === "error" ? (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={acceptedFileTypes}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <UploadCloud className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-medium">
                {isDragging ? "Drop file here" : "Drop file here or click to browse"}
              </p>
              <p className="text-xs text-muted-foreground">
                Accepted formats: {acceptedFileTypes.split(',').join(', ')}
              </p>
              <p className="text-xs text-muted-foreground">
                Max size: {maxFileSizeMB}MB
              </p>
              <Button variant={buttonVariant} size="sm" className="mt-2">
                {buttonText}
              </Button>
              
              {errorMessage && (
                <div className="text-destructive text-sm flex items-center mt-2">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errorMessage}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {uploadStatus === "uploading" ? (
              <>
                <div className="w-full max-w-xs">
                  <p className="text-sm mb-2 font-medium">{file?.name}</p>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              </>
            ) : uploadStatus === "success" ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                <p className="text-sm font-medium">File uploaded successfully</p>
                <p className="text-xs text-muted-foreground mb-2">{file?.name}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  Remove File
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}