import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  file: string | null | undefined;
  className?: string;
}

export function PdfViewer({ file, className }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!file) {
    return (
      <div
        className={
          'flex items-center justify-center p-10 text-center text-[#525252] ' +
          (className ?? '')
        }
      >
        <p className="text-xl leading-7 font-semibold">
          아직 PDF가 업로드되지 않았어요.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={'flex w-full flex-col items-center overflow-y-auto ' + (className ?? '')}
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages: n }) => setNumPages(n)}
        loading={<PdfPlaceholder text="PDF 불러오는 중…" />}
        error={<PdfPlaceholder text="PDF를 불러오지 못했어요." />}
        noData={<PdfPlaceholder text="PDF 파일이 없어요." />}
      >
        {width > 0 &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={`page_${i + 1}`}
              pageNumber={i + 1}
              width={width}
              className="mb-6 shadow-[0_0_12px_rgba(0,0,0,0.04)]"
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
      </Document>
    </div>
  );
}

function PdfPlaceholder({ text }: { text: string }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-10">
      <p className="text-xl leading-7 font-semibold text-[#525252]">{text}</p>
    </div>
  );
}
