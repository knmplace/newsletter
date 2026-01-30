import {
  Container,
  Hr,
  Link,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailFooterProps {
  footerText?: string;
  companyName?: string;
  websiteUrl?: string;
  unsubscribeUrl: string;
  preferencesUrl?: string;
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  variant?: 'classic' | 'modern' | 'minimal' | 'magazine' | 'announcement';
}

export const EmailFooter: React.FC<EmailFooterProps> = ({
  footerText,
  companyName = 'KNMPLACE',
  websiteUrl = 'https://knmplace.com',
  unsubscribeUrl,
  preferencesUrl,
  colors,
  variant = 'classic',
}) => {
  const year = new Date().getFullYear();
  const styles = getVariantStyles(variant, colors);

  return (
    <Section style={styles.footer}>
      <Container style={styles.footerContainer}>
        <Hr style={styles.divider} />

        {footerText && (
          <Text style={styles.footerText}>{footerText}</Text>
        )}

        <Text style={styles.links}>
          <Link href={websiteUrl} style={styles.link}>
            Website
          </Link>
          {' • '}
          {preferencesUrl && (
            <>
              <Link href={preferencesUrl} style={styles.link}>
                Email Preferences
              </Link>
              {' • '}
            </>
          )}
          <Link href={unsubscribeUrl} style={styles.link}>
            Unsubscribe
          </Link>
        </Text>

        <Text style={styles.copyright}>
          © {year} {companyName}. All rights reserved.
        </Text>

        <Text style={styles.address}>
          You received this email because you subscribed to our newsletter.
        </Text>
      </Container>
    </Section>
  );
};

function getVariantStyles(
  variant: string,
  colors: { primary: string; background: string; text: string }
) {
  const mutedText = adjustColorOpacity(colors.text, 0.6);

  const baseStyles = {
    footer: {
      backgroundColor: colors.background,
      padding: '32px 0 48px 0',
    } as React.CSSProperties,
    footerContainer: {
      textAlign: 'center' as const,
    } as React.CSSProperties,
    divider: {
      borderColor: adjustColorOpacity(colors.text, 0.1),
      margin: '0 0 24px 0',
    } as React.CSSProperties,
    footerText: {
      color: colors.text,
      fontSize: '14px',
      lineHeight: '24px',
      margin: '0 0 16px 0',
    } as React.CSSProperties,
    links: {
      color: mutedText,
      fontSize: '12px',
      margin: '0 0 8px 0',
    } as React.CSSProperties,
    link: {
      color: colors.primary,
      textDecoration: 'underline',
    } as React.CSSProperties,
    copyright: {
      color: mutedText,
      fontSize: '12px',
      margin: '0 0 4px 0',
    } as React.CSSProperties,
    address: {
      color: mutedText,
      fontSize: '11px',
      margin: '0',
      fontStyle: 'italic' as const,
    } as React.CSSProperties,
  };

  switch (variant) {
    case 'modern':
      return {
        ...baseStyles,
        footer: {
          backgroundColor: '#0d0d0d',
          padding: '48px 0 64px 0',
        },
        divider: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          margin: '0 0 32px 0',
        },
        footerText: {
          ...baseStyles.footerText,
          color: '#f5f5f7',
        },
        links: {
          ...baseStyles.links,
          color: 'rgba(245, 245, 247, 0.6)',
        },
        link: {
          color: '#4a9eff',
          textDecoration: 'none',
        },
        copyright: {
          ...baseStyles.copyright,
          color: 'rgba(245, 245, 247, 0.4)',
        },
        address: {
          ...baseStyles.address,
          color: 'rgba(245, 245, 247, 0.3)',
        },
      };

    case 'minimal':
      return {
        ...baseStyles,
        footer: {
          backgroundColor: 'transparent',
          padding: '24px 0 32px 0',
        },
        divider: {
          borderColor: adjustColorOpacity(colors.text, 0.15),
          margin: '0 0 20px 0',
        },
      };

    case 'magazine':
      return {
        ...baseStyles,
        footer: {
          backgroundColor: colors.primary,
          padding: '40px 0 56px 0',
        },
        divider: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          margin: '0 0 28px 0',
        },
        footerText: {
          ...baseStyles.footerText,
          color: '#ffffff',
        },
        links: {
          ...baseStyles.links,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        link: {
          color: '#ffffff',
          textDecoration: 'underline',
        },
        copyright: {
          ...baseStyles.copyright,
          color: 'rgba(255, 255, 255, 0.5)',
        },
        address: {
          ...baseStyles.address,
          color: 'rgba(255, 255, 255, 0.4)',
        },
      };

    case 'announcement':
      return {
        ...baseStyles,
        footer: {
          backgroundColor: colors.background,
          padding: '40px 0 56px 0',
        },
      };

    default:
      return baseStyles;
  }
}

function adjustColorOpacity(color: string, opacity: number): string {
  // Simple helper - in production you'd use a proper color library
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

export default EmailFooter;
