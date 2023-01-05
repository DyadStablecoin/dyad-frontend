import Claim from "./Claim";
import NFTs from "./NFTs";

export default function Home() {
  console.log("Home: Rendering");

  return (
    <>
      <Claim />
      <div className="mt-[1rem] flex justify-center items-center w-full">
        <NFTs />
      </div>
    </>
  );
}
