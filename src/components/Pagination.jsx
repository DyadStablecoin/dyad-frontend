import { useEffect, useState } from "react";

export default function CustomPagination({ totalRows, rowsPerPage, setIndex }) {
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    setNumberOfPages(parseInt(Math.ceil(totalRows / rowsPerPage)));
  }, [totalRows, rowsPerPage]);

  function renderPage(i) {
    return (
      <div
        onClick={() => {
          setIndex([i * rowsPerPage, (i + 1) * rowsPerPage]);
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
