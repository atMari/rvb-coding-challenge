import {
        defaultPaginationPage,
        defaultPaginationPageRange,
        defaultPaginationCountPerPage
      } from '../config/properties';

export function calculateBatchNumber(
  activePage,
  pageRangeDisplayed
) {
 return Math.ceil(activePage / pageRangeDisplayed);
}

export function calculateFirstPage({
  batchNumber,
  itemsCountPerPage,
}) {
  return ((batchNumber - 1) * itemsCountPerPage) + 1;
}

export function calculateLastPage({
  batchNumber,
  itemsCountPerPage,
  totalBatches,
  totalItemsCount,
  pagesPerBatch
}) {
  const firstPage = calculateFirstPage({
    batchNumber,
    itemsCountPerPage
  });
  // On the last batch, we only show available pages:
  if (batchNumber === totalBatches) {
    return Math.ceil(totalItemsCount / itemsCountPerPage);
  }
  return (firstPage - 1) + pagesPerBatch;
}

export function calculateTotalBatches(
  totalItemsCount,
  itemsCountPerPage,
  pagesPerBatch
) {
  return Math.ceil(totalItemsCount / itemsCountPerPage / pagesPerBatch);
}

export function paginate({
  itemsCountPerPage = defaultPaginationCountPerPage,
  pageRangeDisplayed = defaultPaginationPageRange,
  totalItemsCount,
  activePage = defaultPaginationPage
}) {
  if (!totalItemsCount || totalItemsCount < itemsCountPerPage) {
    return {
      lastPage: 1,
      firstPage: 1,
      hasPreviousPage: false,
      hasNextPage: false,
      nextPage: null,
      previousPage: null
    };
  }
  // Calculate batch logic:
  const currentBatch = calculateBatchNumber(activePage, pageRangeDisplayed);
  const totalBatches = calculateTotalBatches(
    totalItemsCount,
    itemsCountPerPage,
    pageRangeDisplayed
  );
  // Calculate first + last pages:
  const firstPage = calculateFirstPage({
    batchNumber: currentBatch,
    itemsCountPerPage,
  });
  const lastPage = calculateLastPage({
    batchNumber: currentBatch,
    itemsCountPerPage,
    totalBatches,
    totalItemsCount,
    pagesPerBatch: pageRangeDisplayed
  });
  // Calculate next + previous pages:
  const hasPreviousPage = currentBatch > 1 || activePage > 1;
  const previousPage = hasPreviousPage ? activePage - 1 : null;
  const hasNextPage = !(currentBatch === totalBatches && activePage === lastPage);
  const nextPage = hasNextPage ? activePage + 1 : null;
  return {
    lastPage,
    firstPage,
    hasPreviousPage,
    hasNextPage,
    nextPage,
    previousPage
  };
}
