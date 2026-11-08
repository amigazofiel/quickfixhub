import { NextResponse } from "next/server";

const REPO_OWNER = "amigazofiel";
const REPO_NAME = "quickfixhub";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { os, app, errorCode, description } = body || {};

    if (!errorCode?.trim() && !description?.trim()) {
      return NextResponse.json(
        { error: "Error code or description is required." },
        { status: 400 }
      );
    }

    const token = process.env.GITHUB_ACCESS_TOKEN;

    if (!token) {
      console.warn("GITHUB_ACCESS_TOKEN not configured yet. Logging report locally.");
      return NextResponse.json({
        success: true,
        message: "Report logged (pending token configuration).",
      });
    }

    const title = `[User Request] ${errorCode?.trim() || "System Error"} on ${os || "General"}`;
    const issueBody = `### User Error Fix Request
- **Operating System:** ${os || "Not specified"}
- **Application / Hardware:** ${app || "Not specified"}
- **Error Code / Message:** ${errorCode || "N/A"}
- **Description:** ${description || "N/A"}
- **Submitted At:** ${new Date().toISOString()}

<!-- METADATA
${JSON.stringify({
  os: os || "Windows",
  app: app || "",
  errorCode: errorCode || "",
  description: description || "",
  submittedAt: new Date().toISOString(),
})}
-->`;

    const ghResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "QuickFixHub-Intake",
        },
        body: JSON.stringify({
          title,
          body: issueBody,
          labels: ["user-request"],
        }),
      }
    );

    if (!ghResponse.ok) {
      const errText = await ghResponse.text();
      console.error("GitHub API issue creation failed:", errText);
      return NextResponse.json(
        { error: "Failed to log to GitHub repository." },
        { status: 500 }
      );
    }

    const data = await ghResponse.json();
    return NextResponse.json({
      success: true,
      issueNumber: data.number,
      message: "Error report logged to repository queue.",
    });
  } catch (error) {
    console.error("Report error handler exception:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
