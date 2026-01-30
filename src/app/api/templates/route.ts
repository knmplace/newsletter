import { NextResponse } from 'next/server';
import { TEMPLATE_METADATA, DEFAULT_COLORS } from '@/emails/types';
import { getAvailableTemplates } from '@/lib/email-renderer';

/**
 * GET /api/templates
 * List all available email templates
 */
export async function GET() {
  try {
    const templateTypes = getAvailableTemplates();

    const templates = templateTypes.map((type) => ({
      type,
      ...TEMPLATE_METADATA[type],
      defaultColors: DEFAULT_COLORS[type],
    }));

    return NextResponse.json({
      success: true,
      templates,
    });
  } catch (error) {
    console.error('Error listing templates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to list templates' },
      { status: 500 }
    );
  }
}
