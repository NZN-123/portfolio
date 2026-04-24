import { SECTION_IDS } from '@shared/config';
import { ContactCard } from './ContactCard';
import { ContactTitle } from './ContactTitle';

export function ContactSection() {
  return (
    <section id={SECTION_IDS.contact} className="bg-[#FAFAFA]">
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col justify-center gap-12 py-24 lg:py-32"
        style={{
          paddingLeft: 'clamp(24px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 8vw, 120px)',
        }}
      >
        <ContactTitle />
        <ContactCard />
      </div>
    </section>
  );
}
