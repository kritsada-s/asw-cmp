import type { Metadata } from 'next'
import './globals.css'
import { dbHeavent } from './fonts'
import { Providers } from "./providers";
import Script from 'next/script';

const GTM_IDS = ['GTM-MM872QW'];

export const metadata: Metadata = {
  title: 'บุฟเฟต์ 999 สุขไม่อั้น: 23 คอนโดพร้อมเสิร์ฟจาก AssetWise พร้อมโปรโมชั่นสุดคุ้ม!',
  description: 'โปรโมชั่นสุดพิเศษจาก AssetWise! คอนโดทำเลดี 23 โครงการ เริ่ม 1.29 - 13 ล้านบาท พร้อมของแถมมูลค่าสูง เช่น iPhone 16 Pro, ผ่อนต่ำ 3,000 บาท/เดือน และลุ้นรับทองคำ 10 บาท! จองวันนี้ - 30 พ.ย. 2567',
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
