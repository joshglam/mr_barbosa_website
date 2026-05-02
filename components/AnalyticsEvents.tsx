'use client';

import { useEffect } from 'react';
import { trackCTAClick } from '@/lib/analytics';

export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('a');
      if (!link?.href) return;

      if (link.href.includes('vagaro.com/mrbarbosa')) {
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
              if (text.includes('ready')) {
                location = 'bottom_cta';
              } else if (text.includes('crafting') || text.includes('hero')) {
                location = 'hero';
              } else {
                location = 'section';
              }
            }
          }
        }

        trackCTAClick('book_now', location);
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
