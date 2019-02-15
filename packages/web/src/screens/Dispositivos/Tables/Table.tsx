import React, { Component } from "react";

import { withStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import PaginationWrapped from "./Pagination";

import {
    tableCellStyle,
    tableRowStyle
} from "../../../utils/styles/Table/Table";

// const styles = (theme: Theme) => ({
//     root: {
//         width: "100%",
//         marginTop: theme.spacing.unit * 3
//     },
//     table: {
//         minWidth: 500
//     },
//     tableWrapper: {
//         overflowX: "auto"
//     }
// });

interface DispositivoProps {
    classes?: any;
    theme?: Theme;
    style?: React.CSSProperties;
}

let counter = 0;

const createData = (name: string, calories: number, fat: number) => {
    counter += 1;
    return { id: counter, name, calories, fat };
};

class DispositivoTable extends Component<DispositivoProps, {}> {
    state = {
        rows: [
            createData("Cupcake", 305, 3.7),
            createData("Donut", 452, 25.0),
            createData("Eclair", 262, 16.0),
            createData("Frozen yoghurt", 159, 6.0),
            createData("Gingerbread", 356, 16.0),
            createData("Honeycomb", 408, 3.2),
            createData("Ice cream sandwich", 237, 9.0),
            createData("Jelly Bean", 375, 0.0),
            createData("KitKat", 518, 26.0),
            createData("Lollipop", 392, 0.2),
            createData("Marshmallow", 318, 0),
            createData("Nougat", 360, 19.0),
            createData("Oreo", 437, 18.0)
        ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 10
    };

    handleChangePage = (event: any, page: any) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event: any) => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <Paper
                style={{
                    width: "100%",
                    height: "100%",
                    gridRow: "2 / 3",
                    boxShadow: "0",
                    borderRadius: "0"
                }}
            >
                <div>
                    <Table>
                        <TableBody>
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell
                                            style={{
                                                textAlign: "start",
                                                fontSize: "0.9rem",
                                                fontWeight: 500,
                                                color: "black"
                                            }}
                                            component="th"
                                            scope="row"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "start",
                                                fontFamily: "Montserrat",
                                                fontSize: "0.9rem",
                                                color: "#999999"
                                            }}
                                            align="right"
                                        >
                                            {row.calories}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                textAlign: "start",
                                                fontFamily: "Montserrat",
                                                fontSize: "0.9rem",
                                                color: "#999999"
                                            }}
                                            align="right"
                                        >
                                            {row.fat}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        native: true
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={
                                        this.handleChangeRowsPerPage
                                    }
                                    ActionsComponent={PaginationWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

// export default withStyles(styles)(DispositivoTable);
export default DispositivoTable;
