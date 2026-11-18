import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  const updated = await request.json();
  if (!updated?.practice || !Array.isArray(updated.services)) {
    return NextResponse.json({ success: false, error: "Content is missing practice or services." }, { status: 400 });
  }
  const json = JSON.stringify(updated, null, 2);
  const relative = "src/data/content.json";
  let local = false;
  try {
    await fs.writeFile(path.join(process.cwd(), relative), json, "utf8");
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
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${relative}?ref=${branch}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "hmd-cms",
    };
    const existing = await fetch(getUrl, { headers, cache: "no-store" });
    const sha = existing.ok ? (await existing.json()).sha : undefined;
    const put = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${relative}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update clinic content from the studio desk",
        content: Buffer.from(json).toString("base64"),
        sha,
        branch,
      }),
    });
    committed = put.ok;
    if (!put.ok && !local) {
      return NextResponse.json({ success: false, error: "GitHub did not accept the content update." }, { status: 500 });
    }
  }

  if (!local && !committed) {
    return NextResponse.json({
      success: false,
      error: "Nothing was saved. On Vercel, set GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME.",
    }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: committed
      ? "Saved to GitHub. Vercel will publish a new deploy."
      : "Saved on this machine.",
  });
}
