import dynamic from "next/dynamic";

// THESE ARE TEMPORARY.
const Mint = dynamic(() => import("./Mint"), { ssr: false });
const NFTs = dynamic(() => import("./NFTs"), { ssr: false });

export default function Home() {
  return (
    <>
      <Mint />
      <div className="mt-[1rem] flex justify-center items-center w-full">
        <NFTs />
      </div>
    </>
  );
}
