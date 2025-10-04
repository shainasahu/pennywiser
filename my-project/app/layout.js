import "./globals.css";
import IphoneFrame from "./components/IphoneFrame";

export const metadata = {
  title: "Finance ScreenTime",
  description: "Your spending awareness companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <IphoneFrame>{children}</IphoneFrame>
      </body>
    </html>
  );
}
