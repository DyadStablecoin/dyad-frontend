import Pagination from "./Pagination";
import Dropdown from "./Dropdown";

export default function LeaderboardTableFooter({
  rowsPerPage,
  setRowsPerPage,
  setRange,
  count,
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[8rem]">
        <Dropdown
          options={[10, 20, 50]}
          defaultValue={10}
          onChange={(v) => {
            setRowsPerPage(v);
            setRange({ start: 0, end: v - 1 });
          }}
        />
      </div>
      <div className="flex justify-center mt-8 mb-4">
        <Pagination
          totalRows={count}
          rowsPerPage={rowsPerPage}
          setRange={setRange}
        />
      </div>
    </div>
  );
}
