import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { magazineApi, PublicMagazine } from "../services/api/magazineApi";
import { getMediaUrl } from "../utils/urlUtils";
// @ts-ignore
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "../css/MagazineReader.css";

const FlipBook = HTMLFlipBook as any;

// Setup pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFPage = React.forwardRef(({ pageNumber, height }: any, ref: any) => {
  return (
    <div ref={ref} className="page-wrapper" style={{ backgroundColor: 'white', overflow: 'hidden', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Page 
        pageNumber={pageNumber} 
        height={height}
        renderTextLayer={false} 
        renderAnnotationLayer={false} 
        className="pdf-page-flip"
      />
    </div>
  );
});

export default function MagazineReader() {
  const { slug } = useParams();
  const [magazine, setMagazine] = useState<PublicMagazine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);
  const flipBookRef = useRef<any>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [workspaceSize, setWorkspaceSize] = useState({ width: 0, height: 0 });
  const [pdfPageSize, setPdfPageSize] = useState<{width: number, height: number} | null>(null);

  useEffect(() => {
    const fetchMagazine = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await magazineApi.getMagazineBySlug(slug);
        setMagazine(data);
      } catch (err) {
        setError("Unable to load this magazine.");
      } finally {
        setLoading(false);
      }
    };
    fetchMagazine();
  }, [slug]);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!workspaceRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWorkspaceSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(workspaceRef.current);
    return () => observer.disconnect();
  }, []);

  const onDocumentLoadSuccess = async (pdf: any) => {
    setNumPages(pdf.numPages);
    try {
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      setPdfPageSize({ width: viewport.width, height: viewport.height });
    } catch (e) {
      console.error("Failed to get page size", e);
    }
  };

  const goToPrevPage = () => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const goToNextPage = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      readerRef.current?.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNextPage();
      if (e.key === "ArrowLeft") goToPrevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [numPages]);

  if (loading) return <div className="reader-loading">Loading magazine...</div>;
  if (error || !magazine) return (
    <div className="reader-error">
      <h2>{error || "Unable to load this magazine."}</h2>
      <Link to="/magazines" className="reader-back-btn">Try again</Link>
    </div>
  );
  if (!magazine.pdfUrl) return (
    <div className="reader-error">
      <h2>No PDF available for this magazine.</h2>
      <Link to={`/magazines/${slug}`} className="reader-back-btn">Go Back</Link>
    </div>
  );

  const paddingX = isMobile ? 100 : 140; // 50px per side on mobile, 70px per side on desktop
  const availableWidth = Math.max(0, workspaceSize.width - paddingX); 
  const availableHeight = Math.max(0, workspaceSize.height - 40); // 20px padding top/bottom

  let flipbookPageWidth = 400;
  let flipbookPageHeight = 550;
  
  if (pdfPageSize && availableWidth > 0 && availableHeight > 0) {
    const targetWidth = isTablet ? availableWidth : availableWidth / 2;
    const widthRatio = targetWidth / pdfPageSize.width;
    const heightRatio = availableHeight / pdfPageSize.height;
    const fitScale = Math.min(widthRatio, heightRatio);
    
    flipbookPageWidth = pdfPageSize.width * fitScale;
    flipbookPageHeight = pdfPageSize.height * fitScale;
  }

  return (
    <div className="magazine-reader-container" ref={readerRef}>
      {/* Top Toolbar */}
      <div className={`reader-toolbar ${isFullscreen ? 'fullscreen-hidden' : ''}`}>
        <Link to={`/magazines/${slug}`} className="reader-back">← Back to Magazine</Link>
        <div className="reader-title">{magazine.title}</div>
        <div className="reader-controls">
          <button onClick={zoomOut} title="Zoom Out">−</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} title="Zoom In">+</button>
          <button onClick={toggleFullscreen} title="Fullscreen">⛶</button>
        </div>
      </div>

      {/* Main Reader Area */}
      <div 
        className="reader-workspace flipbook-workspace" 
        ref={workspaceRef}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <button className="nav-btn prev" onClick={goToPrevPage} style={{ zIndex: 10 }}>◀</button>
        
        <div className="pdf-viewer-wrapper" style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease', transformOrigin: 'center center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Document
            file={getMediaUrl(magazine.pdfUrl)}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="pdf-loading">Loading PDF...</div>}
            error={<div className="pdf-error">Failed to load PDF file.</div>}
            className="pdf-document"
          >
            {numPages > 0 && pdfPageSize && (
              <FlipBook
                width={flipbookPageWidth}
                height={flipbookPageHeight}
                size="fixed"
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                className="flipbook-component"
                ref={flipBookRef}
                usePortrait={isTablet}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <PDFPage 
                    key={`page_${index + 1}`} 
                    pageNumber={index + 1} 
                    height={flipbookPageHeight}
                  />
                ))}
              </FlipBook>
            )}
          </Document>
        </div>

        <button className="nav-btn next" onClick={goToNextPage} style={{ zIndex: 10 }}>▶</button>
      </div>

      {/* Bottom status */}
      <div className={`reader-footer ${isFullscreen ? 'fullscreen-hidden' : ''}`}>
        {numPages > 0 ? `${numPages} Pages` : 'Loading...'}
      </div>
    </div>
  );
}
