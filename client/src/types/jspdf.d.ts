declare module 'jspdf' {
  export class jsPDF {
    constructor(options?: {
      orientation?: string;
      unit?: string;
      format?: number[];
    });
    addImage(
      imageData: string,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number
    ): jsPDF;
    addPage(): jsPDF;
    save(filename: string): jsPDF;
    output(type: string, options?: any): any;
  }
}