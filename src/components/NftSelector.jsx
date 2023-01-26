import NftView from "./NftView";

export default function NftSelector({ tokenIds, setSelectedTokenId }) {
  return (
    <table>
      <tr>
        <th></th>
        <th>Rank</th>
        <th>XP</th>
        <th>Value</th>
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
