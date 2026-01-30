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
import { EmailButton } from '../components/EmailButton';
import type { EmailTemplateProps } from '../types';
import { DEFAULT_COLORS } from '../types';

export const AnnouncementUpdate: React.FC<EmailTemplateProps> = ({
  recipient,
  colors = DEFAULT_COLORS.announcement,
  headerText = 'Important Update',
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

  return (
    <Html>
      <Head />
      <Preview>{preheaderText || subjectLine}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Gradient */}
          <EmailHeader
            headerText={headerText}
            logoUrl={logoUrl}
            companyName={companyName}
            websiteUrl={websiteUrl}
            preheaderText={preheaderText}
            colors={{
              ...colors,
              secondary: colors.secondary || '#5b21b6',
            }}
            variant="announcement"
          />

          {/* Announcement Banner */}
          <Section style={bannerSection}>
            <div style={banner}>
              <Text style={bannerIcon}>📢</Text>
              <Text style={bannerTitle}>
                {subjectLine || 'Important Announcement'}
              </Text>
            </div>
          </Section>

          {/* Greeting */}
          <Section style={greetingSection}>
            <Text style={greeting}>
              Dear {recipient.firstName || 'Valued Member'},
            </Text>
          </Section>

          {/* Main Announcement Content */}
          {customContent && (
            <Section style={contentSection}>
              <Text style={contentText}>{customContent}</Text>
            </Section>
          )}

          {/* Updates List */}
          {displayPosts.length > 0 && (
            <Section style={updatesSection}>
              <Text style={updatesTitle}>What&apos;s New</Text>
              <Hr style={updatesDivider} />

              {displayPosts.map((post, index) => (
                <div key={post.id} style={updateItem}>
                  <div style={updateBadge}>
                    <Text style={updateBadgeText}>{index + 1}</Text>
                  </div>
                  <div style={updateContent}>
                    <Link href={post.url} style={updateTitleLink}>
                      <Text style={updateTitle}>{post.title}</Text>
                    </Link>
                    <Text style={updateExcerpt}>
                      {post.excerpt.length > 150
                        ? post.excerpt.slice(0, 150) + '...'
                        : post.excerpt}
                    </Text>
                    <Link href={post.url} style={updateReadMore}>
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Action Required Box */}
          <Section style={actionSection}>
            <div style={actionBox}>
              <Text style={actionTitle}>Questions?</Text>
              <Text style={actionText}>
                If you have any questions about this update, please don&apos;t hesitate to reach out to us.
              </Text>
              <EmailButton
                href={websiteUrl}
                colors={colors}
                variant="primary"
                size="large"
              >
                Contact Us
              </EmailButton>
            </div>
          </Section>

          {/* Sign Off */}
          <Section style={signOffSection}>
            <Text style={signOffText}>
              Thank you for being part of our community.
            </Text>
            <Text style={signOffName}>
              Best regards,
            </Text>
            <Text style={signOffTeam}>
              The {companyName} Team
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
            variant="announcement"
          />
        </Container>
      </Body>
    </Html>
  );
};

// Styles - Announcement/Update focused
const main: React.CSSProperties = {
  backgroundColor: '#f5f3ff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
};

const bannerSection: React.CSSProperties = {
  padding: '0',
};

const banner: React.CSSProperties = {
  backgroundColor: '#faf5ff',
  borderBottom: '2px solid #7c3aed',
  padding: '24px 40px',
  textAlign: 'center',
};

const bannerIcon: React.CSSProperties = {
  fontSize: '32px',
  margin: '0 0 8px 0',
};

const bannerTitle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#5b21b6',
  margin: '0',
  letterSpacing: '-0.3px',
};

const greetingSection: React.CSSProperties = {
  padding: '40px 40px 16px 40px',
};

const greeting: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '500',
  color: '#1f2937',
  margin: '0',
};

const contentSection: React.CSSProperties = {
  padding: '0 40px 32px 40px',
};

const contentText: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.8',
  color: '#374151',
  margin: '0',
};

const updatesSection: React.CSSProperties = {
  padding: '0 40px 32px 40px',
};

const updatesTitle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#7c3aed',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  margin: '0 0 12px 0',
};

const updatesDivider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '0 0 24px 0',
};

const updateItem: React.CSSProperties = {
  display: 'flex',
  marginBottom: '24px',
};

const updateBadge: React.CSSProperties = {
  width: '32px',
  height: '32px',
  backgroundColor: '#7c3aed',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '16px',
  flexShrink: 0,
};

const updateBadgeText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '32px',
  textAlign: 'center',
};

const updateContent: React.CSSProperties = {
  flex: 1,
};

const updateTitleLink: React.CSSProperties = {
  textDecoration: 'none',
};

const updateTitle: React.CSSProperties = {
  fontSize: '17px',
  fontWeight: '600',
  color: '#1f2937',
  lineHeight: '1.4',
  margin: '0 0 8px 0',
};

const updateExcerpt: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#6b7280',
  margin: '0 0 8px 0',
};

const updateReadMore: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '600',
  color: '#7c3aed',
  textDecoration: 'none',
};

const actionSection: React.CSSProperties = {
  padding: '0 40px 32px 40px',
};

const actionBox: React.CSSProperties = {
  backgroundColor: '#faf5ff',
  borderRadius: '12px',
  padding: '32px',
  textAlign: 'center',
  border: '1px solid #e9d5ff',
};

const actionTitle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#5b21b6',
  margin: '0 0 8px 0',
};

const actionText: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#6b7280',
  margin: '0 0 20px 0',
};

const signOffSection: React.CSSProperties = {
  padding: '0 40px 40px 40px',
};

const signOffText: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 24px 0',
};

const signOffName: React.CSSProperties = {
  fontSize: '15px',
  color: '#6b7280',
  margin: '0 0 4px 0',
};

const signOffTeam: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0',
};

export default AnnouncementUpdate;
