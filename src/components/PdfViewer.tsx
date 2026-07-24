import { useRef, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
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
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  // Fetch PDF binary data to bypass Content-Type issues and CORS restrictions
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setFetchError(null);
    setPdfData(null);

    fetch(pdfUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
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
          console.error("Error fetching PDF:", err);
          setFetchError(err.message || "Không thể tải file PDF");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pdfUrl, reloadKey]);

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

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-auto bg-app-bg p-6 flex justify-center items-start border-l border-app-border"
    >
      <div className="w-full max-w-full flex flex-col items-center">
        {isLoading && <SkeletonPage />}

        {fetchError && (
          <div className="flex flex-col items-center justify-center py-16 px-4 gap-4 text-center">
            <div className="p-3 bg-rose-500/10 rounded-full text-rose-500">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-app-text">Không thể hiển thị file PDF</span>
              <span className="text-xs text-app-text-muted max-w-md">{fetchError}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => setReloadKey((k) => k + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-app-card border border-app-border hover:bg-app-hover rounded-lg text-xs font-medium text-app-text transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Thử lại
              </button>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Mở link trực tiếp
              </a>
            </div>
          </div>
        )}

        {!isLoading && !fetchError && pdfData && (
          <Document
            file={{ data: pdfData }}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<SkeletonPage />}
            error={
              <div className="flex flex-col items-center justify-center py-20 gap-2 text-rose-500 dark:text-rose-400">
                <AlertCircle className="h-8 w-8" />
                <span className="text-sm font-semibold">Lỗi cấu trúc PDF. Vui lòng mở lại trang.</span>
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
