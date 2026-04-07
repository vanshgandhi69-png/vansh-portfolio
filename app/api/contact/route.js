import nodemailer from "nodemailer";

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }
  if (record.count >= MAX_REQUESTS) return true;
  record.count += 1;
  return false;
}

function validate({ name, email, subject, message }) {
  if (!name || name.trim().length < 2)      return "Name must be at least 2 characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "A valid email is required.";
  if (!subject || subject.trim().length < 2) return "Subject must be at least 2 characters.";
  if (!message || message.trim().length < 10) return "Message must be at least 10 characters.";
  if (message.length > 2000)                 return "Message must be under 2000 characters.";
  return null;
}

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip))
      return Response.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });

    const { name, email, subject, message } = await request.json();
    const error = validate({ name, email, subject, message });
    if (error) return Response.json({ error }, { status: 400 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject.trim()} — from ${name.trim()}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
          <h2 style="color:#111827;margin-bottom:4px">New Portfolio Message</h2>
          <p style="color:#6b7280;font-size:14px;margin-top:0">From your portfolio website</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email.trim()}</a></p>
          <p><strong>Subject:</strong> ${subject.trim()}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f9fafb;padding:16px;border-radius:6px;white-space:pre-wrap">${message.trim()}</p>
        </div>
      `,
    });

    return Response.json({ success: true, message: "Message sent! I'll get back to you soon." });
  } catch (err) {
    console.error("[Contact API]", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
