import NodeCache from "node-cache";

/**
 * A singleton cache instance for weather lookups.
 * Keys should be unique per widget (we’ll use widget._id as string).
 */
const CACHE_TTL_SECONDS = 300; // 5 minutes
const cache = new NodeCache({ stdTTL: CACHE_TTL_SECONDS });

export interface CachedWeather<T> {
  data: T;
  fetchedAt: Date;
}

/**
 * Try to retrieve cached data by key.
 * @param key Unique cache key (e.g. widget._id.toString())
 * @returns the cached entry or undefined
 */
export function getCached<T>(key: string): CachedWeather<T> | undefined {
  return cache.get<CachedWeather<T>>(key);
}

/**
 * Store data under `key`, stamping it with the current time.
 * @param key Unique cache key
 * @param data The payload to cache
 */
export function setCached<T>(key: string, data: T): void {
  cache.set(key, { data, fetchedAt: new Date() });
}
