import _ from "lodash";

export function getIndices(numberOfPages, currentPage) {
  // easy case: if no more than `MAX_SIZE` pages simply
  // return a list of indices for all pages
  if (numberOfPages < 20) {
    return _.range(1, numberOfPages + 1);
  }

  // interesting case
  let indices = [];

  if (currentPage > 3) {
    // always show first page
    indices.push(1);
    indices.push("...");
  }
  if (currentPage > 1) {
    // show prev page
    indices.push(currentPage - 1);
  }

  // add current page if it is not the last page
  // the last page is special becauce we always want to show it
  if (currentPage !== numberOfPages) {
    indices.push(currentPage);
  }

  if (currentPage < numberOfPages - 1) {
    // show next page
    indices.push(currentPage + 1);

    if (currentPage < numberOfPages - 1) {
      indices.push("...");
    }
  }

  // always show last page
  indices.push(numberOfPages);

  return indices;
}
