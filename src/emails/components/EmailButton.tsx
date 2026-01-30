import { Button } from '@react-email/components';
import * as React from 'react';

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  colors: {
    primary: string;
    text?: string;
  };
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  href,
  children,
  colors,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
}) => {
  const styles = getButtonStyles(colors, variant, size, fullWidth);

  return (
    <Button href={href} style={styles}>
      {children}
    </Button>
  );
};

function getButtonStyles(
  colors: { primary: string; text?: string },
  variant: 'primary' | 'secondary' | 'outline',
  size: 'small' | 'medium' | 'large',
  fullWidth: boolean
): React.CSSProperties {
  const sizeStyles = {
    small: {
      padding: '8px 16px',
      fontSize: '13px',
    },
    medium: {
      padding: '12px 24px',
      fontSize: '14px',
    },
    large: {
      padding: '16px 32px',
      fontSize: '16px',
    },
  };

  const baseStyle: React.CSSProperties = {
    display: fullWidth ? 'block' : 'inline-block',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '8px',
    ...sizeStyles[size],
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
        color: '#ffffff',
        border: 'none',
      };

    case 'secondary':
      return {
        ...baseStyle,
        backgroundColor: adjustColorOpacity(colors.primary, 0.1),
        color: colors.primary,
        border: 'none',
      };

    case 'outline':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
      };

    default:
      return baseStyle;
  }
}

function adjustColorOpacity(color: string, opacity: number): string {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

export default EmailButton;
