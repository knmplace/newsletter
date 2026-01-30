import {
  Column,
  Img,
  Link,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import type { WordPressPost } from '../types';

interface PostCardProps {
  post: WordPressPost;
  colors: {
    primary: string;
    secondary?: string;
    background: string;
    text: string;
  };
  variant?: 'card' | 'horizontal' | 'minimal' | 'magazine' | 'list';
  showImage?: boolean;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  colors,
  variant = 'card',
  showImage = true,
  showExcerpt = true,
  showAuthor = false,
  showDate = true,
}) => {
  const styles = getVariantStyles(variant, colors);
  const formattedDate = formatDate(post.publishedAt);

  switch (variant) {
    case 'horizontal':
      return (
        <Section style={styles.container}>
          <Row>
            {showImage && post.featuredImage && (
              <Column style={styles.imageColumn}>
                <Link href={post.url}>
                  <Img
                    src={post.featuredImage}
                    alt={post.title}
                    width={120}
                    height={80}
                    style={styles.imageHorizontal}
                  />
                </Link>
              </Column>
            )}
            <Column style={styles.contentColumn}>
              <Link href={post.url} style={styles.titleLink}>
                <Text style={styles.title}>{post.title}</Text>
              </Link>
              {showExcerpt && (
                <Text style={styles.excerpt}>{truncateText(post.excerpt, 100)}</Text>
              )}
              <Text style={styles.meta}>
                {showAuthor && <span>{post.author}</span>}
                {showAuthor && showDate && <span> • </span>}
                {showDate && <span>{formattedDate}</span>}
              </Text>
            </Column>
          </Row>
        </Section>
      );

    case 'minimal':
      return (
        <Section style={styles.container}>
          <Link href={post.url} style={styles.titleLink}>
            <Text style={styles.title}>{post.title}</Text>
          </Link>
          {showExcerpt && (
            <Text style={styles.excerpt}>{truncateText(post.excerpt, 150)}</Text>
          )}
          {showDate && <Text style={styles.meta}>{formattedDate}</Text>}
        </Section>
      );

    case 'magazine':
      return (
        <Section style={styles.container}>
          {showImage && post.featuredImage && (
            <Link href={post.url}>
              <Img
                src={post.featuredImage}
                alt={post.title}
                width={600}
                style={styles.imageFull}
              />
            </Link>
          )}
          <Link href={post.url} style={styles.titleLink}>
            <Text style={styles.title}>{post.title}</Text>
          </Link>
          {showExcerpt && (
            <Text style={styles.excerpt}>{truncateText(post.excerpt, 200)}</Text>
          )}
          <Text style={styles.meta}>
            {showAuthor && <span>By {post.author}</span>}
            {showAuthor && showDate && <span> | </span>}
            {showDate && <span>{formattedDate}</span>}
          </Text>
        </Section>
      );

    case 'list':
      return (
        <Section style={styles.container}>
          <Row>
            <Column style={{ width: '20px' }}>
              <Text style={styles.bullet}>•</Text>
            </Column>
            <Column>
              <Link href={post.url} style={styles.titleLink}>
                <Text style={styles.titleInline}>{post.title}</Text>
              </Link>
              {showDate && (
                <Text style={styles.metaInline}> — {formattedDate}</Text>
              )}
            </Column>
          </Row>
        </Section>
      );

    case 'card':
    default:
      return (
        <Section style={styles.container}>
          {showImage && post.featuredImage && (
            <Link href={post.url}>
              <Img
                src={post.featuredImage}
                alt={post.title}
                width={280}
                style={styles.image}
              />
            </Link>
          )}
          <Link href={post.url} style={styles.titleLink}>
            <Text style={styles.title}>{post.title}</Text>
          </Link>
          {showExcerpt && (
            <Text style={styles.excerpt}>{truncateText(post.excerpt, 120)}</Text>
          )}
          <Text style={styles.meta}>
            {showDate && <span>{formattedDate}</span>}
          </Text>
        </Section>
      );
  }
};

function getVariantStyles(
  variant: string,
  colors: { primary: string; secondary?: string; background: string; text: string }
) {
  const mutedText = adjustColorOpacity(colors.text, 0.6);

  const baseStyles = {
    container: {
      padding: '16px',
      backgroundColor: colors.background,
      borderRadius: '8px',
      marginBottom: '16px',
    } as React.CSSProperties,
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '6px',
      marginBottom: '12px',
    } as React.CSSProperties,
    imageHorizontal: {
      width: '120px',
      height: '80px',
      objectFit: 'cover' as const,
      borderRadius: '6px',
    } as React.CSSProperties,
    imageFull: {
      width: '100%',
      height: 'auto',
      marginBottom: '16px',
    } as React.CSSProperties,
    imageColumn: {
      width: '130px',
      verticalAlign: 'top' as const,
      paddingRight: '16px',
    } as React.CSSProperties,
    contentColumn: {
      verticalAlign: 'top' as const,
    } as React.CSSProperties,
    titleLink: {
      textDecoration: 'none',
    } as React.CSSProperties,
    title: {
      color: colors.text,
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '1.3',
      margin: '0 0 8px 0',
    } as React.CSSProperties,
    titleInline: {
      color: colors.primary,
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '1.4',
      margin: '0',
      display: 'inline',
    } as React.CSSProperties,
    excerpt: {
      color: mutedText,
      fontSize: '14px',
      lineHeight: '1.5',
      margin: '0 0 8px 0',
    } as React.CSSProperties,
    meta: {
      color: mutedText,
      fontSize: '12px',
      margin: '0',
    } as React.CSSProperties,
    metaInline: {
      color: mutedText,
      fontSize: '14px',
      display: 'inline',
    } as React.CSSProperties,
    bullet: {
      color: colors.primary,
      fontSize: '20px',
      lineHeight: '1.4',
      margin: '0',
    } as React.CSSProperties,
  };

  switch (variant) {
    case 'magazine':
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          padding: '0',
          backgroundColor: 'transparent',
          marginBottom: '32px',
        },
        title: {
          ...baseStyles.title,
          fontSize: '24px',
          fontWeight: '700',
        },
        excerpt: {
          ...baseStyles.excerpt,
          fontSize: '16px',
        },
      };

    case 'minimal':
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          padding: '12px 0',
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${adjustColorOpacity(colors.text, 0.1)}`,
          borderRadius: '0',
        },
        title: {
          ...baseStyles.title,
          fontSize: '16px',
          fontWeight: '500',
        },
      };

    case 'list':
      return {
        ...baseStyles,
        container: {
          ...baseStyles.container,
          padding: '8px 0',
          backgroundColor: 'transparent',
          borderRadius: '0',
          marginBottom: '4px',
        },
      };

    default:
      return baseStyles;
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
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

export default PostCard;
