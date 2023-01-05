import Chart from "./Chart";
import useXpFromIndexer from "../hooks/useXpFromIndexer";
import LoadingInplace from "./LoadingInplace";

export default function NftXpChart({ nft }) {
  const { xps, isLoading } = useXpFromIndexer(nft);

  return (
    <div className="h-[10rem]">
      <div className="flex items-center justify-center">
        <LoadingInplace isLoading={isLoading} />
      </div>
      <Chart data={xps} dataKey="xp" />
    </div>
  );
}
