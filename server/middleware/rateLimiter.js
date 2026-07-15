const requestStore = new Map();

export function rateLimiter(req, res, next) {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  const now = Date.now();

  // 24 Hours
  const DAY = 24 * 60 * 60 * 1000;

  if (!requestStore.has(ip)) {
    requestStore.set(ip, {
      count: 1,
      start: now,
    });

    return next();
  }

  const user = requestStore.get(ip);

  if (now - user.start > DAY) {
    user.count = 1;
    user.start = now;
    return next();
  }

  if (user.count >= 10) {
    return res.status(429).json({
      error: "Daily free limit reached.",
    });
  }

  user.count++;

  next();
}