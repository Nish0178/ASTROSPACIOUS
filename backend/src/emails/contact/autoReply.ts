import { renderLayout } from "../shared/layout";
import { renderHeader, renderFooter, renderTypography } from "../shared/components";

interface AutoReplyPayload {
  firstName: string;
  subject: string;
  appUrl: string;
}

export const buildContactAutoReply = (payload: AutoReplyPayload) => {
  const content = `
    ${renderHeader("ASTROSPACIOUS")}
    <div class="content-padding" style="padding: 40px 30px;">
      ${renderTypography.h2("Thank You for Contacting Us")}
      ${renderTypography.p(`Hi ${payload.firstName},`)}
      ${renderTypography.p(`We have successfully received your message regarding <strong>${payload.subject}</strong>.`)}
      ${renderTypography.p("Our team will review your message and get back to you as soon as possible (usually within 1-2 business days).")}
      ${renderTypography.p("Best regards,<br/>The Astrospacious Team")}
    </div>
    ${renderFooter(undefined, payload.appUrl)}
  `;

  return renderLayout(content);
};
