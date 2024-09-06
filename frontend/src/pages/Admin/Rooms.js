import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import AddRoomFba from "../../components/AddRoomFba";

import { useSnackbar } from "notistack";

import { AdminAgent } from "../../agent";

const columns = [
  { id: "id", label: "Room ID", minWidth: 20 },
  { id: "block", label: "Block", minWidth: 70 },
  { id: "room_no", label: "Room Number", minWidth: 70 },
];

const Rooms = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rooms, setRooms] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

	const refreshRooms = async () => {
		setLoading(true);
    try {
      const res = await AdminAgent.getRooms();
      setRooms(res.data);
    } catch (e) {
      enqueueSnackbar("Error fetching rooms");
    }
    setLoading(false);
	};
  
  React.useEffect(async () => {
    refreshRooms();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h3" sx={{ fontWeight: 500, marginBottom: "20px" }}>
        Rooms
      </Typography>
      {!loading ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((room) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={room.code}
                        >
                          {columns.map((column) => {
                            const value = room[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rooms.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        </Paper>
      ) : (
        <CircularProgress />
      )}
      <AddRoomFba refreshRooms = {refreshRooms} />
    </div>
  );
};

export default Rooms;
