'use client';

import { useEffect } from 'react';
import { trackPhoneClick, trackEmailClick, trackCTAClick } from '@/lib/analytics';

export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('a');
      if (!link?.href) return;

      if (link.href.startsWith('tel:')) {
        trackPhoneClick();
      } else if (link.href.startsWith('mailto:')) {
        trackEmailClick();
      } else if (
        link.getAttribute('href') === '/free-estimate' ||
        link.textContent?.toLowerCase().includes('free estimate') ||
        link.textContent?.toLowerCase().includes('request estimate')
      ) {
        const section = link.closest('section, header, footer, nav');
        let location = 'unknown';
        if (section) {
          const tag = section.tagName.toLowerCase();
          if (tag === 'header') {
            location = 'header';
          } else if (tag === 'footer') {
            location = 'footer';
          } else {
            const heading = section.querySelector('h1, h2');
            if (heading) {
              const text = heading.textContent?.toLowerCase() ?? '';
              if (text.includes('ready to get started')) {
                location = 'bottom_cta';
              } else if (text.includes('hero') || section.querySelector('video')) {
                location = 'hero';
              } else {
                location = 'section';
              }
            }
          }
        }

        trackCTAClick('free_estimate', location);
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
