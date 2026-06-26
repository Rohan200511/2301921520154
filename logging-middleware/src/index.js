const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs"

const allowedStacks = new Set(["backend", "frontend"])
const allowedLevels = new Set(["debug", "info", "warn", "error", "fatal"])
const allowedPackages = new Set([
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
  "api",
  "component",
  "hook",
  "page",
  "state",
])

function normalize(value) {
  return String(value ?? "").trim().toLowerCase()
}

function getAuthHeader(jwtToken) {
  if (jwtToken) {
    return { Authorization: `Bearer ${jwtToken}` }
  }
  return {}
}

export async function Log(stack, level, packageName, message, jwtToken = null) {
  const payload = {
    stack: normalize(stack),
    level: normalize(level),
    package: normalize(packageName),
    message: String(message ?? ""),
  }

  if (!allowedStacks.has(payload.stack) || !allowedLevels.has(payload.level) || !allowedPackages.has(payload.package)) {
    console.warn("Skipping invalid log payload", payload)
    return null
  }

  try {
    const authHeaders = getAuthHeader(jwtToken)
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(payload),
    })

    const contentType = response.headers.get("content-type") || ""
    const responseBody = contentType.includes("application/json")
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      console.warn("Logging service returned a non-success response", response.status, responseBody)
      return {
        ok: false,
        status: response.status,
        data: responseBody,
      }
    }

    return {
      ok: true,
      status: response.status,
      data: responseBody,
    }
  } catch (error) {
    console.warn("Logging service request failed", error)
    return {
      ok: false,
      error,
    }
  }
}
