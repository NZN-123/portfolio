import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Header } from '@widgets/header';
import { SECTION_IDS } from '@shared/config';

export function Hero() {
  return (
    <section
      id={SECTION_IDS.main}
      className="relative flex w-full flex-col overflow-hidden bg-[#FFFEFE]"
      style={{ minHeight: '100dvh' }}
    >
      <Header />

      <div className="flex flex-1 items-center justify-center">
        <div
          className="mx-auto flex w-full max-w-[1760px] flex-col items-center gap-6 py-4 sm:gap-8 md:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-0 xl:gap-16"
          style={{
            paddingLeft: 'clamp(24px, 8vw, 240px)',
            paddingRight: 'clamp(24px, 8vw, 240px)',
          }}
        >
          <div className="w-full max-w-[327px] lg:max-w-[515px]">
            <h1 className="text-[24px] leading-[32px] font-bold tracking-[-0.23px] text-[#171717] lg:leading-[1.3] lg:tracking-[0.31px]" style={{ fontSize: 'clamp(24px, 3vw, 56px)', lineHeight: 1.3 }}>
              안녕하세요,
              <br />
              저는 프로덕트 디자이너
              <br />
              <span className="text-brand-gradient">정의진</span>입니다.
            </h1>
            <div className="mt-4 flex flex-col gap-2 text-sm leading-[22px] font-medium tracking-[0.145px] text-[#525252] lg:mt-8 lg:text-base lg:leading-[26px] lg:tracking-[0.057px]">
              <p>
                저는 프로덕트 디자이너로써 문제를 마주했을 때 당황하기보다,
                오히려 그 안에서 창의적인 해결책을 찾는 과정 자체를 즐기는
                사람입니다.
              </p>
              <p>
                완벽한 준비보다 먼저 시도하고, 부딪히며 개선해나가는 저의
                일하는 방식은 성장을 즐기는 팀원들과 함께라면, 서로의 에너지가
                시너지가 되어 작업이 더욱 풍성하고 재미있어질 거라 확신합니다.
              </p>
            </div>
          </div>

          <div
            className="aspect-square w-full shrink-0"
            style={{ maxWidth: 'min(840px, 55vh, 90vw)' }}
            aria-hidden="true"
          >
            <DotLottieReact
              src="/animations/Graphic.lottie"
              loop
              autoplay
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
