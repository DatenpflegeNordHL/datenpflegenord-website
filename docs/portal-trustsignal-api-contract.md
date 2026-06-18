# Portal TrustSignal API Contract

Status: V3.5 preparation, no required live API.

The portal currently uses `lib/portal/scan-service.ts` with mock data by default. A future API integration must not expose secrets in frontend code. The existing public environment variable `NEXT_PUBLIC_NORDAUDIT_API_URL` may only point to a public API endpoint that accepts anonymous/public scan requests or a server-side proxy without secrets in the browser.

## Runtime Modes

- `mock`: default dashboard mode. The frontend creates a deterministic `ScanSummary` from the local `CompanyProfile`.
- `api`: optional defensive mode. The frontend calls the public quick-check endpoint and normalizes a successful response into the portal `ScanSummary`.
- `none`: no scan is run. The dashboard stays in `ready` or `idle` state and shows CTAs instead of scan scores.

Mock and API data must be visibly labelled in the dashboard. API data is still a technical readiness signal, not a legal certificate or guaranteed visibility result.

## Request

```http
POST /public/quick-check
Content-Type: application/json
```

```json
{
  "domain": "https://example.com"
}
```

## Accepted Response Shape

The service can already normalize the existing Quick-Check response:

```ts
type QuickCheckScanResult = {
  status: "completed"
  inputUrl: string
  normalizedUrl: string
  scannedAt: string
  summary: {
    critical: number
    serious: number
    moderate: number
    minor: number
    info: number
  }
  score: {
    accessibility: number
    technical: number
    privacy: number
    seo: number
  }
  checks: object
  findings: Array<{
    id: string
    category: "accessibility" | "technical" | "privacy" | "seo"
    severity: "critical" | "serious" | "moderate" | "minor" | "info"
    title: string
    description: string
    recommendation?: string
  }>
  disclaimer: string
}
```

## Portal Normalization

`scan-service.ts` maps API data into the single portal `ScanSummary`:

- `status`: `completed`
- `source`: `api`
- `scores`: TrustSignal, BFSG-Readiness indicators, AI readability, structured data, data consistency, trust basics
- `findings`: normalized portal findings
- `suggestedTasks`: generated from findings

The normalizer rejects responses that have missing or non-finite score values, no usable normalized URL, an invalid scan timestamp, or incomplete findings. Rejected responses produce a `failed` `ScanServiceState` with a user-facing error message instead of partially rendering inconsistent scores.

## Expected Error Cases

The optional API path should map failures to clear frontend states:

| Case | Example | Expected portal state |
| --- | --- | --- |
| Missing config | `NEXT_PUBLIC_NORDAUDIT_API_URL` is empty | `failed`, message that the quick check is not configured |
| Timeout | Request exceeds frontend timeout | `failed`, retry-oriented message |
| Network error | Endpoint unreachable or CORS blocked | `failed`, API not reachable message |
| API error | Non-2xx response with `message` or `error` | `failed`, sanitized API message |
| Invalid JSON | Response body cannot be parsed | `failed`, invalid server response message |
| Unexpected format | Missing scores, invalid timestamp, incomplete findings | `failed`, incomplete/unusable response message |

The portal must keep rendering recommendations, tasks, GEO beta preview, and assistant preview when scan data fails or is absent.

## Frontend Environment

`NEXT_PUBLIC_NORDAUDIT_API_URL` is intentionally public because it is bundled into the browser. It must only contain:

- a public anonymous endpoint designed for browser calls, or
- a server-side proxy URL that performs secret-bearing work outside the browser.

Do not place API keys, bearer tokens, Basic Auth credentials, private tenant IDs, or other secrets in any `NEXT_PUBLIC_*` variable. If the real TrustSignal integration needs secrets, add a server-side API/proxy layer first.

## Guardrails

- No API secrets in `NEXT_PUBLIC_*`.
- TrustSignal is a readiness and prioritization score, not a legal certificate.
- BFSG wording must stay limited to Readiness, Vorprüfung, and Indikatoren.
- GEO/KI visibility must only be described as beta/regular measurement and must not be described as a guaranteed result or stable ranking.
