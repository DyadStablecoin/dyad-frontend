import ProgressBar from "./ProgressBar";
import { formatUSD } from "../utils/currency";
import { dNFT_PRICE } from "../consts/consts";

export default function MobileMenu({ tvl }) {
  const MENU = (
    <div className="flex flex-col justify-center">
      <div style={{ borderBottom: "1px solid #3A403C" }}>
        <div className="flex justify-between m-6 text-xl">
          <div>Home</div>
          <div>{">"}</div>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #3A403C" }}>
        <div className="flex justify-between m-6 text-xl">
          <div>Dashboard</div>
          <div>{">"}</div>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #3A403C" }}>
        <div className="flex justify-between m-6 text-xl">
          <div>Leaderboard</div>
          <div>{">"}</div>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #3A403C" }}>
        <div className="flex justify-between m-6 text-xl">
          <div>Settings</div>
          <div>{">"}</div>
        </div>
      </div>
    </div>
  );

  const STATS = (
    <div>
      <div className="flex justify-around items-center m-4">
        <div className="flex gap-2">
          <div>TVL</div>
          <div>{formatUSD(tvl)}</div>
        </div>
        <div className="h-[25px] w-[1px] bg-[#3A403C]"></div>
        <div className="flex gap-2">
          <div>TOKEN PRICE</div>
          <div>{formatUSD(dNFT_PRICE)}</div>
        </div>
      </div>
      <div className="h-[1px] w-[100%] bg-[#3A403C]"></div>
      <div className="flex gap-2 ml-8 mr-8 mt-4 mb-4 items-center justify-center">
        <div>CR</div>
        <ProgressBar percent={23} fullWidth />
      </div>
      <div className="h-[1px] w-[100%] bg-[#3A403C]"></div>
    </div>
  );

  return (
    <div>
      {STATS}
      {MENU}
    </div>
  );
}
