# Contact Lead Integration

## Aktueller Stand

`POST /api/contact` validiert eingehende Anfragen und nimmt Leads technisch an.

- Eingaben werden mit `lib/contact-lead.ts` validiert
- Honeypot-Feld (`websiteUrl`) schützt vor einfachen Bots
- Valide Leads erzeugen ein datensparsames Log-Ereignis ohne personenbezogene Daten
- **Keine** finale Zustellung aktiv — kein Mail- und kein CRM-Versand
- **Keine** vollständigen Lead-Daten werden geloggt

## Provider-Integration (noch offen)

Entscheidung für einen der folgenden Provider steht aus:

| Option | Beschreibung |
|--------|-------------|
| **Resend** | Einfache API, gute Next.js-Integration |
| **SendGrid** | Weit verbreitet, viele Features |
| **Cloudflare Queues / Email Workers** | Passt zur bestehenden Cloudflare-Infrastruktur |
| **Eigenes CRM / Webhook** | Flexibel, falls internes System vorhanden |

## Schritte nach Provider-Entscheidung

1. Provider auswählen
2. Env-Variablen im Cloudflare-Dashboard eintragen (keine Secrets ins Repository)
3. `app/api/contact/route.ts` um Mail-/CRM-Zustellung erweitern
4. Testversand durchführen
5. Success-Text im Formular auf echte Zustellung aktualisieren
6. Datensparsames Log-Ereignis reduzieren oder entfernen

## Benötigte Umgebungsvariablen (nach Provider-Entscheidung)

```env
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
MAIL_PROVIDER_API_KEY=
```

> **Wichtig:** Keine Secrets ins Repository committen.
> Env-Variablen werden im Deployment-Dashboard (z. B. Cloudflare Pages) konfiguriert.
