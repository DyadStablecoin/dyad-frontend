import Claim from "./Claim";
import NFTs from "./NFTs";
import NFTsTable from "./NFTsTable";

export default function Home({
  address,
  isConnected,
  totalSupply,
  reload,
  setReload,
  ETH2USD,
  averageXP,
}) {
  return (
    <>
      {isConnected ? (
        <div className="mt-8">
          <Claim
            address={address}
            reload={reload}
            setReload={setReload}
            ETH2USD={ETH2USD}
            totalSupply={totalSupply}
          />
          <NFTsTable />
          {/* <div className="mt-[10rem]"> */}
          {/*   <NFTs */}
          {/*     reload={reload} */}
          {/*     address={address} */}
          {/*     ETH2USD={ETH2USD} */}
          {/*     averageXP={averageXP} */}
          {/*   /> */}
          {/* </div> */}
        </div>
      ) : (
        <div className="mt-10">Connect your wallet!</div>
      )}
    </>
  );
}
