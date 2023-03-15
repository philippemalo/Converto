// CURRENTLY NOT IN USE BUT CAN BE USED TO CACHE HEAVY RESPONSES IN THE FUTURE

import NodeCache from "node-cache";
import { RequestHandler } from "express";

const cache = new NodeCache();

const cacheMiddleware: RequestHandler = (req, res, next) => {
  if (req.method !== "GET") {
    next();
    return;
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.send(cachedResponse);
    return;
  } else {
    const originalSendMethod = res.send;
    res.send = (body: any): any => {
      cache.set(key, body);
      originalSendMethod(body);
    };
    next();
  }
};

export default cacheMiddleware;
