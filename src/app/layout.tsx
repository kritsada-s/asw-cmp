import type { Metadata } from 'next'
import './globals.css'
import { dbHeavent } from './fonts'
import { Providers } from "./providers";
import ogImage from './images/og.jpg';
import Script from 'next/script';

const GTM_IDS = ['GTM-MM872QW', 'GTM-KSL4R3B5'];

export const metadata: Metadata = {
  title: 'คอนโด AssetWise ทำถึง แจกทองทุกยูนิต ฟรีส่วนกลางสูงสุด 5 ปี*',
  description: 'Assetwise มอบดีลดี จากโครงการ Atmoz - KAVE - Modiz ทั้งหมด 23 โครงการ ไม่ว่าจะเป็นคอนโดติดรถไฟฟ้า คอนโดใกล้มหาลัย และคอนโดทำเลคุณภาพอื่นๆ ถึง 28 กพ.นี้เท่านั้น',
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
        <meta property="og:image:alt" content="แอสเซทไวส์ทำถึง ให้ทองคำทุกยูนิต แจกจริงไม่ต้องลุ้น!" />
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
