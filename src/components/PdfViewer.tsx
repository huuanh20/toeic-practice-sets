import { useRef, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AlertCircle, ExternalLink } from 'lucide-react';
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
      Đang tải dữ liệu PDF...
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

  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useIframeFallback, setUseIframeFallback] = useState<boolean>(false);

  // Derive direct download URL for fallback iframe
  const getDirectUrl = () => {
    if (pdfUrl.includes('file=')) {
      const fileName = pdfUrl.split('file=')[1];
      return `https://github.com/huuanh20/toeic-practice-sets/releases/download/v1.0.0/${fileName}`;
    }
    if (pdfUrl.startsWith('/cdn-media/')) {
      const fileName = pdfUrl.replace('/cdn-media/', '');
      return `https://github.com/huuanh20/toeic-practice-sets/releases/download/v1.0.0/${fileName}`;
    }
    if (pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://')) {
      return pdfUrl;
    }
    return window.location.origin + pdfUrl;
  };

  // Fetch PDF binary data to bypass Content-Type issues and CORS restrictions
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setUseIframeFallback(false);
    setPdfData(null);

    fetch(pdfUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.arrayBuffer();
      })
      .then((buffer) => {
        if (isMounted) {
          setPdfData(new Uint8Array(buffer));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn("Client pdf fetch error, switching to embedded viewer:", err);
          setUseIframeFallback(true);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

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
        const now = Date.now();
        if (now - lastPageChangeTime.current < 600) return;

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

  const directUrl = getDirectUrl();

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-auto bg-app-bg p-4 md:p-6 flex justify-center items-start border-l border-app-border relative min-h-[500px]"
    >
      <div className="w-full h-full max-w-full flex flex-col items-center justify-center">
        {isLoading && <SkeletonPage />}

        {useIframeFallback && (
          <div className="w-full h-[calc(100vh-140px)] min-h-[600px] flex flex-col rounded-lg overflow-hidden border border-app-border bg-app-card shadow-sm">
            <div className="p-2 bg-app-hover border-b border-app-border flex items-center justify-between px-4">
              <span className="text-xs font-medium text-app-text-muted">Chế độ xem nhúng Google Docs PDF Viewer</span>
              <a
                href={directUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-500 hover:underline flex items-center gap-1 font-medium"
              >
                Tải file PDF gốc <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(directUrl)}&embedded=true`}
              className="w-full flex-1 border-0"
              title="PDF Embedded Viewer"
            />
          </div>
        )}

        {!isLoading && !useIframeFallback && pdfData && (
          <Document
            file={{ data: pdfData }}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<SkeletonPage />}
            onLoadError={() => setUseIframeFallback(true)}
            error={
              <div className="flex flex-col items-center justify-center py-16 px-4 gap-4 text-center">
                <AlertCircle className="h-8 w-8 text-rose-500" />
                <span className="text-sm font-semibold text-app-text">Đang chuyển sang giao diện đọc PDF dự phòng...</span>
                <button
                  onClick={() => setUseIframeFallback(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-medium"
                >
                  Xem qua Google Docs Viewer
                </button>
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
        )}
      </div>
    </div>
  );
}
