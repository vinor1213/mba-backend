# MBA Backend (TypeScript, Express, Sequelize)

Scaffolded backend providing CRUD for News, Events, Announcements with:
- JWT auth (/login, /register)
- Sequelize (MySQL) setup
- Joi validation (sanitize)
- Middleware: logger, cors, auth
- Sample seed script

How to run (on your machine):
1. Copy `.env.example` -> `.env` and edit values (DB credentials, JWT secret).
2. Run `npm install`
3. Run migrations (if any) or just let Sequelize sync in development.
4. Start dev server: `npm run dev`
5. Seed sample data: `npm run seed`

APIs:
- POST /api/auth/register
- POST /api/auth/login
- CRUD routes protected under /api/news, /api/events, /api/announcements

Port default: 3000 (set in .env)
