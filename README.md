# Billing Ops Console

Panel interno de operaciones de cobros y suscripciones. Ingiere eventos de **Stripe Test Mode**, proyecta estado en **PostgreSQL (Neon)**, gestiona una cola de pagos fallidos, automatiza dunning y (más adelante) exporta reportes a object storage.

No es una pasarela de pagos ni una app para el cliente final: complementa Stripe organizando el trabajo operativo (ops / finanzas).

**Demo desplegada:** [https://billing-ops-console.vercel.app/](https://billing-ops-console.vercel.app/)

Estado actual: **Sprint 1** — bootstrap del monolito (setup, Neon, CI, deploy vacío). Aún sin auth, webhooks ni cola de casos.

---

## Stack (pineado)

| Capa | Tecnología |
|---|---|
| Runtime | Node.js **22.x** (`.nvmrc` → `22`) |
| App | **Next.js 15** (App Router) + **React 19** + **TypeScript** |
| UI | **Tailwind CSS 3.4** + **shadcn/ui** |
| ORM / DB | **Prisma 6** + **PostgreSQL 16** en **Neon** |
| Deploy | **Vercel** (Hobby) |
| Package manager | **pnpm** |
| Calidad | ESLint 9, Prettier 3, **Vitest**, GitHub Actions |

Próximos (sprints siguientes, según especificación): Auth.js v5, Stripe webhooks, Resend, Gemini, Cloudflare R2.

**Decisiones fijas:** sin Docker local (Postgres = Neon); sin microservicios / NATS / Kafka (Stripe es el bus de eventos).

---

## Arquitectura de carpetas (borrador)

Enfoque oficial: **Layered + puertos ligeros** (no hexagonal completa).

```text
src/
  app/                 # Next.js App Router (UI + route handlers) — adapters de entrada
  components/          # UI (shadcn, etc.)
  domain/              # reglas/estados (sin Prisma/Stripe/Next)
  application/         # use cases
  infrastructure/
    db/                # Prisma / DAL
    stripe/            # adapter Stripe
    email/             # adapter Resend (+ mock en tests)
    ai/                # adapter Gemini
    storage/           # adapter R2 (ReportStorage) — plus
  lib/                 # auth wiring, env, utils (sin reglas de negocio)
```

Puertos solo donde hay (o habrá) segundo adapter / mock: Stripe, email, AI, storage. Prisma sin repositorios genéricos por tabla.

---

## Requisitos locales

- Node.js **22.x** (mínimo 22.12+)
- pnpm 9+ (recomendado pnpm 11)
- Cuenta Neon con `DATABASE_URL` (connection pooling)
- Git

No se usa Docker Desktop en este proyecto.

---

## Cómo correr en local

1. Clonar el repo y entrar a la carpeta del proyecto.

2. Instalar dependencias:

```bash
pnpm install
```

3. Copiar variables de entorno:

```bash
cp .env.example .env
```

Editar `.env` y poner tu `DATABASE_URL` real de Neon (nunca commits secretos).

4. Aplicar migraciones Prisma:

```bash
pnpm exec prisma migrate deploy
```

5. Levantar la app:

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Scripts útiles

| Script | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` / `pnpm start` | Build y servidor de producción |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest (unit/stubs) |
| `pnpm format` | Prettier |

---

## Variables de entorno

Ver `.env.example`. Hoy solo:

- `DATABASE_URL` — Postgres Neon (pooling)

Valores reales: `.env` local y secretos de Vercel. Nunca en el repo.

---

## CI

GitHub Actions (`.github/workflows/ci.yml`): en push/PR a `main` corre `pnpm lint` + `pnpm test` (Node 22 + pnpm 11).

---

## Roadmap breve

1. Auth (ADMIN / OPERATOR) + shell del panel  
2. Webhooks Stripe + idempotencia + proyección  
3. Cola de pagos fallidos + auditoría  
4. Dunning + Resend + Cron  
5. IA asistida (Gemini) + export CSV a R2  

Documentación de producto/plan: carpeta `Documentación de workflow` del plan Agosto en Adelante V3 (especificación = fuente de verdad).
