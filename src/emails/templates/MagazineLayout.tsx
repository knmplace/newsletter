import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailHeader } from '../components/EmailHeader';
import { EmailFooter } from '../components/EmailFooter';
import { EmailButton } from '../components/EmailButton';
import type { EmailTemplateProps } from '../types';
import { DEFAULT_COLORS } from '../types';

export const MagazineLayout: React.FC<EmailTemplateProps> = ({
  recipient,
  colors = DEFAULT_COLORS.magazine,
  headerText,
  footerText,
  subjectLine,
  preheaderText,
  customContent,
  posts = [],
  includeLatestPosts = true,
  maxPosts = 5,
  unsubscribeUrl,
  preferencesUrl,
  websiteUrl = 'https://knmplace.com',
  logoUrl,
  companyName = 'KNMPLACE',
}) => {
  const displayPosts = includeLatestPosts ? posts.slice(0, maxPosts) : [];
  const heroPost = displayPosts[0];
  const secondaryPosts = displayPosts.slice(1, 3);
  const listPosts = displayPosts.slice(3);

  return (
    <Html>
      <Head />
      <Preview>{preheaderText || subjectLine}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <EmailHeader
            headerText={headerText || `${companyName} MAGAZINE`}
            logoUrl={logoUrl}
            companyName={companyName}
            websiteUrl={websiteUrl}
            preheaderText={preheaderText}
            colors={colors}
            variant="magazine"
          />

          {/* Edition Info */}
          <Section style={editionBar}>
            <Text style={editionText}>
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              }).toUpperCase()}
              {' | '}
              Hi {recipient.firstName || 'Reader'}
            </Text>
          </Section>

          {/* Hero Post - Full Width Featured */}
          {heroPost && (
            <Section style={heroSection}>
              {heroPost.featuredImage && (
                <Link href={heroPost.url}>
                  <Img
                    src={heroPost.featuredImage}
                    alt={heroPost.title}
                    width={600}
                    style={heroImage}
                  />
                </Link>
              )}
              <div style={heroContent}>
                <Text style={heroCategory}>
                  {heroPost.categories?.[0] || 'FEATURED'}
                </Text>
                <Link href={heroPost.url} style={heroTitleLink}>
                  <Text style={heroTitle}>{heroPost.title}</Text>
                </Link>
                <Text style={heroExcerpt}>
                  {heroPost.excerpt.length > 200
                    ? heroPost.excerpt.slice(0, 200) + '...'
                    : heroPost.excerpt}
                </Text>
                <Text style={heroMeta}>
                  By {heroPost.author} | {formatDate(heroPost.publishedAt)}
                </Text>
                <EmailButton
                  href={heroPost.url}
                  colors={colors}
                  variant="primary"
                  size="medium"
                >
                  READ FULL STORY
                </EmailButton>
              </div>
            </Section>
          )}

          {/* Custom Content Banner */}
          {customContent && (
            <Section style={bannerSection}>
              <div style={banner}>
                <Text style={bannerText}>{customContent}</Text>
              </div>
            </Section>
          )}

          {/* Secondary Posts - 2 Column */}
          {secondaryPosts.length > 0 && (
            <Section style={secondarySection}>
              <Text style={sectionLabel}>MORE STORIES</Text>
              <Row>
                {secondaryPosts.map((post, index) => (
                  <Column
                    key={post.id}
                    style={index === 0 ? secondaryColumnLeft : secondaryColumnRight}
                  >
                    {post.featuredImage && (
                      <Link href={post.url}>
                        <Img
                          src={post.featuredImage}
                          alt={post.title}
                          width={280}
                          style={secondaryImage}
                        />
                      </Link>
                    )}
                    <Text style={secondaryCategory}>
                      {post.categories?.[0] || 'Article'}
                    </Text>
                    <Link href={post.url} style={secondaryTitleLink}>
                      <Text style={secondaryTitle}>{post.title}</Text>
                    </Link>
                    <Text style={secondaryExcerpt}>
                      {post.excerpt.length > 100
                        ? post.excerpt.slice(0, 100) + '...'
                        : post.excerpt}
                    </Text>
                  </Column>
                ))}
              </Row>
            </Section>
          )}

          {/* List Posts */}
          {listPosts.length > 0 && (
            <Section style={listSection}>
              <Text style={sectionLabel}>ALSO WORTH READING</Text>
              {listPosts.map((post) => (
                <Row key={post.id} style={listItem}>
                  {post.featuredImage && (
                    <Column style={listImageColumn}>
                      <Link href={post.url}>
                        <Img
                          src={post.featuredImage}
                          alt={post.title}
                          width={100}
                          height={70}
                          style={listImage}
                        />
                      </Link>
                    </Column>
                  )}
                  <Column style={listContentColumn}>
                    <Link href={post.url} style={listTitleLink}>
                      <Text style={listTitle}>{post.title}</Text>
                    </Link>
                    <Text style={listMeta}>
                      {formatDate(post.publishedAt)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          )}

          {/* CTA Banner */}
          <Section style={ctaBanner}>
            <Text style={ctaTitle}>DON&apos;T MISS OUT</Text>
            <Text style={ctaSubtitle}>
              Visit our website for more exclusive content
            </Text>
            <EmailButton
              href={websiteUrl}
              colors={{ primary: '#ffffff', text: colors.primary }}
              variant="primary"
              size="large"
            >
              EXPLORE MORE →
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
            variant="magazine"
          />
        </Container>
      </Body>
    </Html>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Styles - Magazine/Bold layout
const main: React.CSSProperties = {
  backgroundColor: '#171717',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#fafafa',
};

const editionBar: React.CSSProperties = {
  backgroundColor: '#171717',
  padding: '12px 24px',
  textAlign: 'center',
};

const editionText: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '600',
  color: 'rgba(255, 255, 255, 0.7)',
  letterSpacing: '2px',
  margin: '0',
};

const heroSection: React.CSSProperties = {
  padding: '0',
};

const heroImage: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const heroContent: React.CSSProperties = {
  padding: '32px 40px',
  backgroundColor: '#ffffff',
};

const heroCategory: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#dc2626',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  margin: '0 0 12px 0',
};

const heroTitleLink: React.CSSProperties = {
  textDecoration: 'none',
};

const heroTitle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: '800',
  color: '#171717',
  lineHeight: '1.2',
  margin: '0 0 16px 0',
  textTransform: 'uppercase',
};

const heroExcerpt: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.7',
  color: '#525252',
  margin: '0 0 16px 0',
};

