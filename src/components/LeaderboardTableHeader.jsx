import {
  CaretDownOutlined,
  CaretUpOutlined,
  SwapOutlined,
} from "@ant-design/icons";

export default function LeaderboardTableHeader({ sort, setSort }) {
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
              setSort({ name: "xp", asc: { ...sort.asc, xp: !sort.asc.xp } })
            }
          />
          <div className="flex flex-col">
            {sort.asc[sort.name].xp ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )}
          </div>
        </div>
      </th>
      <th>value</th>
      <th>
        <div className="flex items-center justify-center gap-1">
          <div>Withdrawn</div>
          <SwapOutlined
            rotate={90}
            onClick={() =>
              setSort({
                name: "withdrawn",
                asc: { ...sort.asc, withdrawn: !sort.asc.withdrawn },
              })
            }
          />
          <div className="flex flex-col">
            {sort.asc[sort.name].withdrawn === "withdrawn" ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )}
          </div>
        </div>
      </th>
      <th>
        <div className="flex items-center justify-center gap-1">
          <div>Deposited</div>
          <SwapOutlined
            rotate={90}
            onClick={() =>
              setSort({
                name: "deposit",
                asc: { ...sort.asc, deposit: !sort.asc.deposit },
              })
            }
          />
          <div className="flex flex-col">
            {sort.asc[sort.name].deposit === "deposit" ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )}
          </div>
        </div>
      </th>
      <th className="hidden md:table-cell">Liquidate</th>
      <th className="hidden md:table-cell">Deposit Ratio</th>
      <th>Address</th>
    </tr>
  );
}
