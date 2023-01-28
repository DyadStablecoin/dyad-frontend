import useIsSnipable from "../hooks/useIsSnipable";
import Mint from "./Mint";
import NFTs from "./NFTs";

export default function Home() {
  useIsSnipable(2);
  return (
    <>
      <Mint />
      <div className="mt-[1rem] flex justify-center items-center w-full">
        <NFTs />
      </div>
    </>
  );
}
