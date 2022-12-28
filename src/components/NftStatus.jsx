import ReactTooltip from "react-tooltip";
import useNftStatus, { STATUS } from "../hooks/useNftStatus";

export default function NftStatus({ nft }) {
  const { status } = useNftStatus(nft);

  return (
    <>
      <div className=" flex justify-end items-end  text-sm">
        <div className="bg-[#800101] text-sm p-1 mt-6">
          {status === STATUS.AT_LIQUIDATION_RISK && (
            <span>Liqudation Risk</span>
          )}
          {status === STATUS.LIQUIDATABLE && <span>Liquidatable</span>}
        </div>
      </div>
      <ReactTooltip />
    </>
  );
}
