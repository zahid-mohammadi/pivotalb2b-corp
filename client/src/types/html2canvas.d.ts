declare module 'html2canvas' {
  interface Html2CanvasOptions {
    scale?: number;
    useCORS?: boolean;
    logging?: boolean;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    scrollX?: number;
    scrollY?: number;
    backgroundColor?: string;
    windowWidth?: number;
    windowHeight?: number;
    canvas?: HTMLCanvasElement;
    foreignObjectRendering?: boolean;
    allowTaint?: boolean;
    removeContainer?: boolean;
    imageTimeout?: number;
    proxy?: string;
  }

  interface Canvas extends HTMLCanvasElement {
    width: number;
    height: number;
  }

  function html2canvas(element: HTMLElement, options?: Html2CanvasOptions): Promise<Canvas>;
  export default html2canvas;
}