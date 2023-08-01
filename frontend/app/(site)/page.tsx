"use client";
import Image from "next/image";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session: any = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);
  return (
    <div className="h-screen flex-col bg-background  ">
      {/* Header */}
      <div className="w-full justify-center flex py-4 border-b-[1px] border-secondary">
        <Image src="/logo5.png" width={200} height={100} alt="logo" />
      </div>
      {/* Content */}
      <div className=" w-full flex flex-row gap-20 justify-center items-center mt-20 ">
        <Image src="/artx.png" width={600} height={600} alt="art" />
        <div className="w-1/2 items-start justify-center flex flex-col gap-4 text-lg text-text mt-10">
          <p className="text-5xl font-bold">
            Start playing some tunes, because the world needs to
            <span className="text-primary"> hear</span>.
          </p>
          <p className="text-2xl mt-16">
            <span className="text-primary font-bold">
              Unleash Your Inner DJ:
            </span>{" "}
            Tune in, Create, and Share your unique soundtrack with the World
          </p>
          <div className="flex flex-row mt-16 gap-4">
            <p>
              {session.status === "authenticated" ? (
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="py-4 px-4 rounded-md flex flex-row items-center gap-2 bg-primary text-background border-[2px] border-secondary"
                >
                  Logged in as {session.data.user?.name}
                  <br></br>Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => signIn("spotify")}
                  disabled={session.status === "loading"}
                  className="py-4 px-4 rounded-md flex flex-row items-center gap-2 bg-primary text-background border-[2px] border-secondary"
                >
                  <Image
                    src="/Spotify_Icon_CMYK_Black.png"
                    width={50}
                    height={50}
                    alt="spotify logo"
                  />{" "}
                  Login with Spotify
                </button>
              )}
            </p>
            <button className="py-4 px-8 rounded-md bg-secondary">
              How does it work?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
