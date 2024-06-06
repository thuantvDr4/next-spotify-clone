import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import QueryProvider from "@/providers/QueryProvider";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const userSongs = await getSongById();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <QueryProvider>
            <UserProvider>
              <ModalProvider />
              <Sidebar>{children}</Sidebar>
              <Player />
            </UserProvider>
          </QueryProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
