import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import CellTransform from '../CellTransform/CellTransform';

const styles = theme => ({
  paper: {
    width: '100%',
    marginBottom: '5px',
  },
  table: {
    whiteSpace: 'nowrap',
    minWidth: 750,
  },
  tableRow: {
    height: '30px',
  },
  tableCell: {
    padding: '0px 0px 0px 10px',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class AppTable extends React.Component {
  handleSortChange(column) {
    if (this.props.onSortChange && column.is_sortable) {
      var sortOrder = 'asc';
      if (column.name == this.props.sortBy) {
        sortOrder = this.props.sortOrder == 'asc' ? 'desc' : 'asc';
      }
      this.props.onSortChange(column.name, sortOrder);
    }
  }

  handleClick(event, name) {}

  handleChangePage(event, newPage) {
    if (this.props.onPageChange) {
      this.props.onPageChange(newPage);
    }
  }

  handleChangeRowsPerPage(event) {
    if (this.props.onRowsPerPageChange) {
      this.props.onRowsPerPageChange(event.target.value);
    }
  }

  render() {
    const { classes, page, pageSize, totalCount, columns, rows, sortBy, sortOrder, columnHelpers, pageSizes } = this.props;
    const emptyRows = Math.min(pageSize, pageSize - rows.length);

    return (
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size={'small'}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                {columns.map(column => (
                  <TableCell
                    className={classes.tableCell}
                    key={column.name}
                    align={column.numeric ? 'right' : 'left'}
                    sortDirection={sortBy === column.name ? sortOrder : false}
                  >
                    <TableSortLabel active={sortBy === column.name} direction={sortOrder} onClick={e => this.handleSortChange(column)}>
                      {columnHelpers[column.name] ? columnHelpers[column.name].label : column.name}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, row_index) => (
                <TableRow className={classes.tableRow} hover tabIndex={-1} key={row_index}>
                  {columns.map((column, column_index) => (
                    <TableCell className={classes.tableCell} key={row_index + '_' + column_index} align={column.numeric ? 'right' : 'left'}>
                      {columnHelpers[column.name] ? (
                        <CellTransform transform={columnHelpers[column.name].transform} value={row[column.name]} />
                      ) : (
                        row[column.name]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 30 * emptyRows }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={totalCount}
          rowsPerPage={pageSize}
          rowsPerPageOptions={pageSizes}
          page={page}
          onChangePage={(e, p) => this.handleChangePage(e, p)}
          onChangeRowsPerPage={e => this.handleChangeRowsPerPage(e)}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(AppTable);
