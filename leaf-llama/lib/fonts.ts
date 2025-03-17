import {
  Lora,
  Kaushan_Script,
  Varela_Round,
  Poor_Story,
} from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-lora",
});

const poor = Poor_Story({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poor",
});

const varela = Varela_Round({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-varela",
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kaushan",
});

export const loraVar = lora.variable;
export const kaushanVar = kaushan.variable;
export const varelaVar = varela.variable;
export const poorVar = poor.variable;
