import NftView from "./NftView";

export default function NftSelector({ tokenIds, setSelectedTokenId }) {
  return (
    <table>
      <tr className="border-[#3A403C] border-t border-b">
        <th></th>
        <th className="text-sm text-secondary">Rank</th>
        <th className="text-sm text-secondary">XP</th>
        <th className="text-sm text-secondary">Value</th>
      </tr>
      {tokenIds.map((tokenId) => {
        return (
          <NftView
            tokenId={parseInt(tokenId._hex)}
            setSelectedTokenId={setSelectedTokenId}
          />
        );
      })}
    </table>
  );
}
