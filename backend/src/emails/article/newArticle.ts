import { renderLayout } from "../shared/layout";
import { renderHeader, renderFooter, renderButton, renderTypography, renderImage } from "../shared/components";

interface ArticlePayload {
  title: string;
  description?: string;
  coverImage?: string;
  publishedAt?: Date;
  readingTime?: number;
  slug: string;
  appUrl: string;
  unsubscribeLink: string;
}

export const buildNewArticleEmail = (payload: ArticlePayload) => {
  const articleUrl = `${payload.appUrl}/articles/${payload.slug}`;
  const dateString = new Date(payload.publishedAt || new Date()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const metaText = `${dateString} ${payload.readingTime ? `• ${payload.readingTime} min read` : ''}`;

  const content = `
    ${renderHeader("ASTROSPACIOUS")}
    ${payload.coverImage ? renderImage(payload.coverImage, payload.title) : ""}
    <div class="content-padding" style="padding: 40px 30px;">
      ${renderTypography.meta(metaText)}
      ${renderTypography.h1(payload.title)}
      ${payload.description ? renderTypography.p(payload.description) : ""}
      ${renderButton(articleUrl, "Read Article")}
    </div>
    ${renderFooter(payload.unsubscribeLink, payload.appUrl)}
  `;

  return renderLayout(content);
};
