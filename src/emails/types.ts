// Email Template Types

export interface EmailColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent?: string;
}

export interface WordPressPost {
  id: number;
  title: string;
  excerpt: string;
  url: string;
  featuredImage?: string;
  author: string;
  publishedAt: string;
  categories?: string[];
}

export interface EmailRecipient {
  email: string;
  firstName: string;
  lastName: string;
  userId?: number;
}

export interface EmailTemplateProps {
  // Recipient personalization
  recipient: EmailRecipient;

  // Template customization
  colors: EmailColors;
  headerText?: string;
  footerText?: string;

  // Content
  subjectLine: string;
  preheaderText?: string;
  customContent?: string;

  // WordPress posts
  posts?: WordPressPost[];
  includeLatestPosts?: boolean;
  maxPosts?: number;

  // Links
  unsubscribeUrl: string;
  preferencesUrl?: string;
  viewInBrowserUrl?: string;
  websiteUrl?: string;

  // Branding
  logoUrl?: string;
  companyName?: string;
}

// Default colors for each template type
export const DEFAULT_COLORS: Record<string, EmailColors> = {
  classic: {
    primary: '#2563eb',
    secondary: '#1e40af',
    background: '#ffffff',
    text: '#1f2937',
    accent: '#3b82f6',
  },
  modern: {
    primary: '#0d0d0d',
    secondary: '#1c1c1e',
    background: '#f5f5f7',
    text: '#0d0d0d',
    accent: '#4a9eff',
  },
  minimal: {
    primary: '#111827',
    secondary: '#374151',
    background: '#ffffff',
    text: '#374151',
    accent: '#6366f1',
  },
  magazine: {
    primary: '#dc2626',
    secondary: '#991b1b',
    background: '#fafafa',
    text: '#171717',
    accent: '#ef4444',
  },
  announcement: {
    primary: '#7c3aed',
    secondary: '#5b21b6',
    background: '#faf5ff',
    text: '#1f2937',
    accent: '#8b5cf6',
  },
};

// Template metadata
export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  previewImage?: string;
}

export const TEMPLATE_METADATA: Record<string, TemplateMetadata> = {
  classic: {
    id: 'classic',
    name: 'Classic Newsletter',
    description: 'Traditional newsletter layout with header, hero section, featured posts in a 3-column grid, and footer.',
  },
  modern: {
    id: 'modern',
    name: 'Modern Card Layout',
    description: 'Clean, minimalist design with card-based content presentation and bold typography.',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Text-Focused',
    description: 'Simple, text-heavy design perfect for content-focused newsletters with inline summaries.',
  },
  magazine: {
    id: 'magazine',
    name: 'Image-Heavy Magazine',
    description: 'Bold, visual design with large featured images and magazine-style layout.',
  },
  announcement: {
    id: 'announcement',
    name: 'Announcement/Update',
    description: 'Single-column layout optimized for important announcements and updates.',
  },
};
