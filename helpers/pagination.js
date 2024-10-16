module.exports = (objectPagination, query, totalProducts) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;

  const totalpage = Math.ceil(totalProducts / objectPagination.limitItems);
  objectPagination.totalPage = totalpage;

  return objectPagination;
};
