import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { dbHeavent } from './fonts'

//const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${dbHeavent.className} ${dbHeavent.variable}`}>{children}</body>
    </html>
  )
}
