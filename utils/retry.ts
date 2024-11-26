interface RetryConfig {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const { maxAttempts = 3, baseDelay = 1000, maxDelay = 10000 } = config;

  let attempt = 1;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= maxAttempts) {
        throw error;
      }

      const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);

      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }
}
