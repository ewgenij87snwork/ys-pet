const prepareAggregateData = options => {
  const perPage = +options.limit || 10;
  const page = +options.page || 1;
  let sort = options.sort || 'date';
  let order = 1;
  if (options.order?.toLowerCase() !== 'asc') order = -1;
  sort = { [`${sort === 'date' ? 'updatedAt' : sort}`]: order };
  const skip = (page - 1) * perPage;

  return {
    perPage,
    page,
    skip,
    sort,
    limit: +options.limit,
  };
};

module.exports = { prepareAggregateData };
