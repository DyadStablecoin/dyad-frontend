import useXpFromIndexer from "../hooks/useXpFromIndexer";
import Chart from "./Chart";
import Claim from "./Claim";
import NFTs from "./NFTs";

const data = [{ uv: 400 }, { uv: 500 }, { uv: 200 }, { uv: 600 }, { uv: 800 }];

export default function Home() {
  console.log("Home: Rendering");

  const { xps } = useXpFromIndexer();

  return (
    <>
      <div className="w-[98%] h-[10rem]">
        <Chart data={xps} dataKey="xp" />
      </div>
      {/* <Claim /> */}
      {/* <div className="mt-[1rem] flex justify-center items-center w-full"> */}
      {/*   <NFTs /> */}
      {/* </div> */}
    </>
  );
}
