import { useEffect, useState } from "react";

export default function CustomPagination({
  totalRows,
  rowsPerPage,
  range,
  setRange,
}) {
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    setNumberOfPages(parseInt(Math.ceil(totalRows / rowsPerPage)));
  }, [totalRows, rowsPerPage]);

  function renderPage(i) {
    return (
      <div
        className="border-[1px] border-white pl-1 pr-1 hover:cursor-pointer"
        style={{ color: range.start === i * rowsPerPage ? "white" : "gray" }}
        onClick={() => {
          setRange({ start: i * rowsPerPage, end: (i + 1) * rowsPerPage });
        }}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {numberOfPages &&
        [...Array(numberOfPages).keys()].map((i) => {
          return renderPage(i);
        })}
    </div>
  );
}
