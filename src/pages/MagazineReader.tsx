import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { magazineApi, PublicMagazine } from "../services/api/magazineApi";
import { getMediaUrl } from "../utils/urlUtils";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "../css/MagazineReader.css";

// Setup pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function MagazineReader() {
  const { slug } = useParams();
  const [magazine, setMagazine] = useState<PublicMagazine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => {
      if (isMobile || prev <= 2) return Math.max(prev - 1, 1);
      return Math.max(prev - 2, 1); // jump 2 pages on desktop
    });
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => {
      if (isMobile) return Math.min(prev + 1, numPages);
      if (prev === 1) return 2; // from cover to spread
      return Math.min(prev + 2, numPages); // jump 2 pages
    });
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

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
  }, [numPages, isMobile]);

  // Touch handlers for swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goToNextPage();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      goToPrevPage();
    }
  };

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

  const showTwoPages = !isMobile && currentPage > 1;
  const leftPageNum = currentPage;
  const rightPageNum = currentPage + 1 <= numPages ? currentPage + 1 : null;

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
        className="reader-workspace"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="nav-btn prev" onClick={goToPrevPage} disabled={currentPage === 1}>◀</button>
        
        <div className="pdf-viewer-wrapper">
          <Document
            file={getMediaUrl(magazine.pdfUrl)}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="pdf-loading">Loading PDF...</div>}
            error={<div className="pdf-error">Failed to load PDF file.</div>}
            className="pdf-document"
          >
            <div className={`pdf-pages ${showTwoPages ? 'two-pages' : 'single-page'}`}>
              <Page 
                pageNumber={leftPageNum} 
                scale={scale * (isMobile ? 0.6 : 1.0)} 
                renderTextLayer={true} 
                renderAnnotationLayer={true} 
                className="pdf-page"
              />
              {showTwoPages && rightPageNum && (
                <Page 
                  pageNumber={rightPageNum} 
                  scale={scale * (isMobile ? 0.6 : 1.0)} 
                  renderTextLayer={true} 
                  renderAnnotationLayer={true} 
                  className="pdf-page"
                />
              )}
            </div>
          </Document>
        </div>

        <button className="nav-btn next" onClick={goToNextPage} disabled={showTwoPages ? rightPageNum === numPages || rightPageNum === null : currentPage === numPages}>▶</button>
      </div>

      {/* Bottom status */}
      <div className={`reader-footer ${isFullscreen ? 'fullscreen-hidden' : ''}`}>
        Page {currentPage} {showTwoPages && rightPageNum ? `- ${rightPageNum}` : ''} / {numPages || '?'}
      </div>
    </div>
  );
}
