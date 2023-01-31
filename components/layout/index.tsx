import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { signIn, signOut } from "next-auth/react";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const scrolled = useScroll(50);
  const user = session?.user?.name;
  return (
    <>
      <Meta {...meta} />
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Read Pilot</p>
          </Link>
          {!user ? (
            <>
              <div>
                <AnimatePresence>
                  {!session && status !== "loading"}
                  <motion.a
                    className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                    onClick={() => signIn("whop")}
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Sign In
                  </motion.a>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <div className="mr-4 text-sm">{user ? `Signed in as ${user}` : ''}</div>
              <AnimatePresence>
                {!session && status !== "loading"}
                <motion.a
                  className="inline-block rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => signOut()}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign Out
                </motion.a>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          Powered by{" "}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
          , {""}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://openai.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI
          </a>
          ,&nbsp;and {""}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://whop.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Whop
          </a>
        </p>
      </div>
    </>
  );
}
