import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { AnalyticsEvents, Header, Footer } from '@/components';
import { siteConfig } from '@/lib/config';
import './globals.css';

// TODO: Replace with the GA4 Measurement ID once provisioned.
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Men’s Hair Salon in ${siteConfig.neighborhood}, ${siteConfig.stateAbbr}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Men’s Hair Salon in ${siteConfig.neighborhood}, ${siteConfig.stateAbbr}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
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
      {process.env.NODE_ENV === 'production' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && (
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
      <body className={`${inter.className} antialiased bg-black text-neutral-100`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
