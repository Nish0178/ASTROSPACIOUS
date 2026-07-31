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
        <h2>New Contact Form Submission</h2>

        <table cellpadding="8" cellspacing="0" border="1">
          <tr>
            <td><strong>First Name</strong></td>
            <td>${firstName}</td>
          </tr>

          <tr>
            <td><strong>Last Name</strong></td>
            <td>${lastName}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>

          <tr>
            <td><strong>Phone</strong></td>
            <td>${phoneNumber || "-"}</td>
          </tr>

          <tr>
            <td><strong>Category</strong></td>
            <td>${category}</td>
          </tr>

          <tr>
            <td><strong>Subject</strong></td>
            <td>${subject}</td>
          </tr>
        </table>

        <br/>

        <h3>Message</h3>

        <p>${message}</p>
      `,
    });

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