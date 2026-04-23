export function ProjectTitle() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-base leading-6 font-medium tracking-[0.057px] text-[#525252]">
        Project
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
        저의 노력이 담긴 결과물 이에요!
      </h2>
    </div>
  );
}
