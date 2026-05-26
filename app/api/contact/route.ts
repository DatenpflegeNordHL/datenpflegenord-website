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
    return NextResponse.json({ ok: true, message: "Anfrage wurde technisch angenommen." })
  }

  // TODO: Integrate mail/CRM provider once decided (see docs/contact-lead-integration.md)
  console.info("[contact-lead]", JSON.stringify(result.data))

  return NextResponse.json({ ok: true, message: "Anfrage wurde technisch angenommen." })
}
