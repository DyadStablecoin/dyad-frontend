import useNftStatus, { STATUS } from "../hooks/useNftStatus";
import ActivationSwitch from "./ActivationSwitch";

export default function NftStatus({ nft, onOpenActivate, onOpenDeactivate }) {
  const { status } = useNftStatus(nft);

  return (
    <div className="flex justify-end items-end text-sm gap-2">
      <div className="flex gap-2 p-1 -mb-4 -mr-4 mt-9">
        <ActivationSwitch
          nft={nft}
          onOpenActivate={onOpenActivate}
          onOpenDeactivate={onOpenDeactivate}
        />
        {status !== STATUS.RISK_FREE && (
          <div className="bg-[#800101] text-sm ">
            {status === STATUS.AT_LIQUIDATION_RISK && (
              <span>Liqudation Risk</span>
            )}
            {status === STATUS.LIQUIDATABLE && <span>Liquidatable</span>}
          </div>
        )}
      </div>
    </div>
  );
}
