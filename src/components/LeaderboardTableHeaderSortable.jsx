import {
  CaretDownOutlined,
  CaretUpOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import cn from "classnames";

export default function LeaderboardTableHeaderSortable({
  header,
  sortBy,
  setSortBy,
  extraClasses,
}) {
  return (
    <th className={cn(extraClasses ? extraClasses : "")}>
      <div className={"flex items-center justify-center gap-1"}>
        <div>{header}</div>
        <SwapOutlined
          rotate={90}
          onClick={() =>
            setSortBy({
              name: header,
              asc: { ...sortBy.asc, [header]: !sortBy.asc[header] },
            })
          }
        />
        {sortBy.name === header && (
          <div className="flex flex-col">
            {!sortBy.asc[header] ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </div>
        )}
      </div>
    </th>
  );
}
