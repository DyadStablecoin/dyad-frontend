import Label from "./Label";
import {
  accrueXP,
  dyadBurnLiability,
  dyadMintAllocation,
} from "../utils/stats";
import { round } from "lodash";
import useMintAllocation from "../hooks/useMintAllocation";
import useAvgMinted from "../hooks/useAvgMintedFromIndexer";

export default function NftPerformance({ nft }) {
  const { mintAllocation } = useMintAllocation(nft.xp);
  const { avgMinted } = useAvgMinted();

  return (
    <div className="flex flex-col items-start md:ml-4">
      <Label>Performance</Label>
      <div className="flex flex-col items-start text-s text-[#519C58]">
        <div className="">
          {round(dyadMintAllocation(mintAllocation, nft), 3)}
          x/
          {round(dyadBurnLiability(mintAllocation, nft, avgMinted), 3)}x
        </div>
        <div className="w-[5rem] text-white">
          {round(accrueXP(mintAllocation), 3)}x XP
        </div>
      </div>
    </div>
  );
}
