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
  totalItemsCount
}) {
  const firstPage = calculateFirstPage({
    batchNumber,
    itemsCountPerPage
  });
  // On the last batch, we only show available pages:
  if (batchNumber === totalBatches) {
    const remainder = totalItemsCount % itemsCountPerPage;
    return (firstPage - 1) + remainder;
  }
  return (firstPage - 1) + itemsCountPerPage;
}

export function calculateTotalBatches(
  totalItemsCount,
  itemsCountPerPage
) {
  return Math.ceil(totalItemsCount / itemsCountPerPage);
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
  const totalBatches = calculateTotalBatches(totalItemsCount, itemsCountPerPage);
  // Calculate first + last pages:
  const firstPage = calculateFirstPage({
    batchNumber: currentBatch,
    itemsCountPerPage,
  });
  const lastPage = calculateLastPage({
    batchNumber: currentBatch,
    itemsCountPerPage,
    totalBatches,
    totalItemsCount
  });
  // Calculate next + previous pages:
  const hasPreviousPage = currentBatch > 1;
  const previousPage = hasPreviousPage && firstPage - 1;
  const hasNextPage = currentBatch < totalBatches;
  const nextPage = hasNextPage && lastPage + 1;
  return {
    lastPage,
    firstPage,
    hasPreviousPage,
    hasNextPage,
    nextPage,
    previousPage
  };
}
