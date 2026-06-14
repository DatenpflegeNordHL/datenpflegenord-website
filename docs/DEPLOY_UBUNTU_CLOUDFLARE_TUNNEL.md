# Deployment: Ubuntu Server mit Cloudflare Tunnel

Diese Dokumentation beschreibt den aktuellen lokalen Server-Betrieb der DatenpflegeNord-Website.

## Zielarchitektur

```text
https://datenpflege-nord.de
  -> Cloudflare Tunnel
  -> Ubuntu Server dpnserver
  -> http://localhost:8080
  -> Docker Container dpn-website
  -> Next.js App im Container auf Port 3000
```

## Eckdaten

| Bereich | Wert |
| --- | --- |
| Öffentliche Domain | `https://datenpflege-nord.de` |
| Serverpfad | `/opt/datenpflegenord/datenpflegenord-website` |
| Cloudflare Tunnel Ziel | `http://localhost:8080` |
| Docker Image | `datenpflege-nord-website:local` |
| Docker Container | `dpn-website` |
| Port-Mapping | `8080:3000` |
| Restart Policy | `unless-stopped` |

Cloudflare Tunnel Tokens, SSH-Keys und Zugangsdaten gehören nicht in dieses Repository.

## Deployment per Script

Auf dem Server:

```bash
cd /opt/datenpflegenord/datenpflegenord-website
./scripts/deploy-local-server.sh
```

Das Script führt aus:

1. aktuellen Git-Branch anzeigen
2. `git pull --ff-only`
3. Docker Image bauen
4. vorhandenen Container `dpn-website` stoppen und entfernen
5. neuen Container mit `8080:3000` starten
6. `docker ps` anzeigen
7. lokalen Healthcheck gegen `http://localhost:8080` ausführen

## Manuelle Befehle

Falls das Script nicht verwendet werden soll:

```bash
cd /opt/datenpflegenord/datenpflegenord-website
git pull --ff-only
docker build -t datenpflege-nord-website:local .
docker stop dpn-website || true
docker rm dpn-website || true
docker run -d \
  --name dpn-website \
  -p 8080:3000 \
  --restart unless-stopped \
  datenpflege-nord-website:local
curl -fsS http://localhost:8080
```

## Prüfkommandos

```bash
docker ps --filter name=dpn-website
docker logs --tail 100 dpn-website
curl -fsS http://localhost:8080
```

Extern:

```bash
curl -I https://datenpflege-nord.de
```

## Rollback

Wenn ein Deployment zurückgenommen werden muss, einen bekannten funktionierenden Git-Commit auschecken und das Deployment erneut ausführen:

```bash
cd /opt/datenpflegenord/datenpflegenord-website
git checkout <commit-sha>
./scripts/deploy-local-server.sh
```

Danach wieder bewusst auf den gewünschten Branch wechseln, zum Beispiel:

```bash
git checkout main
```

## Troubleshooting

### Alter Container läuft noch

```bash
docker ps --filter name=dpn-website
docker stop dpn-website
docker rm dpn-website
```

Danach das Deploy-Script erneut starten.

### Port 8080 ist belegt

```bash
sudo ss -ltnp | grep ':8080'
docker ps
```

Den belegenden Prozess oder Container prüfen. Der aktuelle Cloudflare Tunnel erwartet `http://localhost:8080`; das Port-Mapping sollte deshalb nicht ohne Tunnel-Anpassung geändert werden.

### Cloudflare zeigt alte Version

1. Lokal prüfen:

   ```bash
   curl -fsS http://localhost:8080
   ```

2. Container-Startzeit prüfen:

   ```bash
   docker ps --filter name=dpn-website
   ```

3. Wenn lokal die neue Version läuft, Cloudflare Cache/Tunnel-Status prüfen. Tunnel-Ziel bleibt `http://localhost:8080`.

### Docker Build schlägt fehl

```bash
docker build -t datenpflege-nord-website:local .
```

Build-Ausgabe lesen. Häufige Ursachen sind fehlende Abhängigkeiten, TypeScript-/Lint-/Next.js-Buildfehler oder ein veralteter Git-Stand. Danach:

```bash
git status
git pull --ff-only
```

### Website antwortet lokal nicht

```bash
docker ps --filter name=dpn-website
docker logs --tail 100 dpn-website
curl -v http://localhost:8080
```

Wenn der Container nicht läuft, das Deploy-Script erneut starten. Wenn der Container läuft, aber `curl` fehlschlägt, Port-Mapping und App-Logs prüfen.
