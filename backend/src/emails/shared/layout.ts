import { theme } from "./theme";

export const renderLayout = (contentHtml: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Astrospacious</title>
  <style>
    /* Reset */
    body { margin: 0; padding: 0; min-width: 100%; font-family: ${theme.typography.fontFamily}; background-color: #f4f4f5; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { max-width: 100%; -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }
    
    /* Responsive */
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .content-padding { padding: 20px !important; }
    }
  </style>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, p, a, h1, h2, h3 { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="background-color: #f4f4f5; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <center style="width: 100%; background-color: #f4f4f5;">
    <!--[if mso]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width: 600px;">
    <tr>
    <td>
    <![endif]-->
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: ${theme.colors.background}; padding-bottom: 0;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${theme.colors.background};">
        <tr>
          <td align="left">
            ${contentHtml}
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </center>
</body>
</html>
`;
