import { useState } from "react";
import Claim from "./Claim";
import Dropdown from "./Dropdown";
import NFTs from "./NFTs";

export default function Home() {
  console.log("Home: Rendering");

  const [option, setOption] = useState("fff");

  return (
    <>
      <Dropdown options={["fff", "xxx"]} onChange={setOption} />
      <div>{option}</div>
      {/* <Claim /> */}
      {/* <div className="mt-[1rem] flex justify-center items-center w-full"> */}
      {/*   <NFTs /> */}
      {/* </div> */}
    </>
  );
}
