import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Hi guys 👋</h1>
      <p className="text-gray-600">Welcome to your finance tracker!</p>
    </div>
  );
}
