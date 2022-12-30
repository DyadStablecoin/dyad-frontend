import Pagination from "./Pagination";
import Dropdown from "./Dropdown";

export default function LeaderboardTableFooter({
  rowsPerPage,
  setRowsPerPage,
  setRange,
  count,
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="w-[8rem]">
        <Dropdown
          options={[10, 20, 50]}
          onChange={(v) => {
            setRowsPerPage(v);
            setRange({ start: 0, end: v - 1 });
          }}
        />
      </div>
      <div className="mb-4 mt-8 flex justify-center">
        <Pagination
          totalRows={count}
          rowsPerPage={rowsPerPage}
          setRange={setRange}
        />
      </div>
    </div>
  );
}
