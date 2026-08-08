import { theme } from "./theme";

export const renderButton = (href: string, text: string) => `
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: ${theme.spacing.md}; margin-bottom: ${theme.spacing.md};">
    <tr>
      <td align="center">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" bgcolor="${theme.colors.primary}" style="border-radius: ${theme.borderRadius.md};">
              <a href="${href}" target="_blank" style="font-size: ${theme.typography.fontSize.body}; font-family: ${theme.typography.fontFamily}; color: ${theme.colors.white}; text-decoration: none; padding: 14px 32px; display: inline-block; font-weight: bold; border-radius: ${theme.borderRadius.md};">
                ${text}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

export const renderHeader = (title: string = "ASTROSPACIOUS") => `
  <div style="background-color: ${theme.colors.primary}; padding: ${theme.spacing.md}; text-align: center;">
    <h1 style="color: ${theme.colors.white}; margin: 0; font-size: ${theme.typography.fontSize.h2}; font-family: ${theme.typography.fontFamily}; letter-spacing: 2px; text-transform: uppercase;">
      ${title}
    </h1>
  </div>
`;

export const renderFooter = (unsubscribeLink?: string, appUrl: string = "https://www.astrospacious.com") => `
  <div style="background-color: ${theme.colors.surface}; padding: ${theme.spacing.lg}; text-align: center; border-top: 1px solid ${theme.colors.border};">
    <p style="font-size: ${theme.typography.fontSize.small}; color: ${theme.colors.textSecondary}; margin: 0 0 8px 0; font-family: ${theme.typography.fontFamily};">
      © ${new Date().getFullYear()} Astrospacious. All rights reserved.
    </p>
    <p style="font-size: ${theme.typography.fontSize.small}; color: ${theme.colors.textSecondary}; margin: 0 0 24px 0; font-family: ${theme.typography.fontFamily};">
      <a href="${appUrl}" style="color: ${theme.colors.textSecondary}; text-decoration: underline;">Website</a> • 
      <a href="mailto:contact@astrospacious.com" style="color: ${theme.colors.textSecondary}; text-decoration: underline;">Contact Us</a>
    </p>
    ${unsubscribeLink ? `
      <p style="font-size: 12px; color: ${theme.colors.textMuted}; margin: 0; font-family: ${theme.typography.fontFamily};">
        You are receiving this email because you subscribed to Astrospacious.<br/>
        <a href="${unsubscribeLink}" style="color: ${theme.colors.textMuted}; text-decoration: underline;">Unsubscribe safely</a>
      </p>
    ` : `
      <p style="font-size: 12px; color: ${theme.colors.textMuted}; margin: 0; font-family: ${theme.typography.fontFamily};">
        This is an automated system notification from Astrospacious.
      </p>
    `}
  </div>
`;

export const renderTypography = {
  h1: (text: string) => `<h1 style="font-size: ${theme.typography.fontSize.h1}; color: ${theme.colors.textPrimary}; font-family: ${theme.typography.fontFamily}; line-height: ${theme.typography.lineHeight.tight}; margin: 0 0 ${theme.spacing.sm} 0;">${text}</h1>`,
  h2: (text: string) => `<h2 style="font-size: ${theme.typography.fontSize.h2}; color: ${theme.colors.textPrimary}; font-family: ${theme.typography.fontFamily}; line-height: ${theme.typography.lineHeight.tight}; margin: 0 0 ${theme.spacing.sm} 0;">${text}</h2>`,
  p: (text: string) => `<p style="font-size: ${theme.typography.fontSize.body}; color: ${theme.colors.textSecondary}; font-family: ${theme.typography.fontFamily}; line-height: ${theme.typography.lineHeight.body}; margin: 0 0 ${theme.spacing.md} 0;">${text}</p>`,
  meta: (text: string) => `<p style="font-size: ${theme.typography.fontSize.small}; color: ${theme.colors.textMuted}; font-family: ${theme.typography.fontFamily}; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin: 0 0 ${theme.spacing.sm} 0;">${text}</p>`
};

export const renderImage = (src: string, alt: string) => `
  <img src="${src}" alt="${alt}" width="600" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
`;
