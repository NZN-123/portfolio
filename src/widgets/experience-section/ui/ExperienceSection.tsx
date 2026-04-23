import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { EXPERIENCE_GROUPS } from '@entities/experience';
import { SECTION_IDS } from '@shared/config';
import { ExperienceCard } from './ExperienceCard';
import { ExperienceTitle } from './ExperienceTitle';

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const update = () => {
      if (!scrollerRef.current) return;
      const scrollWidth = scrollerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxTranslate(Math.max(0, scrollWidth - viewportWidth));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  return (
    <section id={SECTION_IDS.experience} className="bg-[#FAFAFA]">
      {/* Desktop (lg+): pinned horizontal scroll */}
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `calc(100vh + ${maxTranslate * 2}px)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-16 overflow-hidden">
          <div
            className="w-full"
            style={{
              paddingLeft: 'clamp(40px, 8vw, 120px)',
              paddingRight: 'clamp(40px, 8vw, 120px)',
            }}
          >
            <ExperienceTitle />
          </div>

          <motion.div
            ref={scrollerRef}
            style={{ x, paddingLeft: 'clamp(40px, 8vw, 120px)' }}
            className="flex w-max gap-6 pr-[clamp(40px,8vw,120px)]"
          >
            {EXPERIENCE_GROUPS.map((group) => (
              <ExperienceCard key={group.id} {...group} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet (< lg): native horizontal swipe */}
      <div className="px-6 py-16 lg:hidden">
        <ExperienceTitle />
        <div className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-4 [-webkit-overflow-scrolling:touch]">
          {EXPERIENCE_GROUPS.map((group) => (
            <div key={group.id} className="snap-start">
              <ExperienceCard {...group} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
