# QuickCheck Backend Integration

The public website calls the internal website route:

```text
POST /api/quick-check
```

That route reads the backend base URL server-side from:

```bash
NORTHACCESS_API_BASE_URL=http://localhost:8000
```

For a server deployment, set it to the reachable backend host and port:

```bash
NORTHACCESS_API_BASE_URL=http://<backend-host>:<port>
```

The browser never receives `NORTHACCESS_API_BASE_URL`. The website route forwards
requests server-side to:

```text
POST /public/quick-check
```

with body:

```json
{ "url": "example.com" }
```

Operational notes:

- the route removes trailing slashes from `NORTHACCESS_API_BASE_URL`
- missing configuration returns a controlled missing-config response
- backend timeout, rate-limit, unreachable-backend, and invalid-response cases return controlled messages
- backend URLs and raw stack traces must not be sent to the browser
- QuickCheck output is a technical pre-check only
- no legal advice
- no BFSG certification
- no guaranteed conformance
