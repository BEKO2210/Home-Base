# Brand-Sweep — Inventar (Stand 2026-06-13)

> Schritt 1: **nur Bestandsaufnahme**, noch keine Änderungen.
> Ziel: Alles finden, was beim Rebranding ersetzt/entfernt werden muss.

## 1. „Supabase" als Text

| Kategorie | Treffer | Umgang beim Rebranding |
|---|---|---|
| Gesamt (case-insensitive) | **45.784** in 4.104 Dateien | — |
| `@supabase/*` npm-Importe | 4.156 | **NICHT anfassen** — technische Paketnamen, sonst bricht der Build |
| `supabase.com/.co/.io` URLs | 5.966 | Prüfen: Doku-Links vs. eigene Domain ersetzen |
| Wort „Supabase" (Brand-Text) | **15.165** | **Das ist der eigentliche Sweep** — UI-Text, Titel, Doku |

**Brand-Text nach Dateityp (Top):** `.mdx` 1.216 · `.tsx` 520 · `.ts` 210 · `.md` 155 · `.json` 118 · `.toml` 36

## 2. Logos & Bild-Assets

- **~600 Bilddateien** mit „supabase" im Pfad (svg/png/jpg/webp/ico/gif)
- 30 davon explizit Logo-Dateien, zentral in:
  - `packages/common/assets/images/supabase-logo-*` ← **wichtigste Quelle**, wird app-übergreifend importiert
  - `apps/studio/public/supabase-logo.svg`, `apps/studio/public/img/supabase-logo.*`
  - `apps/docs/public/img/supabase-logo-*`, `apps/www/public/images/supabase-logo*`

## 3. Fonts ⚠️ (Lizenzrisiko — nicht von Apache-2.0 gedeckt)

| Verzeichnis | Schrift | Status |
|---|---|---|
| `apps/www/public/fonts/custom/` | CustomFont-* (Suisse Intl) | ❌ kommerziell → entfernen/ersetzen |
| `apps/www/public/fonts/state-of-startups/` | SuisseIntl-* | ❌ kommerziell → entfernen |
| `apps/www/public/fonts/launchweek/14` | Nippo, Arial | ❌ kommerziell → entfernen |
| `apps/www/public/fonts/source-code-pro/` | Source Code Pro | ✅ SIL OFL (frei nutzbar) |
| `apps/studio/fonts`, `packages/common/assets/fonts` | (prüfen) | ⚠️ einzeln prüfen |
| `monaco-editor/.../codicon` | Codicons | ✅ Teil von Monaco (MIT) |

## 4. Hochpriorität user-facing (zuerst anpacken)

- `apps/studio/pages/_app.tsx` (App-Titel/Meta des Dashboards)
- Page-Titel / SEO-Meta / `manifest`/Favicon in `apps/studio`, `apps/www`, `apps/docs`
- `packages/common/assets/images/` (zentrale Logos)
- Zahlreiche `.env.example` in `examples/` (nur Beispiele — niedrige Prio)

## 5. Reihenfolge-Empfehlung für die eigentliche Umsetzung

1. **Logos zentral ersetzen** (`packages/common/assets/images/`) → größter Hebel
2. **App-Metadaten** (Titel, Favicon, Manifest, SEO) in studio/www/docs
3. **Proprietäre Fonts entfernen/ersetzen** (Lizenzpflicht)
4. **Brand-Text in UI** (`.tsx`) — gezielt, nicht blind ersetzen
5. **Doku** (`.mdx`/`.md`) — größter Textblock, ggf. später / teilweise verwerfen
6. **NICHT ersetzen:** `@supabase/*` Importe, Copyright-Header, `LICENSE`

## 6. Was bewusst bleibt (Lizenzpflicht)

- `LICENSE` (Apache-2.0) + Copyright-Header in Quelldateien
- MIT-Vermerke in den MIT-Paketen
- Kennzeichnung wesentlicher Änderungen (Apache §4b)
