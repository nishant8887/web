import React from 'react';
import ReactTable from 'react-table';
import classNames from 'classnames';
import CellTransform from '../CellTransform/CellTransform';

import TablePagination from '@material-ui/core/TablePagination';

import 'react-table/react-table.css';
import './DataTable.scss';

const PaginationComponent = props => {
  return (
    <TablePagination
      style={{ borderTop: '1px solid #CCC' }}
      component="div"
      count={props.totalCount}
      rowsPerPage={props.pageSize}
      rowsPerPageOptions={props.pageSizeOptions}
      page={props.page}
      onChangePage={(e, p) => props.onPageChange(p)}
      onChangeRowsPerPage={e => props.onPageSizeChange(e.target.value)}
    />
  );
};

class DataTable extends React.Component {
  handleSortChange(sorted) {
    if (sorted.length > 0) {
      var sort = sorted[0];
      this.props.onSortChange(sort.id, sort.desc ? 'desc' : 'asc');
    }
  }

  handleChangePage(newPage) {
    if (this.props.onPageChange) {
      this.props.onPageChange(newPage);
    }
  }

  handleChangeRowsPerPage(val) {
    if (this.props.onRowsPerPageChange) {
      this.props.onRowsPerPageChange(val);
    }
  }

  handleCellEvents(type, row, column, val) {
    if (this.props.onCellEvent) {
      this.props.onCellEvent(type, row, column, val);
    }
  }

  handleRowClick = (e, row) => {
    if (this.props.setSelected) {
      this.props.setSelected(row);
    }
  };

  render() {
    const { className, page, loading, pageSize, totalCount, columns, rows, sortBy, sortOrder, columnHelpers, pageSizes, selected_row } = this.props;
    const tableColumns = columns.map(column => {
      var tableColumn = {
        Header: columnHelpers[column.name].label,
        accessor: column.name,
        sortable: column.is_sortable,
        width: columnHelpers[column.name].width,
      };
      if (columnHelpers[column.name].transform) {
        const transform = columnHelpers[column.name].transform;
        tableColumn.Cell = row => (
          <CellTransform
            transform={transform}
            value={row.value}
            row={row.original}
            cellEvent={(type, val) => this.handleCellEvents(type, row.original, column.name, val)}
          />
        );
      }
      return tableColumn;
    });
    const sorted = [{ id: sortBy, desc: sortOrder == 'desc' }];
    const pages = Math.ceil(totalCount.toFixed(2) / pageSize);
    return (
      <ReactTable
        manual
        loading={loading}
        noDataText={'No data'}
        data={rows}
        page={page}
        pages={pages}
        totalCount={totalCount}
        pageSize={pageSize}
        pageSizeOptions={pageSizes}
        columns={tableColumns}
        multiSort={false}
        sorted={sorted}
        onPageChange={val => this.handleChangePage(val)}
        onPageSizeChange={val => this.handleChangeRowsPerPage(val)}
        onSortedChange={val => this.handleSortChange(val)}
        className={classNames('-striped', '-highlight', className)}
        PaginationComponent={PaginationComponent}
        getTrProps={(state, row) => {
          if (row) {
            return {
              onClick: e => this.handleRowClick(e, row.original),
              style: {
                background: selected_row && row.original.id === selected_row.id ? '#3ab763' : '',
                color: selected_row && row.original.id === selected_row.id ? 'white' : row.original.shade_color ? row.original.shade_color : 'black',
              },
            };
          }
          return {};
        }}
      />
    );
  }
}

export default DataTable;
