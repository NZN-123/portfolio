export function BlogTitle() {
  return (
    <div className="flex max-w-[563px] flex-col gap-3">
      <span className="text-base leading-6 font-medium tracking-[0.057px] text-[#525252]">
        Blog
      </span>
      <h2
        className="text-[clamp(24px,2.5vw,40px)] leading-[1.3] font-bold tracking-[0.28px]"
        style={{
          background: 'linear-gradient(89.1deg, #FF7474 0%, #FFA161 100.04%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        블로그에서 저의 멋진 성장 스토리를 구경해 보세요!
      </h2>
    </div>
  );
}
