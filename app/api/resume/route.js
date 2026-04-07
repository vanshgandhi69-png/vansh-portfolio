import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    const buffer = await readFile(filePath);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Vansh_Gandhi_Resume.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    if (err.code === "ENOENT")
      return Response.json({ error: "Resume not found." }, { status: 404 });
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
