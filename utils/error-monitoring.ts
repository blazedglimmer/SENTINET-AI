import * as Sentry from '@sentry/nextjs';

export function initErrorMonitoring() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development',
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logError(error: Error, context?: Record<string, any>) {
  console.error('Error:', error);

  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    });
  }
}
