import { useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AlertCircle } from 'lucide-react';
// @ts-ignore
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

import 'react-pdf/dist/Page/TextLayer.css';

// Configure the PDFJS worker locally (offline-capable)
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

interface PdfViewerProps {
  pdfUrl: string;
  page: number;
  numPages: number;
  onPageChange: (page: number) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  setNumPages: (numPages: number) => void;
}

const SkeletonPage = () => (
  <div className="w-[600px] max-w-full aspect-[1/1.4] bg-app-card border border-app-border rounded-lg p-8 animate-pulse shadow-xs flex flex-col gap-6">
    <div className="flex justify-between items-center border-b border-app-border/40 pb-4">
      <div className="h-6 w-1/3 bg-app-hover rounded-md" />
      <div className="h-6 w-12 bg-app-hover rounded-md" />
    </div>
    <div className="flex flex-col gap-4">
      <div className="h-4 w-1/4 bg-app-hover rounded-md" />
      <div className="h-10 w-full bg-app-hover rounded-md" />
      <div className="h-4 w-5/6 bg-app-hover rounded-md" />
    </div>
    <div className="flex flex-col gap-4 mt-2">
      <div className="h-4 w-1/4 bg-app-hover rounded-md" />
      <div className="h-10 w-full bg-app-hover rounded-md" />
      <div className="h-4 w-4/5 bg-app-hover rounded-md" />
    </div>
    <div className="flex-1 bg-app-hover rounded-md flex items-center justify-center text-app-text/30 font-medium text-xs">
      Loading PDF Content...
    </div>
  </div>
);

export function PdfViewer({
  pdfUrl,
  page,
  numPages,
  onPageChange,
  zoom,
  onZoomChange,
  setNumPages
}: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPageChangeTime = useRef<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Ctrl + Wheel Zoom & Normal Scroll Page Navigation Handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const zoomStep = 0.05;
        const newZoom = e.deltaY < 0 
          ? Math.min(3.0, zoom + zoomStep) 
          : Math.max(0.5, zoom - zoomStep);
        onZoomChange(newZoom);
      } else {
        // Page transition on scroll wheel when reaching top/bottom
        const now = Date.now();
        if (now - lastPageChangeTime.current < 600) return; // 600ms cooldown for smooth transitions

        const isAtBottom = Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 10;
        const isAtTop = container.scrollTop === 0;

        if (e.deltaY > 30 && isAtBottom) {
          if (page < numPages) {
            e.preventDefault();
            lastPageChangeTime.current = now;
            onPageChange(page + 1);
          }
        } else if (e.deltaY < -30 && isAtTop) {
          if (page > 1) {
            e.preventDefault();
            lastPageChangeTime.current = now;
            onPageChange(page - 1);
          }
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [zoom, onZoomChange, page, numPages, onPageChange]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-auto bg-app-bg p-6 flex justify-center items-start border-l border-app-border"
    >
      <div className="w-full max-w-full flex flex-col items-center">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<SkeletonPage />}
          error={
            <div className="flex flex-col items-center justify-center py-20 gap-2 text-rose-500 dark:text-rose-400">
              <AlertCircle className="h-8 w-8" />
              <span className="text-sm font-semibold">Failed to load PDF library. Ensure PDF exists at {pdfUrl}</span>
            </div>
          }
        >
          <Page 
            pageNumber={page} 
            scale={zoom}
            renderTextLayer={true}
            renderAnnotationLayer={false}
            loading={null}
            devicePixelRatio={Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)}
          />
        </Document>
      </div>
    </div>
  );
}
