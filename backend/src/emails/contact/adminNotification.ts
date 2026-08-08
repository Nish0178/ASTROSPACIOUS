import { renderLayout } from "../shared/layout";
import { renderHeader, renderFooter, renderTypography } from "../shared/components";

interface AdminContactPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  message: string;
  appUrl: string;
}

export const buildAdminContactNotification = (payload: AdminContactPayload) => {
  const formattedMessage = payload.message.replace(/\n/g, '<br />');
  
  const content = `
    ${renderHeader("NEW CONTACT SUBMISSION")}
    <div class="content-padding" style="padding: 40px 30px;">
      ${renderTypography.h2(payload.subject)}
      
      <table width="100%" border="0" cellpadding="8" cellspacing="0" style="margin-bottom: 24px; background-color: #f8fafc; border-radius: 8px;">
        <tr>
          <td width="30%"><strong>Name:</strong></td>
          <td>${payload.firstName} ${payload.lastName}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td><a href="mailto:${payload.email}">${payload.email}</a></td>
        </tr>
        <tr>
          <td><strong>Phone:</strong></td>
          <td>${payload.phone || 'N/A'}</td>
        </tr>
        <tr>
          <td><strong>Category:</strong></td>
          <td>${payload.category}</td>
        </tr>
      </table>
      
      ${renderTypography.p("<strong>Message:</strong>")}
      <div style="background-color: #f1f5f9; padding: 16px; border-left: 4px solid #3b82f6; border-radius: 0 4px 4px 0; margin-bottom: 24px;">
        ${formattedMessage}
      </div>
      
    </div>
    ${renderFooter(undefined, payload.appUrl)}
  `;

  return renderLayout(content);
};
