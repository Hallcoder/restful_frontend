// src/components/PaginatedTable.js
import React from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

const PaginatedTable = ({ columns, data }) => {
  const globalFilterByName = (rows, columnIds, filterValue) => {
    return rows.filter(row => {
      const name = row.original.name; // Adjust this to the column you want to filter by
      return name.toLowerCase().includes(filterValue.toLowerCase());
    });
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', use page,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    gotoPage
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, 
      globalFilter:globalFilterByName// Change this based on your need
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="container mx-auto p-9 w-9/12 m-4">
      <div className="mb-4 flex items-center justify-between">
        <input
          className="p-2 border border-gray-300 rounded"
          value={globalFilter || ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search by name..."
        />
      </div>
      <table {...getTableProps()} className="min-w-full divide-y divide-x divide-gray-400">
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination mt-4 flex items-center justify-between">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="p-2 bg-blue-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="p-2 bg-blue-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
        <div className="ml-4">
          <input
            type="number"
            min="1"
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="p-2 border border-gray-300 rounded w-16 text-center"
          />
        </div>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          className="ml-4 p-2 border border-gray-300 rounded"
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginatedTable;
