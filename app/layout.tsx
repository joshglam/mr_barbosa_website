import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { AnalyticsEvents, Header, Footer } from '@/components';
import { siteConfig } from '@/lib/config';
import './globals.css';

// TODO: Replace with your GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Professional ${siteConfig.vertical} in ${siteConfig.city}, ${siteConfig.stateAbbr}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="llms-txt" href="/llms.txt" />
      </head>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
          <AnalyticsEvents />
        </>
      )}
      <body className={`${inter.className} antialiased bg-white`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
