export const handleRequestSort = (property, orderBy, order, setOrder, setOrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
};

export const handleChangePage = (newPage, setPage) => {
    setPage(newPage);
};

export const handleChangeRowsPerPage = (event, setRowsPerPage, setPage) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

export const handleChangeSearch = (e, field, searchVal, setSearchVal) => {

  if (e.target.value === '') {
    // remove field from object
    const {[field]: remove, ...rest} = searchVal;
    setSearchVal(rest);
  }
  else {
    setSearchVal({...searchVal, [field]: e.target.value});
  } 

};

export const handleClearSearch = (v, searchVal, setSearchVal) => {
    setSearchVal({...searchVal, [v]: ''});
};

export const handleClearEntireSearch = (v, setSearchVal) => {
    setSearchVal({});
};