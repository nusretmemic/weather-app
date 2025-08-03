# Weather Dashboard App

A full-stack weather dashboard application built with Next.js (frontend) and Express/TypeScript (backend), deployed on AWS (Amplify, ECR, App Runner). Users can search for cities, add widgets to view live weather data (temperature, wind, humidity), and delete them.

---

## 🚀 Features

- **Dynamic Widgets**: Add/remove multiple weather widgets for different cities.
- **Live Data**: Fetches real-time weather from Open-Meteo with 5-minute in-memory caching.
- **City Search**: Autocomplete using geocoding API (Open-Meteo) with debounced input.
- **Clean UI**: Built with Next.js, shadcn/ui, and Tailwind CSS; responsive and animated.
- **API Documentation**: Interactive Swagger UI available at `/docs`, powered by an OpenAPI 3.0 spec.
- **Comprehensive Testing**: Jest & Supertest suite with an in-memory MongoDB for all backend endpoints.
- **Deployment**: Frontend on AWS Amplify, backend containerized to ECR & served via App Runner.

---

## 🔗 Live Demo

[https://master.d2ywy9jgi28lsk.amplifyapp.com](https://master.d2ywy9jgi28lsk.amplifyapp.com)

---

## 📁 Project Structure

```
/project-root
├── backend/                # Express API (TypeScript)
│   ├── __tests__/          # Jest test suites
│   ├── cache/              # Cache abstraction (node-cache)
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Common & error-handling middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # Router definitions
│   ├── services/           # Business logic (weather, geocoding)
│   ├── types/              # Shared TypeScript interfaces
│   ├── dist/               # Compiled output (gitignored)
│   ├── app.ts              # Entry point
│   ├── deploy.sh           # Deployment script
│   ├── Dockerfile          # Production container build
│   ├── jest.config.ts      # Jest configuration
│   ├── jest.setup.ts       # In-memory MongoDB setup
│   ├── openapi.yaml        # OpenAPI (Swagger) spec
│   ├── package.json        # Scripts: dev, build, start, deploy, test
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── .env                # Environment variables
├── frontend/               # Next.js app
│   ├── components/         # UI components
│   ├── hooks/              # React Query & custom hooks
│   ├── images/             # Static Images
│   ├── lib/                # Axios config. and tailwind utils
│   ├── pages/              # Pages (Pages Router)
│   ├── public/             # Static Assets
│   ├── styles/             # Global CSS file
│   ├── utils/              # Helpers (getWeatherImage)
│   ├── components.json     # Shadcn components config
│   ├── eslint.config.mjs   # ESLINT Config
│   ├── postcss.config.mjs  # Tailwind postcss config
│   ├── package.json        # Scripts: dev, build, start
│   ├── tsconfig.json       # Typescript config
│   └── next.config.js
├── .gitignore
├── package.json            # Scripts: dev, dev:backend, dev:frontend
└── README.md
```

---

## ⚙️ Setup & Local Development

### Prerequisites

- Node.js v18+ & npm
- Docker (optional, for local container builds)
- MongoDB Atlas cluster (connection string)

### Backend

1. **Configure `.env`** in `/backend`:

   ```env
   MONGODB_URI=<your Atlas URI>
   PORT=5000
   ```

2. **Install & build**:

   ```bash
   cd backend
   npm install
   npm run build
   ```

3. **Run locally**:

   ```bash
   npm run dev      # via ts-node
   ```

4. **Run tests**:

   ```bash
   npm test         # runs Jest tests
   ```

5. **Or Docker**:

   ```bash
   docker build -t weather-backend .
   docker run --rm --env-file .env -p 5000:5000 weather-backend
   ```

### Frontend

1. **Configure** (if needed): set `NEXT_PUBLIC_API_URL=http://localhost:5000` in `.env.local`.
2. **Install & run**:

   ```bash
   cd frontend
   npm install
   npm run dev      # http://localhost:3000
   ```

3. **Build**:

   ```bash
   npm run build
   npm start        # serves production build
   ```

### Alternatively

**Local Development Server (Frontend & Backend)**:

```bash
npm install
npm run dev # Frontend: http://localhost:3000, Backend: http://localhost:5000
```

---

## 📝 API Reference

Full API documentation is available at `/docs` (Swagger UI).

Click here to view: [API Docs](https://piapujkq2j.eu-central-1.awsapprunner.com/docs)

### Endpoints

| Method | Endpoint                  | Description                                 |
| ------ | ------------------------- | ------------------------------------------- |
| GET    | `/widgets`                | List all widgets with live weather          |
| POST   | `/widgets`                | Create widget: `{ id, location, lat, lng }` |
| DELETE | `/widgets/:id`            | Delete widget by ID                         |
| GET    | `/locations/search?q=...` | Search for city suggestions                 |

---

## 🏗️ Architecture

- **Express API** handles `/widgets` & `/locations` with TypeScript. Live Weather Data is cached for 5 minutes by in-memory caching via `node-cache`.
- **Next.js Frontend** uses React Query (tanstack) for data fetching, shadcn/ui + Tailwind for UI.
- **Deployment**:

  - Frontend on AWS Amplify (CI/CD on Git push).
  - Backend on AWS App Runner (ECR image, auto-deploy on push).

---

## 📦 Deployment

### Backend

```bash
cd backend
npm run deploy   # runs deploy.sh to build, tag & push Docker image
```

AWS App Runner auto-deploys new image.

### Frontend

```bash
git push          # Amplify hooks deploy on push to master
```

---

## 🤝 Contributing

Feel free to open issues or pull requests.

© 2025 Weather Dashboard App by Nusret Memic
