import { NextRequest, NextResponse } from 'next/server';
import { renderEmailPreview, getAvailableTemplates } from '@/lib/email-renderer';
import type { TemplateName } from '@/emails/templates';

interface RouteParams {
  params: Promise<{ type: string }>;
}

/**
 * GET /api/templates/[type]/preview
 * Preview an email template with sample data
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { type } = await params;
    const templateType = type as TemplateName;

    // Validate template type
    const validTemplates = getAvailableTemplates();
    if (!validTemplates.includes(templateType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid template type. Valid types: ${validTemplates.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Get query parameters for customization
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'html'; // html, text, or json

    // Render preview
    const rendered = await renderEmailPreview(templateType);

    // Return based on format
    if (format === 'html') {
      return new NextResponse(rendered.html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    if (format === 'text') {
      return new NextResponse(rendered.text, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    // JSON format returns all data
    return NextResponse.json({
      success: true,
      templateType,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });
  } catch (error) {
    console.error('Error rendering template preview:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to render template preview' },
      { status: 500 }
    );
  }
}
