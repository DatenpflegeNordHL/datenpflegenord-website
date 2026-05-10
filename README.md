# datenpflegenord-website

## Frontend API Environment Configuration

### Local ENV

```bash
NEXT_PUBLIC_NORDAUDIT_API_URL=http://127.0.0.1:8010
```

### Production ENV

```bash
NEXT_PUBLIC_NORDAUDIT_API_URL=https://api.datenpflegenord.de
```

### Important Note

`NEXT_PUBLIC_NORDAUDIT_API_URL` is a public frontend environment variable and must not contain secrets.
