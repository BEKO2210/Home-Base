# Savira selbst hosten — schlüsselfertige Anleitung

Ziel: Savira **wie Supabase, aber deutlich günstiger** auf deinem eigenen Server
betreiben. Du musst am Ende nur **eine Domain kaufen** und **einen Server mieten** —
der Rest (Datenbank, Auth, APIs, Storage, Dashboard, HTTPS) läuft über den
fertigen `docker/`-Stack in diesem Repo.

> ⚠️ Rechtlicher Rest-Check vor dem öffentlichen Launch: Markenrecherche für
> „Savira" (USPTO/EUIPO), Domain final kaufen, Impressum/Datenschutz.

---

## 1. Was du kaufen/mieten musst

| Posten                 | Empfehlung                                                                                 | Ungefährer Preis |
| ---------------------- | ------------------------------------------------------------------------------------------ | ---------------- |
| **Domain**             | `savirahq.com` oder `saviradb.com` (beide laut RDAP frei) bei Porkbun/Namecheap            | ~10–15 €/Jahr    |
| **Server (VPS)**       | Hetzner **CX22** (2 vCPU, 4 GB, 40 GB) zum Testen · **CX32** (4 vCPU, 8 GB) für Produktion | ~4–7 €/Monat     |
| **Backups** (optional) | Hetzner Backup-Option oder S3-Bucket                                                       | ~1–2 €/Monat     |

**Kostenvergleich (grob):**

|            | Savira self-hosted                         | Supabase Cloud                        |
| ---------- | ------------------------------------------ | ------------------------------------- |
| Einstieg   | **~5–8 €/Monat** (VPS + Domain)            | Free-Tier, dann **Pro ab 25 $/Monat** |
| Skalierung | größerer VPS (linear, günstig)             | Compute-Add-ons (teuer)               |
| Aufwand    | **du** verwaltest Updates/Backups/Security | Supabase verwaltet alles              |

→ Günstiger ist self-hosting fast immer; der „Preis" ist dein **Betriebsaufwand**.

---

## 2. Server vorbereiten (einmalig, ~10 Min)

1. VPS mieten (Ubuntu 22.04/24.04). Du bekommst eine **öffentliche IP**.
2. Per SSH einloggen:
   ```bash
   ssh root@DEINE_SERVER_IP
   ```
3. (Empfohlen) Firewall: nur 22 (SSH), 80, 443 offen.
   ```bash
   ufw allow 22 && ufw allow 80 && ufw allow 443 && ufw enable
   ```

---

## 3. Domain auf den Server zeigen lassen

Im DNS deiner Domain (beim Registrar) einen **A-Record** setzen:

| Typ | Name             | Wert              |
| --- | ---------------- | ----------------- |
| A   | `@` (oder `app`) | `DEINE_SERVER_IP` |
| A   | `www` (optional) | `DEINE_SERVER_IP` |

DNS-Propagation prüfen: `dig savirahq.com +short` → muss deine IP zeigen.

---

## 4. Savira installieren (das Setup-Skript macht fast alles)

Das mitgelieferte `docker/setup.sh` installiert Docker, holt den Stack, **generiert
alle Secrets und API-Keys** und schreibt die `.env`.

```bash
# Repo holen (oder nur den docker-Ordner)
git clone https://github.com/BEKO2210/Home-Base.git savira && cd savira/docker

# Interaktives Setup (installiert Docker + Compose, erzeugt Secrets/Keys, fragt URLs ab)
sh setup.sh
```

Wenn du nach URLs gefragt wirst, gib deine Domain an (mit `https://`):

- **Public URL / API External URL:** `https://savirahq.com`
- **Site URL:** `https://savirahq.com`

> Das Skript erzeugt `JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY`, DB-Passwort etc.
> automatisch. Nichts davon manuell ausdenken.

---

## 5. Dashboard absichern (wichtig!)

In der `.env` **unbedingt** ändern (Standardwerte sind unsicher):

```ini
DASHBOARD_USERNAME=dein-admin-name
DASHBOARD_PASSWORD=ein-langes-zufälliges-passwort
PROXY_DOMAIN=savirahq.com          # für Caddy/HTTPS
```

Zufallspasswort erzeugen: `openssl rand -base64 24`

---

## 6. Mit automatischem HTTPS starten (Caddy)

Caddy holt automatisch ein gültiges Let's-Encrypt-Zertifikat für deine Domain:

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d
```

Status prüfen:

```bash
docker compose ps              # alle Dienste "healthy"?
docker compose logs -f caddy   # HTTPS-Zertifikat erteilt?
```

Danach erreichbar:

- **Dashboard / Studio:** `https://savirahq.com` (Login mit DASHBOARD_USERNAME/PASSWORD)
- **API:** `https://savirahq.com/rest/v1/`, `/auth/v1/`, `/storage/v1/`

---

## 7. Verifizieren

```bash
curl -I https://savirahq.com            # 200/302 + gültiges TLS
dig savirahq.com +short                 # zeigt Server-IP
docker compose ps                       # alle Container up & healthy
```

Im Browser `https://savirahq.com` öffnen → Savira-Dashboard mit deinem Branding.

---

## 8. Betrieb (Updates, Backup, Reset)

```bash
# Updates
docker compose pull && docker compose up -d      # nach CHANGELOG.md prüfen

# Backup der Datenbank
docker compose exec db pg_dumpall -U postgres > backup_$(date +%F).sql

# Kompletter Reset (löscht Daten!)
sh reset.sh
```

**Backups regelmäßig & extern speichern** — bei self-hosting trägst du das Risiko.

---

## 9. Was noch offen ist (vor echtem Launch)

- [ ] Domain final kaufen (`savirahq.com` / `saviradb.com`) und A-Record setzen
- [ ] Markenrecherche „Savira" (USPTO/EUIPO)
- [ ] SMTP für E-Mails (Auth-Mails) in `.env` konfigurieren (`SMTP_*`)
- [ ] OG-Image-Generatoren auf eine offene Schrift umstellen (siehe PR-Hinweise)
- [ ] Regelmäßige automatische Backups einrichten
- [ ] Impressum/Datenschutz/AGB für den kommerziellen Betrieb

---

### Kurzfassung

**Server mieten → Domain kaufen → A-Record setzen → `sh setup.sh` → `.env` Passwörter setzen → `docker compose ... -f docker-compose.caddy.yml up -d` → fertig mit HTTPS.**
