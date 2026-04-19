import localFont from 'next/font/local';
import './globals.css';
import Header from './Components/Header';
import { UserContextProvider } from './Context/UserContext';
import { TimerProvider } from './Context/TimerContext';
import { Toaster } from 'sonner';
import { Roboto } from 'next/font/google';
import Script from 'next/script';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

// ✅ Use Next.js Best Practice for Metadata
export const metadata = {
  metadataBase: new URL('https://trustedgelogistics.com'),
  title: 'TrustEdge Logistics - Fast & Secure Shipping',
  description:
    'Welcome to TrustEdge Logistics - Find Services for shipping your packages, pets, shipment tracking, shipping rates, and tools to support shippers and small business.',
  keywords: ['shipping', 'logistics', 'courier', 'TrustEdge Logistics', 'freight', 'United States track package'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'TrustEdge Logistics',
    description:
      'Welcome to TrustEdge Logistics - Find Services for shipping your packages, pets, and secure global tracking.',
    url: 'https://trustedgelogistics.com',
    siteName: 'TrustEdge Logistics',
    images: [
      {
        url: 'https://trustedgelogistics.com/trust.png',
        width: 1200,
        height: 630,
        alt: 'TrustEdge Logistics Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustEdge Logistics',
    description: 'Fast, secure shipping & tracking worldwide.',
    images: ['https://trustedgelogistics.com/trust.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/trust.png" sizes="32x32" />
        <link rel="icon" href="/trust.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/trust.png" />
        {/* ✅ Organization Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TrustEdge Logistics',
              url: 'https://trustedgelogistics.com',
              logo: 'https://trustedgelogistics.com/trust.png',
              sameAs: [
                'https://wwww.facebook.com/share/1E2yHUswVX/?mibextid=wwXIfr',
              ],
            }),
          }}
        />

        {/* ✅ WebSite Schema Markup (For Search Box & Sitelinks) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'TrustEdge Logistics',
              url: 'https://trustedgelogistics.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://trustedgelogistics.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="gM_uQO8QvZFIBFJqUs_PW4X8Uh35wttDBEu0_zTcAHM"
        />
      </head>
      <body
        className={`${roboto.className} ${roboto.variable} antialiased bg-dark min-h-screen flex flex-col relative text-zinc-900 font-medium`}
      >
        <TimerProvider>
          <UserContextProvider>
            <Header />
            <div>
              <main>{children}</main>
            </div>
          </UserContextProvider>
        </TimerProvider>
        <Toaster
          richColors
          position="top-right"
          toastOptions={{ duration: 4000 }}
        />
        <Script src="//code.jivosite.com/widget/hsuuoFKfg0" strategy="lazyOnload" />
      </body>
    </html>
  );
}
