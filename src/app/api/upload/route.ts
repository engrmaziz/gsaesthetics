import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const types = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: "Choose an image file." }, { status: 400 });
  }
  if (!types.has(file.type)) {
    return NextResponse.json({ success: false, error: "Use a JPEG, PNG, WebP, or GIF." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ success: false, error: "Images must be 8 MB or smaller." }, { status: 400 });
  }

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/gif" ? "gif" : "jpg";
  const name = `${Date.now()}-${file.name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 40) || "photo"}.${extension}`;
  const relative = `public/media/uploads/${name}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  let local = false;
  try {
    const absolute = path.join(process.cwd(), relative);
    await fs.mkdir(path.dirname(absolute), { recursive: true });
    await fs.writeFile(absolute, bytes);
    local = true;
  } catch {
    local = false;
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_BRANCH || "main";
  let committed = false;

  if (token && owner && repo) {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "hmd-cms",
    };
    const put = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${relative}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "Add a clinic image from the studio desk",
        content: bytes.toString("base64"),
        branch,
      }),
    });
    committed = put.ok;
  }

  if (!local && !committed) {
    return NextResponse.json({
      success: false,
      error: "The image was not stored. On Vercel, set GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME.",
    }, { status: 500 });
  }

  return NextResponse.json({ success: true, path: `/media/uploads/${name}` });
}
