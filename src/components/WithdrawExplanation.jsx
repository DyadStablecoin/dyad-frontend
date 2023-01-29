import { SAFETY_MODE_THRESHOLD } from "../consts/consts";

export default function WithdrawExplanation() {
  return (
    <div>
      <b>Withdraw deposited DYAD from your dNFT to your wallet</b>
      <div className="mt-6">
        <div className="flex flex-col gap-2">
          <div>
            1) The Amount to withdraw cannot be smaller than the dNFT deposit
          </div>
          <div>
            2) The Collateralization Ratio cannot be smaller than{" "}
            {SAFETY_MODE_THRESHOLD}% after the withdrawal
          </div>
          <div>
            3) The dNFT withdrawal cannot be smaller than the average TVL after
            the withdrawal
          </div>
        </div>
      </div>
    </div>
  );
}
