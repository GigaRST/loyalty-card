import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFetchUsers } from "./api/useFetchUsers";
import { useUpdatePoints } from "./api/useUpdatePoints";
import logo from "./assets/logo-red.svg";

const AdminDashboard: React.FC = () => {
  const { data: users = [], isLoading } = useFetchUsers();
  const { mutate: updatePoints, isPending } = useUpdatePoints();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    username: string;
    points: number;
  } | null>(null);
  const [pointChange, setPointChange] = useState(0);

  const handleOpen = (user: {
    id: string;
    username: string;
    points: number;
  }) => {
    setSelectedUser(user);
    setPointChange(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleConfirm = () => {
    if (selectedUser) {
      updatePoints({
        id: selectedUser.id,
        amount: selectedUser.points + pointChange,
      });
    }
    handleClose();
  };

  if (isLoading) {
    return <Typography align="center">Caricamento utenti...</Typography>;
  }

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      px={2}
      marginTop={15}
      gap={10}
    >
      <img src={logo} alt="Logo" style={{ height: 150 }} />
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Lista Clienti
        </Typography>
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Punti</TableCell>
                <TableCell>Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username || "Sconosciuto"}</TableCell>
                  <TableCell>{user.points ?? 0}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleOpen(user)}
                    >
                      Modifica
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog per la conferma */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifica punti</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seleziona quanti punti vuoi aggiungere o rimuovere per{" "}
            {selectedUser?.username}.
          </DialogContentText>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <IconButton
              onClick={() => setPointChange(pointChange - 1)}
              disabled={isPending}
            >
              <Remove />
            </IconButton>
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              value={pointChange}
              onChange={(e) => setPointChange(Number(e.target.value))}
              disabled={isPending}
              sx={{ width: 80, textAlign: "center" }}
            />
            <IconButton
              onClick={() => setPointChange(pointChange + 1)}
              disabled={isPending}
            >
              <Add />
            </IconButton>
          </Box>
        </DialogContent>
        <div className="flex items-center justify-center pb-4 gap-x-2">
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            disabled={isPending}
            className="w-full max-w-40"
          >
            Annulla
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="success"
            autoFocus
            disabled={isPending}
            className="w-full max-w-40"
          >
            {isPending ? <CircularProgress size={24} /> : "Conferma"}
          </Button>
        </div>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
