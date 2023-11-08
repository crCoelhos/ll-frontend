import Image from "next/image";
import { Inter as FontSans } from "next/font/google"
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function Home() {
  return <>index</>;
}
