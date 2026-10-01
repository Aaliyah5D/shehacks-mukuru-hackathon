import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { handleUssd } from "@/lib/ussd.server";

// POST /api/ussd — USSD gateway callback (Africa's Talking format).
// Accepts the gateway's form-encoded body, or JSON from the in-app simulator.
const schema = z.object({
  sessionId: z.string().min(1).max(100),
  phoneNumber: z.string().min(6).max(20),
  text: z.string().max(500).default(""),
});

export const Route = createFileRoute("/api/ussd")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const isJson = request.headers.get("content-type")?.includes("application/json");
        const body = isJson
          ? await request.json().catch(() => null)
          : Object.fromEntries(await request.formData().catch(() => new FormData()));
        const parsed = schema.safeParse(body);
        if (!parsed.success) return Response.json({ error: "invalid_input" }, { status: 400 });
        return new Response(handleUssd(parsed.data), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
