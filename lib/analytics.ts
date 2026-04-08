declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a GA4 custom event. No-ops when gtag is unavailable (e.g. dev, ad-blockers). */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackFormSubmission(formName: string) {
  trackEvent('form_submission', {
    form_name: formName,
    page_path: window.location.pathname,
  });
}

export function trackPhoneClick() {
  trackEvent('phone_click', {
    page_path: window.location.pathname,
  });
}

export function trackEmailClick() {
  trackEvent('email_click', {
    page_path: window.location.pathname,
  });
}

export function trackCTAClick(ctaName: string, ctaLocation: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    page_path: window.location.pathname,
  });
}
