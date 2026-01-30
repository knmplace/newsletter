import { render } from '@react-email/render';
import Handlebars from 'handlebars';
import { createElement } from 'react';
import {
  TEMPLATES,
  type TemplateName,
} from '../emails/templates';
import {
  DEFAULT_COLORS,
  type EmailColors,
  type EmailRecipient,
  type EmailTemplateProps,
  type WordPressPost,
} from '../emails/types';

// Register Handlebars helpers
Handlebars.registerHelper('formatDate', (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
});

Handlebars.registerHelper('truncate', (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
});

Handlebars.registerHelper('uppercase', (text: string) => {
  return text.toUpperCase();
});

Handlebars.registerHelper('lowercase', (text: string) => {
  return text.toLowerCase();
});

Handlebars.registerHelper('ifEquals', function (
  this: unknown,
  arg1: unknown,
  arg2: unknown,
  options: Handlebars.HelperOptions
) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

export interface RenderEmailOptions {
  templateType: TemplateName;
  recipient: EmailRecipient;
  subjectLine: string;
  preheaderText?: string;
  customContent?: string;
  colors?: Partial<EmailColors>;
  headerText?: string;
  footerText?: string;
  posts?: WordPressPost[];
  includeLatestPosts?: boolean;
  maxPosts?: number;
  unsubscribeUrl: string;
  preferencesUrl?: string;
  viewInBrowserUrl?: string;
  websiteUrl?: string;
  logoUrl?: string;
  companyName?: string;
}

export interface RenderedEmail {
  html: string;
  text: string;
  subject: string;
}

/**
 * Process text with Handlebars template variables
 */
export function processTemplateVariables(
  text: string,
  variables: Record<string, unknown>
): string {
  const template = Handlebars.compile(text);
  return template(variables);
}

/**
 * Build template variables from recipient and other data
 */
export function buildTemplateVariables(
  recipient: EmailRecipient,
  additionalVars?: Record<string, unknown>
): Record<string, unknown> {
  return {
    // Recipient variables
    first_name: recipient.firstName,
    last_name: recipient.lastName,
    email: recipient.email,
    user_id: recipient.userId,
    full_name: `${recipient.firstName} ${recipient.lastName}`.trim(),

    // Date variables
    current_date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    current_year: new Date().getFullYear(),
    current_month: new Date().toLocaleDateString('en-US', { month: 'long' }),

    // Additional custom variables
    ...additionalVars,
  };
}

/**
 * Render an email template to HTML
 */
export async function renderEmail(
  options: RenderEmailOptions
): Promise<RenderedEmail> {
  const {
    templateType,
    recipient,
    subjectLine,
    preheaderText,
    customContent,
    colors,
    headerText,
    footerText,
    posts = [],
    includeLatestPosts = true,
    maxPosts = 6,
    unsubscribeUrl,
    preferencesUrl,
    viewInBrowserUrl,
    websiteUrl = 'https://knmplace.com',
    logoUrl,
    companyName = 'KNMPLACE',
  } = options;

  // Get the template component
  const TemplateComponent = TEMPLATES[templateType];
  if (!TemplateComponent) {
    throw new Error(`Unknown template type: ${templateType}`);
  }

  // Build template variables
  const variables = buildTemplateVariables(recipient, {
    unsubscribe_url: unsubscribeUrl,
    preferences_url: preferencesUrl,
    website_url: websiteUrl,
    company_name: companyName,
  });

  // Process dynamic content with Handlebars
  const processedSubject = processTemplateVariables(subjectLine, variables);
  const processedPreheader = preheaderText
    ? processTemplateVariables(preheaderText, variables)
    : undefined;
  const processedCustomContent = customContent
    ? processTemplateVariables(customContent, variables)
    : undefined;
  const processedHeader = headerText
    ? processTemplateVariables(headerText, variables)
    : undefined;
  const processedFooter = footerText
    ? processTemplateVariables(footerText, variables)
    : undefined;

  // Merge colors with defaults
  const mergedColors: EmailColors = {
    ...DEFAULT_COLORS[templateType],
    ...colors,
  };

  // Build template props
  const templateProps: EmailTemplateProps = {
    recipient,
    colors: mergedColors,
    headerText: processedHeader,
    footerText: processedFooter,
    subjectLine: processedSubject,
    preheaderText: processedPreheader,
    customContent: processedCustomContent,
    posts,
    includeLatestPosts,
    maxPosts,
    unsubscribeUrl,
    preferencesUrl,
    viewInBrowserUrl,
    websiteUrl,
    logoUrl,
    companyName,
  };

  // Create React element and render to HTML
  const element = createElement(TemplateComponent, templateProps);

  const html = await render(element, {
    pretty: true,
  });

  const text = await render(element, {
    plainText: true,
  });

  return {
    html,
    text,
    subject: processedSubject,
  };
}

/**
 * Render a preview of the email (with sample data)
 */
export async function renderEmailPreview(
  templateType: TemplateName,
  options?: Partial<RenderEmailOptions>
): Promise<RenderedEmail> {
  const sampleRecipient: EmailRecipient = {
    email: 'preview@example.com',
    firstName: 'John',
    lastName: 'Doe',
    userId: 1,
  };

  const samplePosts: WordPressPost[] = [
    {
      id: 1,
      title: 'Getting Started with Our Platform',
      excerpt:
        'Learn how to make the most of your membership with our comprehensive getting started guide. We cover all the basics you need to know.',
      url: 'https://knmplace.com/getting-started',
      featuredImage: 'https://picsum.photos/600/400?random=1',
      author: 'Admin',
      publishedAt: new Date().toISOString(),
      categories: ['Tutorial'],
    },
    {
      id: 2,
      title: 'Community Spotlight: Member Success Stories',
      excerpt:
        'Read inspiring stories from our community members who have achieved their goals using our platform and resources.',
      url: 'https://knmplace.com/success-stories',
      featuredImage: 'https://picsum.photos/600/400?random=2',
      author: 'Community Team',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      categories: ['Community'],
    },
    {
      id: 3,
      title: 'New Features Released This Month',
      excerpt:
        'Check out the latest features and improvements we have rolled out to make your experience even better.',
      url: 'https://knmplace.com/new-features',
      featuredImage: 'https://picsum.photos/600/400?random=3',
      author: 'Product Team',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      categories: ['Updates'],
    },
    {
      id: 4,
      title: 'Tips and Tricks for Power Users',
      excerpt:
        'Discover advanced tips and hidden features that will help you get the most out of our platform.',
      url: 'https://knmplace.com/tips',
      featuredImage: 'https://picsum.photos/600/400?random=4',
      author: 'Support Team',
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      categories: ['Tips'],
    },
    {
      id: 5,
      title: 'Upcoming Events and Webinars',
      excerpt:
        'Mark your calendar for these exciting upcoming events and learning opportunities.',
      url: 'https://knmplace.com/events',
      featuredImage: 'https://picsum.photos/600/400?random=5',
      author: 'Events Team',
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      categories: ['Events'],
    },
    {
      id: 6,
      title: 'Best Practices for Engagement',
      excerpt:
        'Learn the best practices for staying engaged and connected with our community.',
      url: 'https://knmplace.com/best-practices',
      featuredImage: 'https://picsum.photos/600/400?random=6',
      author: 'Community Team',
      publishedAt: new Date(Date.now() - 432000000).toISOString(),
      categories: ['Guide'],
    },
  ];

  return renderEmail({
    templateType,
    recipient: sampleRecipient,
    subjectLine: options?.subjectLine || 'Your Weekly Newsletter - {{current_date}}',
    preheaderText: options?.preheaderText || 'Check out what\'s new this week, {{first_name}}!',
    customContent:
      options?.customContent ||
      'Hello {{first_name}}! We have some exciting updates to share with you this week. Thank you for being part of our community!',
    colors: options?.colors,
    headerText: options?.headerText,
    footerText: options?.footerText,
    posts: options?.posts || samplePosts,
    includeLatestPosts: options?.includeLatestPosts ?? true,
    maxPosts: options?.maxPosts ?? 6,
    unsubscribeUrl: options?.unsubscribeUrl || 'https://knmplace.com/unsubscribe?token=preview',
    preferencesUrl: options?.preferencesUrl || 'https://knmplace.com/preferences?token=preview',
    websiteUrl: options?.websiteUrl || 'https://knmplace.com',
    logoUrl: options?.logoUrl,
    companyName: options?.companyName || 'KNMPLACE',
  });
}

/**
 * Get available template types
 */
export function getAvailableTemplates(): TemplateName[] {
  return Object.keys(TEMPLATES) as TemplateName[];
}
