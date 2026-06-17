# datenpflegenord-website

## Domain Setup

- Custom Domain: `datenpflegenord.de`
- Additional Domain: `www.datenpflegenord.de`

## Frontend API Environment Configuration

### Local ENV

```bash
NORTHACCESS_API_BASE_URL=http://localhost:8000
```

### Production ENV

```bash
NORTHACCESS_API_BASE_URL=http://<backend-host>:<port>
```

### Important Note

`NORTHACCESS_API_BASE_URL` is read server-side by the website route handler. Do not expose backend URLs or secrets through `NEXT_PUBLIC_*` variables.

The browser calls the website endpoint `/api/quick-check`. The route handler
forwards the request server-side to `POST /public/quick-check` with body
`{ "url": "example.com" }`.

QuickCheck output is a technical pre-check only. It is not legal advice, BFSG
certification, or a guarantee of conformance.
