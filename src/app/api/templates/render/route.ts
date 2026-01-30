import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { renderEmail, getAvailableTemplates } from '@/lib/email-renderer';
import type { TemplateName } from '@/emails/templates';
import type { EmailColors, WordPressPost, EmailRecipient } from '@/emails/types';

// Validation schema
const renderSchema = z.object({
  templateType: z.enum(['classic', 'modern', 'minimal', 'magazine', 'announcement']),
  recipient: z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    userId: z.number().optional(),
  }),
  subjectLine: z.string().min(1),
  preheaderText: z.string().optional(),
  customContent: z.string().optional(),
  colors: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      background: z.string().optional(),
      text: z.string().optional(),
      accent: z.string().optional(),
    })
    .optional(),
  headerText: z.string().optional(),
  footerText: z.string().optional(),
  posts: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
        excerpt: z.string(),
        url: z.string().url(),
        featuredImage: z.string().url().optional(),
        author: z.string(),
        publishedAt: z.string(),
        categories: z.array(z.string()).optional(),
      })
    )
    .optional(),
  includeLatestPosts: z.boolean().optional(),
  maxPosts: z.number().min(1).max(20).optional(),
  unsubscribeUrl: z.string().url(),
  preferencesUrl: z.string().url().optional(),
  viewInBrowserUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  companyName: z.string().optional(),
});

/**
 * POST /api/templates/render
 * Render an email template with custom data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = renderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Render the email
    const rendered = await renderEmail({
      templateType: data.templateType as TemplateName,
      recipient: data.recipient as EmailRecipient,
      subjectLine: data.subjectLine,
      preheaderText: data.preheaderText,
      customContent: data.customContent,
      colors: data.colors as Partial<EmailColors>,
      headerText: data.headerText,
      footerText: data.footerText,
      posts: data.posts as WordPressPost[],
      includeLatestPosts: data.includeLatestPosts,
      maxPosts: data.maxPosts,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
      viewInBrowserUrl: data.viewInBrowserUrl,
      websiteUrl: data.websiteUrl,
      logoUrl: data.logoUrl,
      companyName: data.companyName,
    });

    return NextResponse.json({
      success: true,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });
  } catch (error) {
    console.error('Error rendering template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to render template' },
      { status: 500 }
    );
  }
}
