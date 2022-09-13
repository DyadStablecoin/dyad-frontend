import Button from "./Button";

export default function Mint() {
  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex gap-2 text-2xl">
        <div className="underline">2.00</div>
        <div className="underline">ETH</div>
      </div>
      <div>to</div>
      <div className="text-2xl">$3500 DYAD</div>
      <Button>mint DYAD 15-30 min</Button>
      <div className="flex flex-col items-center">
        <div>+8031 dNFTs</div>
        <div>950,000 GAS/ .02 ETH</div>
      </div>
      <Button>mint DYAD instantly</Button>
    </div>
  );
}
