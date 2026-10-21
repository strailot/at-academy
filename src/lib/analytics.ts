export const analytics = {
  trackEvent: (event: string, props?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;
    console.log('[Analytics]', event, props);
  },
};