import { CheckCircleOutlined } from "@ant-design/icons";
import { COLORS } from "../consts/colors";
import useNftStatus, { STATUS } from "../hooks/useNftStatus";

export default function NftStatus({ nft }) {
  const { status } = useNftStatus(nft);

  return (
    <div className="flex justify-end items-end text-sm">
      {status === STATUS.SYNC_CALLER && (
        <div
          className={`p-1 -mb-4 -mr-4 mt-9`}
          style={{ background: COLORS.Beige }}
        >
          <div className="flex gap-2 items-center justify-center">
            <CheckCircleOutlined />
            Synchronized
          </div>
        </div>
      )}

      {status === STATUS.AT_LIQUIDATION_RISK && (
        <span className="bg-[#800101] p-1 -mb-4 -mr-4 mt-9">
          Liqudation Risk
        </span>
      )}

      {status === STATUS.LIQUIDATABLE && (
        <span className="bg-[#800101] p-1 -mb-4 -mr-4 mt-9">Liquidatable</span>
      )}
    </div>
  );
}
