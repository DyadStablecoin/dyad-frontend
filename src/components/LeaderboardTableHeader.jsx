import {
  CaretDownOutlined,
  CaretUpOutlined,
  SwapOutlined,
} from "@ant-design/icons";

export default function LeaderboardTableHeader({ sortBy, setSortBy }) {
  return (
    <tr className="text-[#737E76]">
      <th></th>
      <th>Rank</th>
      <th>
        <div className="flex items-center justify-center gap-1">
          <div>XP</div>
          <SwapOutlined
            rotate={90}
            onClick={() =>
              setSortBy({
                name: "xp",
                asc: { ...sortBy.asc, xp: !sortBy.asc.xp },
              })
            }
          />
          {sortBy.name === "xp" && (
            <div className="flex flex-col">
              {!sortBy.asc.xp ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </div>
          )}
        </div>
      </th>
      <th>value</th>
      <th className="hidden md:table-cell">
        <div className="flex items-center justify-center gap-1">
          <div>Deposited</div>
          <SwapOutlined
            rotate={90}
            onClick={() =>
              setSortBy({
                name: "deposit",
                asc: { ...sortBy.asc, deposit: !sortBy.asc.deposit },
              })
            }
          />
          {sortBy.name === "deposit" && (
            <div className="flex flex-col">
              {!sortBy.asc.deposit ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </div>
          )}
        </div>
      </th>
      <th className="hidden md:table-cell">
        <div className="flex items-center justify-center gap-1">
          <div>Withdrawn</div>
          <SwapOutlined
            rotate={90}
            onClick={() =>
              setSortBy({
                name: "withdrawn",
                asc: { ...sortBy.asc, withdrawn: !sortBy.asc.withdrawn },
              })
            }
          />
          {sortBy.name === "withdrawn" && (
            <div className="flex flex-col">
              {!sortBy.asc.withdrawn ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </div>
          )}
        </div>
      </th>
      <th className="hidden md:table-cell">Deposit Ratio</th>
      <th>Address</th>
    </tr>
  );
}
