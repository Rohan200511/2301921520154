# Logging Middleware

A reusable logging package for frontend and backend applications that sends structured logs to a centralized logging service.

## Installation

```bash
npm install logging-middleware
```

Or use the local package:

```bash
npm install ../logging-middleware
```

## Usage

### Frontend (with Vite environment variables)

```javascript
import { Log } from 'logging-middleware'

// Call Log with JWT token from environment
const jwtToken = import.meta.env.VITE_JWT_TOKEN
await Log('frontend', 'info', 'page', 'User navigated to dashboard', jwtToken)
```

### Backend (Node.js)

```javascript
import { Log } from 'logging-middleware'

// Call Log with JWT token from environment
const jwtToken = process.env.JWT_TOKEN
await Log('backend', 'error', 'db', 'Connection failed', jwtToken)
```

## API

### `Log(stack, level, package, message, jwtToken)`

Sends a log entry to the logging service.

**Parameters:**
- `stack` (string): `"backend"` or `"frontend"`
- `level` (string): `"debug"`, `"info"`, `"warn"`, `"error"`, or `"fatal"`
- `package` (string): Valid package name (see below)
- `message` (string): Descriptive log message
- `jwtToken` (string, optional): JWT token for authentication

**Backend Packages:**
- `cache`, `controller`, `cron_job`, `db`, `domain`, `handler`, `repository`, `route`, `service`

**Frontend Packages:**
- `api`, `component`, `hook`, `page`, `state`

**Returns:**
- `{ ok: true, status: 200, data: {...} }` on success
- `{ ok: false, status: 401, data: {...} }` on auth error
- `{ ok: false, error: Error }` on network error
- `null` if validation fails

## Examples

```javascript
import { Log } from 'logging-middleware'

// Frontend example
await Log('frontend', 'info', 'page', 'Notifications page mounted', jwtToken)
await Log('frontend', 'error', 'hook', 'Failed to fetch notifications: timeout', jwtToken)

// Backend example
await Log('backend', 'info', 'db', 'User record created', jwtToken)
await Log('backend', 'fatal', 'db', 'Critical database connection failure', jwtToken)
```

## Configuration

Set your JWT token in environment variables:

**Frontend (.env):**
```
VITE_JWT_TOKEN=your_jwt_token_here
```

**Backend (.env):**
```
JWT_TOKEN=your_jwt_token_here
```
