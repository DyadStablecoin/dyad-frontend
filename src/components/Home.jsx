import Claim from "./Claim";
import NFTs from "./NFTs";

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
          <div className="mt-[5rem]">
            <NFTs
              reload={reload}
              address={address}
              ETH2USD={ETH2USD}
              averageXP={averageXP}
            />
          </div>
        </div>
      ) : (
        <div className="mt-10">Connect your wallet!</div>
      )}
    </>
  );
}
