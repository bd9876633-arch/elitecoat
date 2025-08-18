// app/layout.js
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export const metadata = {
  title:
    'EliteCoat Interiors Ltd | Plastering, Decorating & Interiors – Wolverhampton',
  description:
    'Skim coat (Multi-Finish), drylining, painting & decorating (incl. wallpaper), tiling, flooring & paving. Clean, punctual, reliable. Call 07843 174 557.',
  metadataBase: new URL('https://elitecoatinteriors.co.uk'),
  openGraph: {
    title: 'EliteCoat Interiors Ltd',
    description:
      'Quality plastering & interiors across Wolverhampton and the West Midlands.',
    url: 'https://elitecoatinteriors.co.uk',
    siteName: 'EliteCoat Interiors Ltd',
    images: [{ url: '/images/1.jpg', width: 1200, height: 630, alt: 'EliteCoat project' }],
    locale: 'en_GB',
    type: 'website',
  },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-8SXHTB3J4V'; // pune ID-ul tău GA4 sau lasă așa dacă nu folosești GA

  return (
    <html lang="en">
      <body className="antialiased">
        {children}

        {/* Vercel Analytics – pageviews & performance (fără cookie banner) */}
        <Analytics />

        {/* --- Opțional GA4: dacă nu folosești, poți șterge cele două Script-uri de mai jos. --- */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            if ('${GA_ID}' && '${GA_ID}' !== 'G-8SXHTB3J4V') {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
