import { renderLayout } from "../shared/layout";
import { renderHeader, renderFooter, renderButton, renderTypography, renderImage } from "../shared/components";

interface MagazinePayload {
  title: string;
  description?: string;
  coverImage?: string;
  publishedAt?: Date;
  slug: string;
  appUrl: string;
  unsubscribeLink: string;
}

export const buildNewMagazineEmail = (payload: MagazinePayload) => {
  const magazineUrl = `${payload.appUrl}/magazines/${payload.slug}`;
  const dateString = new Date(payload.publishedAt || new Date()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const content = `
    ${renderHeader("ASTROSPACIOUS MAGAZINES")}
    ${payload.coverImage ? renderImage(payload.coverImage, payload.title) : ""}
    <div class="content-padding" style="padding: 40px 30px;">
      ${renderTypography.meta(dateString)}
      ${renderTypography.h1(payload.title)}
      ${payload.description ? renderTypography.p(payload.description) : ""}
      ${renderButton(magazineUrl, "Read Magazine")}
    </div>
    ${renderFooter(payload.unsubscribeLink, payload.appUrl)}
  `;

  return renderLayout(content);
};
