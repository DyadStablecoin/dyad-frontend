import { useEffect, useState } from "react";

export default function CustomPagination({ totalRows, rowsPerPage }) {
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    setNumberOfPages(parseInt(Math.ceil(totalRows / rowsPerPage)));
  }, [totalRows, rowsPerPage]);

  return (
    <div className="flex gap-4">
      {numberOfPages &&
        [...Array(numberOfPages).keys()].map((i) => {
          return <div>{i}</div>;
        })}
    </div>
  );
}
