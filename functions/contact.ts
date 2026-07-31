import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}) {
  try {
    const { request, env } = context;

    interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  category: string;
  message: string;
}

const data = (await request.json()) as ContactFormData;

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      subject,
      category,
      message,
    } = data;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !subject ||
      !category ||
      !message
    ) {
      return Response.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    const resend = new Resend(env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Astrospacious <onboarding@resend.dev>", // We'll change this later
      to: ["outreach.astrospacious@gmail.com"],
      replyTo: email,
      subject: `📩 ${subject}`,
html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>New Contact Form Submission</title>
</head>

<body style="
  margin:0;
  padding:40px;
  background:#F3F7FC;
  font-family:Arial, Helvetica, sans-serif;
">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    max-width:700px;
    margin:auto;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #E5E7EB;
  "
>

<tr>
<td
style="
background:linear-gradient(135deg,#071B34,#0B2A4D);
padding:40px;
text-align:center;
color:white;
">

<h1 style="
margin:0;
font-size:34px;
">
🚀 Astrospacious
</h1>

<p style="
margin-top:10px;
font-size:16px;
color:#D1E7FF;
">
New Contact Form Submission
</p>

</td>
</tr>

<tr>
<td style="padding:35px;">

<h2 style="
margin-top:0;
color:#0F172A;
">
Contact Details
</h2>

<table
width="100%"
cellpadding="12"
style="
border-collapse:collapse;
">

<tr>
<td style="font-weight:bold;">👤 Name</td>
<td>${firstName} ${lastName}</td>
</tr>

<tr style="background:#F8FAFC;">
<td style="font-weight:bold;">📧 Email</td>
<td>
<a href="mailto:${email}">
${email}
</a>
</td>
</tr>

<tr>
<td style="font-weight:bold;">📱 Phone</td>
<td>${phoneNumber || "Not Provided"}</td>
</tr>

<tr style="background:#F8FAFC;">
<td style="font-weight:bold;">📂 Category</td>
<td>${category}</td>
</tr>

<tr>
<td style="font-weight:bold;">📝 Subject</td>
<td>${subject}</td>
</tr>

</table>

<div
style="
margin-top:35px;
padding:25px;
background:#F8FAFC;
border-left:5px solid #10B981;
border-radius:10px;
">

<h3 style="
margin-top:0;
color:#0F172A;
">
💬 Message
</h3>

<p style="
font-size:16px;
line-height:1.8;
white-space:pre-wrap;
color:#374151;
">
${message}
</p>

</div>

</td>
</tr>

<tr>

<td
style="
background:#071B34;
padding:25px;
text-align:center;
color:#CBD5E1;
font-size:14px;
">

Submitted from
<br><br>

<a
href="https://astrospacious.com"
style="
color:#10B981;
text-decoration:none;
font-weight:bold;
"
>
https://astrospacious.com
</a>

<br><br>

Astrospacious © ${new Date().getFullYear()}

</td>

</tr>

</table>

</body>
</html>
`,
    });
      const autoReply = await resend.emails.send({
  from: "Astrospacious <onboarding@resend.dev>",
  to: [email],
  subject: "🚀 We've received your message – Astrospacious",
html: `
<!DOCTYPE html>
<html>
<body style="
  margin:0;
  padding:40px;
  background:#F3F7FC;
  font-family:Arial, Helvetica, sans-serif;
">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    max-width:650px;
    margin:auto;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #E5E7EB;
  "
>

<tr>
<td
style="
background:linear-gradient(135deg,#071B34,#0B2A4D);
padding:40px;
text-align:center;
color:white;
">

<h1 style="margin:0;">🚀 Astrospacious</h1>

<p style="color:#D1E7FF;">
Thank you for contacting us!
</p>

</td>
</tr>

<tr>

<td style="padding:35px;">

<h2 style="margin-top:0;">
Hi ${firstName},
</h2>

<p style="font-size:16px;line-height:1.8;color:#374151;">

Thank you for reaching out to
<strong>Astrospacious</strong>.

We've successfully received your message.

Our team will review your request and respond as soon as possible.

</p>

<div
style="
margin-top:30px;
padding:20px;
background:#F8FAFC;
border-left:5px solid #10B981;
border-radius:10px;
">

<h3>Your Submission</h3>

<p><strong>Subject:</strong> ${subject}</p>

<p><strong>Category:</strong> ${category}</p>

</div>

<p
style="
margin-top:30px;
font-size:15px;
color:#6B7280;
line-height:1.7;
">

Our typical response time is
<strong>24–48 business hours</strong>.

If you'd like to add more information,
simply reply to this email.

</p>

</td>

</tr>

<tr>

<td
style="
background:#071B34;
padding:25px;
text-align:center;
color:#CBD5E1;
">

<strong>Team Astrospacious</strong>

<br><br>

<a
href="https://astrospacious.com"
style="
color:#10B981;
text-decoration:none;
"
>

https://astrospacious.com

</a>

</td>

</tr>

</table>

</body>
</html>
`,
});
    console.log("Auto Reply Result:", autoReply);
    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}