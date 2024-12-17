# URL Shortener Project

## Overview
This project consists of two components:
1. **URL Shortener Microservice** (built with NestJS):
   - Handles URL shortening, expanding, and redirection.
   - Includes API documentation via Swagger.
2. **Client Application** (built with Next.js):
   - Provides a user-friendly interface to interact with the microservice.

---

## 1. URL Shortener Microservice

### Features
- Shortens a provided URL.
- Expands a shortened URL back to its original form.
- Redirects a shortened URL to its original URL.

### Requirements
- Node.js (v16 or later)
- Docker (optional, for running the microservice in a container)

### Installation and Setup

#### Clone the repository:
```bash
# Clone the server repository
git clone https://github.com/your-repo/url-shortener-service.git
cd url-shortener-service
```

#### Install dependencies:
```bash
npm install
```

#### Run the server:
```bash
npm run start:dev
```
The server will run at: `http://localhost:3001`

#### Run with Docker:
1. Build the Docker image:
   ```bash
   docker build -t url-shortener-service .
   ```
2. Run the container:
   ```bash
   docker run -p 3001:3001 url-shortener-service
   ```

### API Documentation
Access the API documentation at: `http://localhost:3001/api/docs`

#### API Endpoints:
1. **POST /api/shorten**
   - Request: `{ "url": "https://example.com" }`
   - Response: `{ "shortUrl": "http://localhost:3001/api/1234" }`

2. **POST /api/expand**
   - Request: `{ "shortUrl": "http://localhost:3001/api/1234" }`
   - Response: `{ "originalUrl": "https://example.com" }`

3. **GET /api/:shortId**
   - Redirects to the original URL.

### Running Tests
#### Run unit tests:
```bash
npm run test
```
#### Check test coverage:
```bash
npm run test:cov
```

---

## 2. Client Application

### Features
- Allows users to shorten URLs via the microservice.
- Expands shortened URLs back to their original form.
- Opens a URL in a new browser tab.

### Requirements
- Node.js (v16 or later)

### Installation and Setup

#### Clone the repository:
```bash
# Clone the client repository
git clone https://github.com/your-repo/url-shortener-client.git
cd url-shortener-client
```

#### Install dependencies:
```bash
npm install
```

#### Run the application:
```bash
npm run dev
```
The application will run at: `http://localhost:3000`

### Usage
1. Enter a full URL in the input field and click **Shorten URL** to generate a shortened URL.
2. Enter a shortened URL in the input field and click **Expand URL** to retrieve the original URL.
3. Click **Browse** to open the URL (shortened or full) in a new browser tab.

### Configuration
Set the API URL of the microservice in the `.env.local` file of the client application:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## Integration Between Server and Client
- The client (Next.js) sends requests to the microservice (NestJS) via the configured API endpoints.
- Ensure that both applications are running locally:
  - **Server**: `http://localhost:3001`
  - **Client**: `http://localhost:3000`

---

## Acknowledgements
- Server built with **NestJS**.
- Client built with **Next.js**.

For any issues, feel free to open an issue on the repository or contact the project maintainer.
