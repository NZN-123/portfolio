export interface ExperienceGroup {
  id: string;
  title: string;
  iconSrc: string;
  items: string[];
  /** Desktop card width in px (from Figma spec). */
  width: number;
}
