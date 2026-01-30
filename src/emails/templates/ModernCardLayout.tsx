import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailHeader } from '../components/EmailHeader';
import { EmailFooter } from '../components/EmailFooter';
import { EmailButton } from '../components/EmailButton';
import { PostCard } from '../components/PostCard';
import type { EmailTemplateProps } from '../types';
import { DEFAULT_COLORS } from '../types';

export const ModernCardLayout: React.FC<EmailTemplateProps> = ({
  recipient,
  colors = DEFAULT_COLORS.modern,
  headerText,
  footerText,
  subjectLine,
  preheaderText,
  customContent,
  posts = [],
  includeLatestPosts = true,
  maxPosts = 6,
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
            variant="modern"
          />

          {/* Hero Section */}
          <Section style={heroSection}>
            <Text style={heroGreeting}>
              Hello, {recipient.firstName || 'there'}
            </Text>
            <Text style={heroTitle}>
              Your curated content is ready.
            </Text>
            <Text style={heroSubtitle}>
              Discover the latest updates, insights, and stories we&apos;ve handpicked for you.
            </Text>
          </Section>

          {/* Custom Content */}
          {customContent && (
            <Section style={customContentSection}>
              <div style={customContentCard}>
                <Text style={customContentLabel}>Featured Update</Text>
                <Text style={customContentText}>{customContent}</Text>
              </div>
            </Section>
          )}

          {/* Content Cards */}
          <Section style={cardsSection}>
            <Row>
              {displayPosts.map((post, index) => (
                <Column
                  key={post.id}
                  style={index % 2 === 0 ? cardColumnLeft : cardColumnRight}
                >
                  <div style={card}>
                    {post.featuredImage && (
                      <div
                        style={{
                          ...cardImageWrapper,
                          backgroundImage: `url(${post.featuredImage})`,
                        }}
                      />
                    )}
                    <div style={cardContent}>
                      <Text style={cardCategory}>
                        {post.categories?.[0] || 'Article'}
                      </Text>
                      <Text style={cardTitle}>{post.title}</Text>
                      <Text style={cardExcerpt}>
                        {post.excerpt.length > 100
                          ? post.excerpt.slice(0, 100) + '...'
                          : post.excerpt}
                      </Text>
                      <EmailButton
                        href={post.url}
                        colors={{ primary: '#4a9eff' }}
                        variant="secondary"
                        size="small"
                      >
                        Read More
                      </EmailButton>
                    </div>
                  </div>
                </Column>
              ))}
            </Row>
          </Section>

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaTitle}>Explore More</Text>
            <Text style={ctaSubtitle}>
              Visit our website for more content and community updates.
            </Text>
            <EmailButton
              href={websiteUrl}
              colors={{ primary: '#4a9eff' }}
              variant="primary"
              size="large"
            >
              Visit Website →
            </EmailButton>
          </Section>

          {/* Footer */}
          <EmailFooter
            footerText={footerText}
            companyName={companyName}
            websiteUrl={websiteUrl}
            unsubscribeUrl={unsubscribeUrl}
            preferencesUrl={preferencesUrl}
            colors={colors}
            variant="modern"
          />
        </Container>
      </Body>
    </Html>
  );
};

// Styles - Modern/Titanium & Glass inspired
const main: React.CSSProperties = {
  backgroundColor: '#0d0d0d',
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#0d0d0d',
};

const heroSection: React.CSSProperties = {
  padding: '48px 40px',
  textAlign: 'center',
};

const heroGreeting: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '500',
  color: 'rgba(245, 245, 247, 0.6)',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  margin: '0 0 16px 0',
};

const heroTitle: React.CSSProperties = {
  fontSize: '36px',
  fontWeight: '700',
  color: '#f5f5f7',
  letterSpacing: '-1px',
  lineHeight: '1.1',
  margin: '0 0 16px 0',
};

const heroSubtitle: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'rgba(245, 245, 247, 0.7)',
  margin: '0',
};

const customContentSection: React.CSSProperties = {
  padding: '0 40px 32px 40px',
};

const customContentCard: React.CSSProperties = {
  backgroundColor: '#1c1c1e',
  borderRadius: '16px',
  padding: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const customContentLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#4a9eff',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  margin: '0 0 12px 0',
};

const customContentText: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#f5f5f7',
  margin: '0',
};

const cardsSection: React.CSSProperties = {
  padding: '0 32px 32px 32px',
};

const cardColumnLeft: React.CSSProperties = {
  width: '50%',
  verticalAlign: 'top',
  paddingRight: '8px',
  paddingBottom: '16px',
};

const cardColumnRight: React.CSSProperties = {
  width: '50%',
  verticalAlign: 'top',
  paddingLeft: '8px',
  paddingBottom: '16px',
};

const card: React.CSSProperties = {
  backgroundColor: '#1c1c1e',
  borderRadius: '20px',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const cardImageWrapper: React.CSSProperties = {
  width: '100%',
  height: '120px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const cardContent: React.CSSProperties = {
  padding: '20px',
};

const cardCategory: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: '600',
  color: '#4a9eff',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  margin: '0 0 8px 0',
};

const cardTitle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#f5f5f7',
  lineHeight: '1.3',
  margin: '0 0 8px 0',
};

const cardExcerpt: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: '1.5',
  color: 'rgba(245, 245, 247, 0.6)',
  margin: '0 0 16px 0',
};

const ctaSection: React.CSSProperties = {
  padding: '48px 40px',
  textAlign: 'center',
  backgroundColor: '#1c1c1e',
};

const ctaTitle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#f5f5f7',
  letterSpacing: '-0.5px',
  margin: '0 0 8px 0',
};

const ctaSubtitle: React.CSSProperties = {
  fontSize: '15px',
  color: 'rgba(245, 245, 247, 0.6)',
  margin: '0 0 24px 0',
};

export default ModernCardLayout;
