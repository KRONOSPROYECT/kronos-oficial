// Simulación de rate limit simple
const requests = new Map<string, number>();

export function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  const requestTimes = (requests.get(ip) || []).filter((time) => time > windowStart);

  if (requestTimes.length >= limit) {
    return false;
  }

  requestTimes.push(now);
  requests.set(ip, requestTimes);
  return true;
}