// ponytail: Server Component
import { Download, File as FileIcon } from "lucide-react";

export function FileListDisplay({
  title,
  files,
}: {
  title: string;
  files: { name: string; url: string; size: string }[];
}) {
  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border bg-neutral-bg/50">
        {title}
      </div>
      <div className="p-6">
        {files.length === 0 ? (
          <p className="text-[13px] text-neutral-muted">Belum ada file yang diunggah.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2.5 border border-neutral-border hover:border-brand-light/50 hover:bg-[#f8f9ff] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2 bg-brand-bg flex items-center justify-center shrink-0">
                    <FileIcon size={18} className="text-brand" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13.5px] font-bold text-neutral-text truncate max-w-40 md:max-w-xs">{file.name}</span>
                    <span className="text-[12px] text-neutral-muted">{file.size}</span>
                  </div>
                </div>
                <a
                  href={file.url}
                  className="flex items-center gap-1.5 text-[12.5px] font-bold text-brand hover:text-brand-dark px-3 py-1.5 rounded-2 hover:bg-brand-bg transition-colors"
                >
                  <Download size={14} />
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
