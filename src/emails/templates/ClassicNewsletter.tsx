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

export const ClassicNewsletter: React.FC<EmailTemplateProps> = ({
  recipient,
  colors = DEFAULT_COLORS.classic,
  headerText = 'Your Weekly Newsletter',
  footerText,
  subjectLine,
  preheaderText,
  customContent,
  posts = [],
  includeLatestPosts = true,
  maxPosts = 6,
  unsubscribeUrl,
  preferencesUrl,
  viewInBrowserUrl,
  websiteUrl = 'https://knmplace.com',
  logoUrl,
  companyName = 'KNMPLACE',
}) => {
  const displayPosts = includeLatestPosts ? posts.slice(0, maxPosts) : [];
  const featuredPost = displayPosts[0];
  const gridPosts = displayPosts.slice(1, 4);
  const listPosts = displayPosts.slice(4);

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
            variant="classic"
          />

          {/* Greeting */}
          <Section style={greetingSection}>
            <Text style={greeting}>
              Hi {recipient.firstName || 'there'},
            </Text>
            <Text style={introText}>
              Here&apos;s what&apos;s new this week. We&apos;ve gathered the latest content just for you.
            </Text>
          </Section>

          {/* Custom Content */}
          {customContent && (
            <Section style={customContentSection}>
              <Text style={customContentText}>{customContent}</Text>
            </Section>
          )}

          {/* Featured Post */}
          {featuredPost && (
            <Section style={featuredSection}>
              <Text style={sectionTitle}>Featured</Text>
              <PostCard
                post={featuredPost}
                colors={colors}
                variant="magazine"
                showImage={true}
                showExcerpt={true}
                showAuthor={true}
                showDate={true}
              />
              <EmailButton
                href={featuredPost.url}
                colors={colors}
                variant="primary"
                size="medium"
              >
                Read More →
              </EmailButton>
            </Section>
          )}

          {/* 3-Column Grid */}
          {gridPosts.length > 0 && (
            <Section style={gridSection}>
              <Text style={sectionTitle}>More Stories</Text>
              <Row>
                {gridPosts.map((post, index) => (
                  <Column key={post.id} style={gridColumn}>
                    <PostCard
                      post={post}
                      colors={{
                        ...colors,
                        background: '#f9fafb',
                      }}
                      variant="card"
                      showImage={true}
                      showExcerpt={true}
                      showDate={true}
                    />
                  </Column>
                ))}
              </Row>
            </Section>
          )}

          {/* List Posts */}
          {listPosts.length > 0 && (
            <Section style={listSection}>
              <Text style={sectionTitle}>Also Worth Reading</Text>
              {listPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  colors={colors}
                  variant="list"
                  showDate={true}
                />
              ))}
            </Section>
          )}

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaText}>
              Want to explore more content?
            </Text>
            <EmailButton
              href={websiteUrl}
              colors={colors}
              variant="outline"
              size="large"
            >
              Visit Our Website
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
            variant="classic"
          />
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main: React.CSSProperties = {
  backgroundColor: '#f3f4f6',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
};

const greetingSection: React.CSSProperties = {
  padding: '32px 40px 24px 40px',
};

const greeting: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 8px 0',
};

const introText: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#4b5563',
  margin: '0',
};

const customContentSection: React.CSSProperties = {
  padding: '0 40px 24px 40px',
};

const customContentText: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#374151',
  margin: '0',
  padding: '16px',
  backgroundColor: '#f9fafb',
  borderLeft: '4px solid #2563eb',
  borderRadius: '0 8px 8px 0',
};

const sectionTitle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  margin: '0 0 16px 0',
};

const featuredSection: React.CSSProperties = {
  padding: '0 40px 32px 40px',
};

const gridSection: React.CSSProperties = {
  padding: '0 40px 32px 40px',
};

const gridColumn: React.CSSProperties = {
  width: '33.33%',
  verticalAlign: 'top',
  padding: '0 8px',
};

const listSection: React.CSSProperties = {
  padding: '0 40px 32px 40px',
};

const ctaSection: React.CSSProperties = {
  padding: '24px 40px 32px 40px',
  textAlign: 'center',
  backgroundColor: '#f9fafb',
};

const ctaText: React.CSSProperties = {
  fontSize: '16px',
  color: '#374151',
  margin: '0 0 16px 0',
};

export default ClassicNewsletter;
