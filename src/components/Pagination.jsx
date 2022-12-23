import { useEffect, useState } from "react";
import { getIndices } from "../utils/paginationUtils";

export default function CustomPagination({ totalRows, rowsPerPage, setRange }) {
  const [numberOfPages, setNumberOfPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setNumberOfPages(parseInt(Math.ceil(totalRows / rowsPerPage)));
  }, [totalRows, rowsPerPage]);

  function renderPage(i) {
    return (
      <div
        className={`${
          i !== "..." &&
          "border-[1px] border-white pl-1 pr-1 hover:cursor-pointer"
        }`}
        style={{ color: currentPage === i ? "white" : "gray" }}
        onClick={() => {
          if (i !== "...") {
            setRange({
              start: (i - 1) * rowsPerPage,
              end: i * rowsPerPage - 1,
            });
            setCurrentPage(i);
          }
        }}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {numberOfPages &&
        getIndices(numberOfPages, currentPage).map((i) => {
          return renderPage(i);
        })}
    </div>
  );
}
