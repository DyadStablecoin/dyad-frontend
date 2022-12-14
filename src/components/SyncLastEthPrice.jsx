import { SwapRightOutlined } from "@ant-design/icons";
import useEthPrice from "../hooks/useEthPrice";
import useLastEthPrice from "../hooks/useLastEthPrice";
import { round } from "../utils/currency";

export default function SyncLastEthPrice() {
  const { ethPrice } = useEthPrice();
  const { lastEthPrice } = useLastEthPrice();

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-[#737E76]">Price</div>
        <div>{lastEthPrice}</div>
      </div>
      <div>
        <SwapRightOutlined />
      </div>
      <div className="flex gap-6 items-center justify-center">
        {ethPrice}
        <div className="flex gap-1 items-center">
          <div className="text-sm ">
            {lastEthPrice - ethPrice < 0 ? (
              <span className="text-green-300">+</span>
            ) : (
              <span className="text-red-300">-</span>
            )}
          </div>
          <div className="text-sm">
            {Math.abs(round(lastEthPrice - ethPrice, 2))}
          </div>
        </div>
      </div>
    </div>
  );
}