const heroMeta: React.CSSProperties = {
  fontSize: '12px',
  color: '#a3a3a3',
  margin: '0 0 24px 0',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const bannerSection: React.CSSProperties = {
  padding: '0',
};

const banner: React.CSSProperties = {
  backgroundColor: '#fef2f2',
  borderLeft: '4px solid #dc2626',
  padding: '20px 24px',
  margin: '0',
};

const bannerText: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#171717',
  margin: '0',
  fontWeight: '500',
};

const secondarySection: React.CSSProperties = {
  padding: '40px 32px',
  backgroundColor: '#ffffff',
};

const sectionLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#dc2626',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  margin: '0 0 24px 0',
  paddingBottom: '12px',
  borderBottom: '2px solid #171717',
};

const secondaryColumnLeft: React.CSSProperties = {
  width: '50%',
  verticalAlign: 'top',
  paddingRight: '12px',
};

const secondaryColumnRight: React.CSSProperties = {
  width: '50%',
  verticalAlign: 'top',
  paddingLeft: '12px',
};

const secondaryImage: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  marginBottom: '16px',
};

const secondaryCategory: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: '700',
  color: '#dc2626',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  margin: '0 0 8px 0',
};

const secondaryTitleLink: React.CSSProperties = {
  textDecoration: 'none',
};

const secondaryTitle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#171717',
  lineHeight: '1.3',
  margin: '0 0 8px 0',
};

const secondaryExcerpt: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#525252',
  margin: '0',
};

const listSection: React.CSSProperties = {
  padding: '32px',
  backgroundColor: '#f5f5f5',
};

const listItem: React.CSSProperties = {
  marginBottom: '20px',
};

const listImageColumn: React.CSSProperties = {
  width: '110px',
  verticalAlign: 'top',
  paddingRight: '16px',
};

const listImage: React.CSSProperties = {
  width: '100px',
  height: '70px',
  objectFit: 'cover',
};

const listContentColumn: React.CSSProperties = {
  verticalAlign: 'top',
};

const listTitleLink: React.CSSProperties = {
  textDecoration: 'none',
};

const listTitle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '600',
  color: '#171717',
  lineHeight: '1.4',
  margin: '0 0 4px 0',
};

const listMeta: React.CSSProperties = {
  fontSize: '11px',
  color: '#a3a3a3',
  margin: '0',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const ctaBanner: React.CSSProperties = {
  backgroundColor: '#dc2626',
  padding: '48px 40px',
  textAlign: 'center',
};

const ctaTitle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '800',
  color: '#ffffff',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  margin: '0 0 8px 0',
};

const ctaSubtitle: React.CSSProperties = {
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.8)',
  margin: '0 0 24px 0',
};

export default MagazineLayout;
