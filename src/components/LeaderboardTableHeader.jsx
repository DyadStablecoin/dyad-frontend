import SortableHeader from "./LeaderboardTableHeaderSortable";

export default function LeaderboardTableHeader({ sortBy, setSortBy }) {
  return (
    <tr className="text-[#737E76]">
      <th></th>
      <th>rank</th>
      <SortableHeader header="xp" sortBy={sortBy} setSortBy={setSortBy} />
      <th>value</th>
      <SortableHeader header="deposit" sortBy={sortBy} setSortBy={setSortBy} />
      <SortableHeader
        header="withdrawn"
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <th className="hidden md:table-cell">Deposit Ratio</th>
      <th>Address</th>
    </tr>
  );
}
