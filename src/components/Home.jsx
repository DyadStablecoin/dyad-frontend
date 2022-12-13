import Claim from "./Claim";
import Liquidate from "./Liquidate";
import NFTs from "./NFTs";

export default function Home() {
  return (
    <>
      <Liquidate />
      <div className="mt-[1rem] flex justify-center items-center w-full">
        <NFTs />
      </div>
    </>
  );
}
