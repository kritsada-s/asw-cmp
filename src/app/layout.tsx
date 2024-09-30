import type { Metadata } from 'next'
import './globals.css'
import { dbHeavent } from './fonts'
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'บุฟเฟ่ต์ 999 สุขได้ไม่อั้น',
  description: 'บุฟเฟ่ต์ 999 สุขได้ไม่อั้น',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dbHeavent.className} ${dbHeavent.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
