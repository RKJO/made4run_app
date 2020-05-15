import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import {
	warningColor,
	primaryColor,
	dangerColor,
	successColor,
	infoColor,
	roseColor,
	grayColor,
	headerFont,
	defaultFont,
} from "../../assets/jss/main.js";

const useStyles = makeStyles({
	warningTableHeader: {
		color: warningColor,
	},
	primaryTableHeader: {
		color: primaryColor,
	},
	dangerTableHeader: {
		color: dangerColor,
	},
	successTableHeader: {
		color: successColor,
	},
	infoTableHeader: {
		color: infoColor,
	},
	roseTableHeader: {
		color: roseColor,
	},
	grayTableHeader: {
		color: grayColor,
	},
	table: {
		marginBottom: "0",
		width: "100%",
		maxWidth: "100%",
		backgroundColor: "transparent",
		borderSpacing: "0",
		borderCollapse: "collapse",
	},
	tableHeadCell: {
		color: "inherit",
		...headerFont,
		lineHeight: "1.42857143",
		padding: "12px 8px",
		verticalAlign: "middle",
		fontSize: "1rem",
	},
	tableCell: {
		...defaultFont,
		lineHeight: "1.42857143",
		padding: "12px 8px",
		verticalAlign: "middle",
		fontSize: "0.8125rem",
	},
	tableResponsive: {
		width: "100%",
		marginTop: "20px",
		overflowX: "auto",
	},
	tableHeadRow: {
		height: "56px",
		color: "inherit",
		display: "table-row",
		outline: "none",
		verticalAlign: "middle",
	},
	tableBodyRow: {
		height: "48px",
		color: "inherit",
		display: "table-row",
		outline: "none",
		verticalAlign: "middle",
	},
});

const CustomTable = (props) => {
	const classes = useStyles();
	const { tableHead, tableData } = props;

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<>
			{tableData.length ? (
				<div className={classes.tableResponsive}>
					<Table
						className={classes.table}
						stickyHeader
						aria-label='sticky table'
					>
						<TableHead className={classes.dangerTableHeader}>
							<TableRow className={classes.tableHeadRow}>
								{tableHead.map((column, columnKey) => (
									<TableCell
										key={columnKey}
										align={column.align}
										className={classes.tableHeadCell}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{tableData
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, rowIndex) => {
									return (
										<TableRow
											hover
											key={rowIndex}
											className={classes.tableBodyRow}
										>
											{tableHead.map((column) => {
												const value = row[column.id];
												return (
													<TableCell
														key={column.id}
														align={column.align}
														className={
															classes.tableCell
														}
													>
														{column.format &&
														typeof value ===
															"number"
															? column.format(
																	value
															  )
															: value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={tableData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</div>
			) : (
				<h3>Brak wyników wyszukiwania</h3>
			)}
		</>
	);
};

export { CustomTable };
