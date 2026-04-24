import type { BlogPost } from '@entities/blog';

export function BlogCard({ title, description, href, thumbnailSrc }: BlogPost) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-[381px] w-[356px] shrink-0 flex-col gap-6 rounded-[32px] bg-[#FFFEFE] p-16 transition-transform hover:-translate-y-1"
    >
      <div className="h-[171px] w-[228px] shrink-0 overflow-hidden rounded-lg bg-[#D9D9D9]">
        {thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex w-[228px] flex-col gap-2">
        <h3 className="line-clamp-1 text-xl leading-7 font-semibold tracking-[-0.12px] text-[#171717]">
          {title}
        </h3>
        <p className="line-clamp-1 text-sm leading-[22px] font-normal tracking-[0.145px] text-[#525252]">
          {description}
        </p>
      </div>
    </a>
  );
}
