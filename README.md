# datenpflegenord-website

## Domain Setup

- Custom Domain: `datenpflegenord.de`
- Additional Domain: `www.datenpflegenord.de`

## Frontend API Environment Configuration

### Local ENV

```bash
NORTHACCESS_API_BASE_URL=http://127.0.0.1:8010
```

### Production ENV

```bash
NORTHACCESS_API_BASE_URL=https://api.datenpflegenord.de
```

### Important Note

`NORTHACCESS_API_BASE_URL` is read server-side by the website route handler. Do not expose backend URLs or secrets through `NEXT_PUBLIC_*` variables.
