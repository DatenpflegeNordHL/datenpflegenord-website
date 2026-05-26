# Contact Lead Integration

## Aktueller Stand

`POST /api/contact` validiert eingehende Anfragen und nimmt Leads technisch an.

- Eingaben werden mit `lib/contact-lead.ts` validiert
- Valide Leads werden mit `console.info` strukturiert geloggt
- Honeypot-Feld (`websiteUrl`) schützt vor einfachen Bots
- Noch **kein** Mail- oder CRM-Versand

## Noch offen: Mail-/CRM-Anbindung

Entscheidung für einen der folgenden Provider steht aus:

| Option | Beschreibung |
|--------|-------------|
| **Resend** | Einfache API, gute Next.js-Integration |
| **SendGrid** | Weit verbreitet, viele Features |
| **Cloudflare Queues / Email Workers** | Passt zur bestehenden Cloudflare-Infrastruktur |
| **Eigenes CRM / Webhook** | Flexibel, falls internes System vorhanden |

## Benötigte Umgebungsvariablen (nach Provider-Entscheidung)

```env
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
MAIL_PROVIDER_API_KEY=
```

> **Wichtig:** Keine Secrets ins Repository committen.
> Env-Variablen werden im Deployment-Dashboard (z. B. Cloudflare Pages) konfiguriert.

## Nächste Schritte

1. Provider auswählen
2. `app/api/contact/route.ts` um Mail-Versand erweitern
3. Env-Variablen im Cloudflare-Dashboard eintragen
4. Testversand durchführen
5. `console.info`-Logging nach erfolgreicher Integration entfernen oder reduzieren
