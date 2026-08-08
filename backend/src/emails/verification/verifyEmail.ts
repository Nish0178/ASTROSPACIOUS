import { renderLayout } from "../shared/layout";
import { renderHeader, renderFooter, renderButton, renderTypography } from "../shared/components";

interface VerificationPayload {
  token: string;
  appUrl: string;
}

export const buildVerificationEmail = (payload: VerificationPayload) => {
  const verificationLink = `${payload.appUrl}/api/v1/newsletter/verify/${payload.token}`;

  const content = `
    ${renderHeader("ASTROSPACIOUS")}
    <div class="content-padding" style="padding: 40px 30px;">
      ${renderTypography.h2("Verify Your Subscription")}
      ${renderTypography.p("Thank you for subscribing to Astrospacious! We're thrilled to share our latest astronomy and space exploration content with you.")}
      ${renderTypography.p("Please verify your email address by clicking the button below:")}
      ${renderButton(verificationLink, "Verify Email")}
      ${renderTypography.p("If you did not request this subscription, you can safely ignore this email.")}
    </div>
    ${renderFooter(undefined, payload.appUrl)}
  `;

  return renderLayout(content);
};
