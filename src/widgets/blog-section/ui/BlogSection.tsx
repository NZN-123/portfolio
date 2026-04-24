import { useCallback, useEffect, useRef, useState } from 'react';
import { BLOG_POSTS } from '@entities/blog';
import { SECTION_IDS } from '@shared/config';
import arrowPrevIcon from '@shared/assets/icons/arrow-prev.png';
import arrowNextIcon from '@shared/assets/icons/arrow-next.png';
import { BlogCard } from './BlogCard';
import { BlogTitle } from './BlogTitle';

const CARD_WIDTH = 356;
const CARD_GAP = 24;
const STEP = CARD_WIDTH + CARD_GAP;

export function BlogSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrowState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrowState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrowState, { passive: true });
    window.addEventListener('resize', updateArrowState);
    return () => {
      el.removeEventListener('scroll', updateArrowState);
      window.removeEventListener('resize', updateArrowState);
    };
  }, [updateArrowState]);

  const scrollBy = (direction: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: direction * STEP, behavior: 'smooth' });
  };

  return (
    <section id={SECTION_IDS.blog} className="bg-[#FAFAFA]">
      <div
        className="relative mx-auto flex w-full max-w-[1562px] flex-col gap-16 py-24 lg:py-32"
        style={{
          paddingLeft: 'clamp(24px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 8vw, 120px)',
        }}
      >
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <BlogTitle />

          {/* Desktop arrow controls */}
          <div className="hidden shrink-0 items-center gap-6 lg:flex">
            <CarouselButton
              direction="prev"
              disabled={!canPrev}
              onClick={() => scrollBy(-1)}
            />
            <CarouselButton
              direction="next"
              disabled={!canNext}
              onClick={() => scrollBy(1)}
            />
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="snap-start">
              <BlogCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? '이전 글' : '다음 글'}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center transition-opacity disabled:opacity-30"
    >
      <img
        src={direction === 'prev' ? arrowPrevIcon : arrowNextIcon}
        alt=""
        aria-hidden="true"
        className="h-8 w-8 object-contain"
      />
    </button>
  );
}
