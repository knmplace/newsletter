import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailHeader } from '../components/EmailHeader';
import { EmailFooter } from '../components/EmailFooter';
import type { EmailTemplateProps } from '../types';
import { DEFAULT_COLORS } from '../types';

export const MinimalTextFocused: React.FC<EmailTemplateProps> = ({
  recipient,
  colors = DEFAULT_COLORS.minimal,
  headerText = 'Newsletter',
  footerText,
  subjectLine,
  preheaderText,
  customContent,
  posts = [],
  includeLatestPosts = true,
  maxPosts = 8,
  unsubscribeUrl,
  preferencesUrl,
  websiteUrl = 'https://knmplace.com',
  logoUrl,
  companyName = 'KNMPLACE',
}) => {
  const displayPosts = includeLatestPosts ? posts.slice(0, maxPosts) : [];

  return (
    <Html>
      <Head />
      <Preview>{preheaderText || subjectLine}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <EmailHeader
            headerText={headerText}
            logoUrl={logoUrl}
            companyName={companyName}
            websiteUrl={websiteUrl}
            preheaderText={preheaderText}
            colors={colors}
            variant="minimal"
          />

          {/* Greeting */}
          <Section style={greetingSection}>
            <Text style={greeting}>
              Hi {recipient.firstName || 'there'},
            </Text>
            <Text style={dateText}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Section>

          {/* Custom Content / Main Message */}
          {customContent && (
            <Section style={contentSection}>
              <Text style={contentText}>{customContent}</Text>
            </Section>
          )}

          <Hr style={divider} />

          {/* Posts List */}
          {displayPosts.length > 0 && (
            <Section style={postsSection}>
              <Text style={sectionTitle}>This Week&apos;s Reads</Text>
              {displayPosts.map((post, index) => (
                <div key={post.id} style={postItem}>
                  <Text style={postNumber}>{String(index + 1).padStart(2, '0')}</Text>
                  <div style={postContent}>
                    <Link href={post.url} style={postTitleLink}>
                      <Text style={postTitle}>{post.title}</Text>
                    </Link>
                    <Text style={postExcerpt}>
                      {post.excerpt.length > 180
                        ? post.excerpt.slice(0, 180) + '...'
                        : post.excerpt}
                    </Text>
                    <Text style={postMeta}>
                      {post.author} · {formatDate(post.publishedAt)}
                      {post.categories?.[0] && ` · ${post.categories[0]}`}
                    </Text>
                  </div>
                </div>
              ))}
            </Section>
          )}

          <Hr style={divider} />

          {/* Closing */}
          <Section style={closingSection}>
            <Text style={closingText}>
              Thanks for reading. See you next week.
            </Text>
            <Text style={signature}>
              — The {companyName} Team
            </Text>
          </Section>

          {/* Quick Links */}
          <Section style={quickLinksSection}>
            <Text style={quickLinksTitle}>Quick Links</Text>
            <Text style={quickLinks}>
              <Link href={websiteUrl} style={quickLink}>Website</Link>
              {' · '}
              {preferencesUrl && (
                <>
                  <Link href={preferencesUrl} style={quickLink}>Preferences</Link>
                  {' · '}
                </>
              )}
              <Link href={unsubscribeUrl} style={quickLink}>Unsubscribe</Link>
            </Text>
          </Section>

          {/* Footer */}
          <EmailFooter
            footerText={footerText}
            companyName={companyName}
            websiteUrl={websiteUrl}
            unsubscribeUrl={unsubscribeUrl}
            preferencesUrl={preferencesUrl}
            colors={colors}
            variant="minimal"
          />
        </Container>
      </Body>
    </Html>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

// Styles - Minimal, text-focused
const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", Times, serif',
};

const container: React.CSSProperties = {
  maxWidth: '580px',
  margin: '0 auto',
  padding: '0 20px',
};

const greetingSection: React.CSSProperties = {
  padding: '40px 0 24px 0',
};

const greeting: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '400',
  color: '#111827',
  margin: '0 0 8px 0',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const dateText: React.CSSProperties = {
  fontSize: '13px',
  color: '#6b7280',
  margin: '0',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const contentSection: React.CSSProperties = {
  padding: '0 0 24px 0',
};

const contentText: React.CSSProperties = {
  fontSize: '17px',
  lineHeight: '1.8',
  color: '#374151',
  margin: '0',
};

const divider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  borderWidth: '1px',
  margin: '0',
};

const postsSection: React.CSSProperties = {
  padding: '32px 0',
};

const sectionTitle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  margin: '0 0 24px 0',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const postItem: React.CSSProperties = {
  display: 'flex',
  marginBottom: '28px',
};

const postNumber: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#d1d5db',
  marginRight: '16px',
  marginTop: '4px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const postContent: React.CSSProperties = {
  flex: 1,
};

const postTitleLink: React.CSSProperties = {
  textDecoration: 'none',
};

const postTitle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#111827',
  lineHeight: '1.4',
  margin: '0 0 8px 0',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const postExcerpt: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#4b5563',
  margin: '0 0 8px 0',
};

const postMeta: React.CSSProperties = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: '0',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const closingSection: React.CSSProperties = {
  padding: '32px 0',
};

const closingText: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.7',
  color: '#374151',
  margin: '0 0 16px 0',
};

const signature: React.CSSProperties = {
  fontSize: '15px',
  fontStyle: 'italic',
  color: '#6b7280',
  margin: '0',
};

const quickLinksSection: React.CSSProperties = {
  padding: '24px 0',
  borderTop: '1px solid #e5e7eb',
};

const quickLinksTitle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: '700',
  color: '#9ca3af',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  margin: '0 0 8px 0',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const quickLinks: React.CSSProperties = {
  fontSize: '13px',
  color: '#6b7280',
  margin: '0',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const quickLink: React.CSSProperties = {
  color: '#6366f1',
  textDecoration: 'underline',
};

export default MinimalTextFocused;
