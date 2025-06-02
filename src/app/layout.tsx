import type { Metadata } from 'next'
import './globals.css'
import { dbHeavent } from './fonts'
import { Providers } from "./providers";
const ogImage = 'https://assetwise.co.th/campus-is-calling/images/og.jpg';
import Script from 'next/script';

const GTM_IDS = ['GTM-MM872QW'];

export const metadata: Metadata = {
  title: '𝗖𝗔𝗠𝗣𝗨𝗦 𝗶𝘀 𝗖𝗔𝗟𝗟𝗜𝗡𝗚 เทอมใหม่ คอนโดใหม่ ใกล้มหาลัย 18 คอนโด จาก AssetWise',
  description: 'แคมปัสคอนโด ใกล้มหาลัยชั้นนำ ส่วนกลางจัดเต็ม ครบทุกฟังก์ชัน ตอบโจทย์ทุกไลฟ์สไตล์ ทำเลดีใกล้ ม.เกษตรศาสตร์, ม.มหิดล, ม.ธรรมศาสตร์ ,ม.กรุงเทพ, ม.ศรีปทุม, ม.บูรพา, ม.รังสิต, ม.ราชมงคลธัญบุรี, ม.ศิลปากรสนามจันทร์, ม.พระจอมเกล้าธนบุรี, ม.พระจอมเกล้าเจ้าคุณทหารลาดกระบัง, ม.เกษตรศาสตร์ศรีราชา',
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
        <meta property="og:title" content={String(metadata.title ?? '')} />
        <meta property="og:url" content="https://assetwise.co.th/campus-is-calling" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="th_TH" />
        <meta property="og:site_name" content="AssetWise Campus is Calling" />
        <meta property="og:description" content={String(metadata.description ?? '')} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="AssetWise Campus is Calling" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={String(metadata.title ?? '')} />
        <meta property="twitter:description" content={String(metadata.description ?? '')} />
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
