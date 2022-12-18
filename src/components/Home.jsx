import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import Claim from "./Claim";
import NFTs from "./NFTs";
import { CONTRACT_dNFT } from "../consts/contract.js";

export default function Home() {
  useEffect(() => {
    async function ff() {
      supabase
        .from("nfts")
        .select("*")
        .eq("contractAddress", CONTRACT_dNFT)
        .order("xp", { ascending: false })
        .then((res) => {
          console.log(res.data);
        });
    }
    ff();
  }, []);
  return (
    <>
      {/* <Claim /> */}
      {/* <div className="mt-[1rem] flex justify-center items-center w-full"> */}
      {/*   <NFTs /> */}
      {/* </div> */}
    </>
  );
}
