import { NextRequest, NextResponse } from "next/server"
import { validateContactLead } from "@/lib/contact-lead"

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: "Ungültige Anfrage." } },
      { status: 400 }
    )
  }

  const result = validateContactLead(body)

  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 })
  }

  // Honeypot: silent accept, no logging
  if (result.isHoneypot) {
    return NextResponse.json({
      ok: true,
      message: "Anfrage wurde technisch geprüft. Die finale Zustellung wird nach Anbieter-Anbindung aktiviert.",
    })
  }

  // TODO: Integrate mail/CRM provider once decided (see docs/contact-lead-integration.md)
  // No personal data is logged until a provider is configured.
  console.info("[contact-lead] validated lead received; delivery provider pending")

  return NextResponse.json({
    ok: true,
    message: "Anfrage wurde technisch geprüft. Die finale Zustellung wird nach Anbieter-Anbindung aktiviert.",
  })
}
