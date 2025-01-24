import {Roboto, Kaushan_Script} from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-kaushan',
})



export const robotoVar = roboto.variable
export const kaushanVar = kaushan.variable