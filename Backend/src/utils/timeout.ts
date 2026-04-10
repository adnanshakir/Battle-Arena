// Bounds external/AI latency so API workers are not held indefinitely by slow model calls.
import { AppError } from "./app-error.js";

export const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new AppError("Request timeout", 408)), ms),
    ),
  ]);
};