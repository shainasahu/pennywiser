import "./globals.css";
import IphoneFrame from "./components/IphoneFrame";
import { Fanwood_Text } from 'next/font/google'

const font1 = Fanwood_Text({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata = {
  title: "PennyWiser",
  description: "Get a Head-Start on your Credit Score as a student",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font1.className}>
      <body>
        <IphoneFrame>{children}</IphoneFrame>
      </body>
    </html>
  );
}
