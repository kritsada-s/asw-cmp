import type { Metadata } from 'next'
import './globals.css'
import { dbHeavent } from './fonts'
import { Providers } from "./providers";
const ogImage = 'https://assetwise.co.th/campus-is-calling/images/og.jpg';
import Script from 'next/script';

const GTM_IDS = ['GTM-MM872QW'];

export const metadata: Metadata = {
  title: 'Assetwise CAMPUS IS CALLING',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {GTM_IDS.map((id) => (
          <Script
            key={id}
            id={`gtm-script-${id}`}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${id}');
              `,
            }}
          />
        ))}
        <meta property="og:title" content="AssetWise Campus is Calling" />
        <meta property="og:description" content="AssetWise Campus is Calling" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="AssetWise Campus is Calling" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="AssetWise Campus is Calling" />
        <meta property="twitter:description" content="AssetWise Campus is Calling" />
        <meta property="twitter:image" content={ogImage} />
      </head>
      <body className={`${dbHeavent.className} ${dbHeavent.variable}`}>
        {GTM_IDS.map((id) => (
          <noscript key={`gtm-noscript-${id}`}>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${id}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ))}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
