import * as React from "react";
import Button from "@mui/material/Button";
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
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import AddUserFba from "../../components/AddUserFba";
import { useSnackbar } from "notistack";

import { AdminAgent } from "../../agent";

const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "email", label: "Email", minWidth: 70 },
  { id: "first_name", label: "First Name", minWidth: 70 },
  { id: "last_name", label: "Last Name", minWidth: 70 },
  {
    id: "role",
    label: "Role",
    minWidth: 50,
    format: (value) => (value === "US" ? "User" : "Admin"),
  },
];

const VerifiedUsers = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUnverify = async (userID) => {
    setLoading(true);
    try {
      await AdminAgent.unverifyUser({
        user_id: userID,
      });
      const res = await AdminAgent.getVerifiedUsers();
      refreshUsers();
    } catch (e) {
      enqueueSnackbar("Failed to un-verify user");
    }
    setLoading(false);
  };

  const refreshUsers = async () => {
    setLoading(true);
    try {
      const res = await AdminAgent.getVerifiedUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (e) {
      enqueueSnackbar("Error fetching users");
    }
    setLoading(false);
  };

  React.useEffect(async () => {
    refreshUsers();
  }, []);

  React.useEffect(() => {
    let result = [];
    if (search.length) {
      for (let i=0; i<users.length; i++) {
        let user = users[i];
        user.name = user.first_name + " " + user.last_name;
        if (user.email.toLowerCase().includes(search.toLowerCase()) 
        || user.name.toLowerCase().includes(search.toLowerCase()) ) {
          result.push(user);
        }
      }
    } else {
      result = users;
    }
    setFilteredUsers(result);
  }, [search]);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h3" sx={{ fontWeight: 500, marginBottom: "20px" }}>
        Verified Users
      </Typography>
      {!loading ? (
        <>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Search"
            variant="outlined"
            style={{ width: 400, marginBottom: 10 }}
            onChange={(e) => setSearch(e.target.value)}
          />
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
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={user.code}
                          >
                            {columns.map((column) => {
                              const value = user[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                            <TableCell>
                              <Button onClick={() => handleUnverify(user.id)}>
                                Un-verify User
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          </Paper>
        </>
      ) : (
        <CircularProgress />
      )}
      <AddUserFba refreshUsers={refreshUsers} />
    </div>
  );
};

export default VerifiedUsers;
