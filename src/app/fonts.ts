import localFont from 'next/font/local'

export const dbHeavent = localFont({
  src: [
    {
      path: './fonts/DBHeavent.woff2',
      weight: '400',
      style: 'normal',
    },
    // Add other variations if available
    // {
    //   path: './fonts/DBHeavent-Regular.woff',
    //   weight: '400',
    //   style: 'normal',
    // },
  ],
  variable: '--font-db-heavent' // This creates a CSS variable
})