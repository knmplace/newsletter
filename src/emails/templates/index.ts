export { ClassicNewsletter } from './ClassicNewsletter';
export { ModernCardLayout } from './ModernCardLayout';
export { MinimalTextFocused } from './MinimalTextFocused';
export { MagazineLayout } from './MagazineLayout';
export { AnnouncementUpdate } from './AnnouncementUpdate';

// Template map for dynamic rendering
export const TEMPLATES = {
  classic: ClassicNewsletter,
  modern: ModernCardLayout,
  minimal: MinimalTextFocused,
  magazine: MagazineLayout,
  announcement: AnnouncementUpdate,
} as const;

export type TemplateName = keyof typeof TEMPLATES;
