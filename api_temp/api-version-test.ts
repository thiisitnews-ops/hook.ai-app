import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.json({ 
    message: "This should show the current version",
    timestamp: new Date().toISOString(),
    expected: "2025-10-29.clover"
  });
}