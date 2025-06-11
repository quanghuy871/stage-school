import 'server-only'

import { NextRequest, NextResponse } from "next/server";

/**
 * Sanitizes object keys by converting snake_case or kebab-case to camelCase.
 * @param obj - The object to sanitize.
 * @returns A new object with sanitized keys.
 */
function sanitizeKeys(obj: any) {
  const sanitizedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const sanitizedKey = key.replace(/[_-](.)/g, (_, char) => char.toUpperCase());
      sanitizedObj[sanitizedKey] = obj[key];
    }
  }
  return sanitizedObj;
}

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  const submission = {
    mutations: [
      {
        create: {
          _type: "formSubmission",
          ...sanitizeKeys(data),
        },
      },
    ],
  };

  return fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-04-08/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify(submission),
    }
  )
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({
          message: "Form submission failed",
          statusText: response.statusText,
          error: errorData.message || "Unknown error",
        }, { status: response.status });
      } else {
        const responseData = await response.json();
        return NextResponse.json({
          message: "Form submission successful",
          statusText: response.statusText,
          data: responseData,
          meta: {
            redirectTo: '/thank-you',
          }
        }, { status: 201 });
      }
    })
    .catch((error) => {
      return NextResponse.json({
        message: "Form submission failed",
        statusText: "Internal Server Error",
        error: error.message,
      }, { status: 500 });
    });
}