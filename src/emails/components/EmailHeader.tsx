import {
  Container,
  Heading,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailHeaderProps {
  headerText?: string;
  logoUrl?: string;
  companyName?: string;
  websiteUrl?: string;
  preheaderText?: string;
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  variant?: 'classic' | 'modern' | 'minimal' | 'magazine' | 'announcement';
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({
  headerText,
  logoUrl,
  companyName = 'KNMPLACE',
  websiteUrl = 'https://knmplace.com',
  preheaderText,
  colors,
  variant = 'classic',
}) => {
  const styles = getVariantStyles(variant, colors);

  return (
    <>
      {/* Preheader - hidden text for email clients */}
      {preheaderText && (
        <Text style={preheaderStyle}>
          {preheaderText}
          {/* Padding to push preview text */}
          {'‌'.repeat(150)}
        </Text>
      )}

      <Section style={styles.header}>
        <Container style={styles.headerContainer}>
          {logoUrl ? (
            <Link href={websiteUrl}>
              <Img
                src={logoUrl}
                alt={companyName}
                width={150}
                height={40}
                style={styles.logo}
              />
            </Link>
          ) : (
            <Link href={websiteUrl} style={styles.logoText}>
              {companyName}
            </Link>
          )}

          {headerText && (
            <Heading as="h1" style={styles.headerTitle}>
              {headerText}
            </Heading>
          )}
        </Container>
      </Section>
    </>
  );
};

const preheaderStyle: React.CSSProperties = {
  display: 'none',
  fontSize: '1px',
  color: '#ffffff',
  lineHeight: '1px',
  maxHeight: '0px',
  maxWidth: '0px',
  opacity: 0,
  overflow: 'hidden',
};

function getVariantStyles(
  variant: string,
  colors: { primary: string; background: string; text: string }
) {
  const baseStyles = {
    header: {
      backgroundColor: colors.primary,
      padding: '32px 0',
    } as React.CSSProperties,
    headerContainer: {
      textAlign: 'center' as const,
    } as React.CSSProperties,
    logo: {
      margin: '0 auto',
    } as React.CSSProperties,
    logoText: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#ffffff',
      textDecoration: 'none',
      letterSpacing: '-0.5px',
    } as React.CSSProperties,
    headerTitle: {
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: '600',
      margin: '16px 0 0 0',
      lineHeight: '1.3',
    } as React.CSSProperties,
  };

  switch (variant) {
    case 'modern':
      return {
        ...baseStyles,
        header: {
          backgroundColor: colors.primary,
          padding: '48px 0',
        },
        logoText: {
          ...baseStyles.logoText,
          fontSize: '28px',
          letterSpacing: '-1px',
          textTransform: 'uppercase' as const,
        },
        headerTitle: {
          ...baseStyles.headerTitle,
          fontSize: '36px',
          fontWeight: '700',
          letterSpacing: '-1px',
        },
      };

    case 'minimal':
      return {
        ...baseStyles,
        header: {
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${colors.primary}`,
          padding: '24px 0',
        },
        logoText: {
          ...baseStyles.logoText,
          color: colors.primary,
          fontSize: '20px',
          fontWeight: '600',
        },
        headerTitle: {
          ...baseStyles.headerTitle,
          color: colors.text,
          fontSize: '24px',
          fontWeight: '500',
        },
      };

    case 'magazine':
      return {
        ...baseStyles,
        header: {
          backgroundColor: colors.primary,
          padding: '40px 0',
        },
        logoText: {
          ...baseStyles.logoText,
          fontSize: '32px',
          fontWeight: '800',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px',
        },
        headerTitle: {
          ...baseStyles.headerTitle,
          fontSize: '32px',
          fontWeight: '700',
          textTransform: 'uppercase' as const,
        },
      };

    case 'announcement':
      return {
        ...baseStyles,
        header: {
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary || colors.primary})`,
          padding: '48px 0',
        },
        logoText: {
          ...baseStyles.logoText,
          fontSize: '22px',
        },
        headerTitle: {
          ...baseStyles.headerTitle,
          fontSize: '32px',
          fontWeight: '700',
        },
      };

    default:
      return baseStyles;
  }
}

export default EmailHeader;
