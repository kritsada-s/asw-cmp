import type { Metadata } from 'next'
import './globals.css'
import { dbHeavent } from './fonts'
import { Providers } from "./providers";
import ogImage from './images/og.webp';
import Script from 'next/script';

const GTM_IDS = ['GTM-MM872QW', 'GTM-TBK5MKM5'];

export const metadata: Metadata = {
  title: 'ASSETWISE ใจใหญ่ให้เต็มแม็กซ์',
  description: '28 คอนโดใหม่และพร้อมอยู่กับข้อเสนอแบบเต็มแม็กซ์​ ส่วนลดสูงสุด 1,500,000 บาท* และรับ Samsung Galaxy Z Fold 7 ทุกยูนิต*',
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
        <meta property="og:image" content={ogImage.src} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content={String(metadata.title)} />
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
