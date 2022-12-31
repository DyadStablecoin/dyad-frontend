import useLastEthPrice from "../hooks/useLastEthPrice";
import useOraclePrice from "../hooks/useOraclePrice";
import { round, normalize } from "../utils/currency";
import PopupRow from "./PopupRow";

export default function SyncLastEthPrice() {
  const { oraclePrice } = useOraclePrice();
  const { lastEthPrice } = useLastEthPrice();

  return (
    <PopupRow>
      <div>
        <div className="text-[#737E76]">ETH Price</div>
        <div>{lastEthPrice}</div>
      </div>
      <div className="flex gap-2 items-center justify-center">
        {normalize(oraclePrice, 8)}
        <div className="flex gap-1 items-center">
          <div className="text-sm ">
            {lastEthPrice - normalize(oraclePrice, 8) <= 0 ? (
              <span className="text-green-300">+</span>
            ) : (
              <span className="text-red-300">-</span>
            )}
          </div>
          <div className="text-sm">
            {Math.abs(round(lastEthPrice - normalize(oraclePrice, 8), 2))}
          </div>
        </div>
      </div>
    </PopupRow>
  );
}
