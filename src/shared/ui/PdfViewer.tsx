interface PdfViewerProps {
  file: string | null | undefined;
  className?: string;
}

export function PdfViewer({ file, className }: PdfViewerProps) {
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
    <iframe
      src={file}
      title="Project PDF"
      className={'h-full w-full border-0 ' + (className ?? '')}
    />
  );
}
