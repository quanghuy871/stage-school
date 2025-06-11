import { NextRequest, NextResponse } from "next/server";


/**
 * Sanitizes object keys by converting snake_case or kebab-case to camelCase.
 * @param obj - The object to sanitize.
 * @returns A new object with sanitized keys.
 */
function sanitizeKeys(obj: Record<string, any>): Record<string, any> {
  const sanitizedObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const sanitizedKey = key.replace(/[_-](.)/g, (_, char) => char.toUpperCase());
      sanitizedObj[sanitizedKey] = obj[key];
    }
  }
  return sanitizedObj;
}

/**
 * Validates if the provided URL matches the expected Zapier webhook format.
 * @param url - The URL to validate.
 * @returns True if the URL is valid, false otherwise.
 */
function isValidWebhookUrl(url: string): boolean {
  const zapierWebhookRegex =
    /^https:\/\/hooks\.zapier\.com\/hooks\/catch\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/?$/;
  return zapierWebhookRegex.test(url);
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        message: "Method not allowed.",
        reason: "Only POST requests are supported.",
        meta: {},
      },
      { status: 405 }
    );
  }

  try {
    const data = await req.json();
    const { webhookUrl, ...rest } = data;

    if (!webhookUrl || !isValidWebhookUrl(webhookUrl)) {
      return NextResponse.json(
        {
          message: "Invalid webhook URL.",
          reason:
            "The provided webhook URL is not valid or does not match the expected format.",
          meta: {},
        },
        { status: 400 }
      );
    }

    const sanitizedData = await sanitizeKeys(rest);

    const response = await fetch(
      webhookUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send data to Zapier: ${response.statusText}`);
    }

    return NextResponse.json(
      { message: "Data sent to Zapier successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending data to Zapier:", error);
    return NextResponse.json(
      {
        message: "File upload failed.",
        reason: error.message || "Unknown error occurred during upload.",
        meta: {},
      },
      { status: 500 }
    );
  }
}
