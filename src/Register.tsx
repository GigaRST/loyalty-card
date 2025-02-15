import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useRegister from "./api/useRegister";
import { Link } from "react-router-dom";
import logo from "./assets/logo-red.svg";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { mutate } = useRegister();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ email, password, username });
  };

  return (
    <div className="h-[100vh] flex flex-col items-center pt-20 gap-y-20">
      <img src={logo} alt="Logo" style={{ height: 150 }} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Registrati
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome Utente"
              fullWidth
              margin="normal"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Registrati
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Hai già un account? <Link to="/login">Accedi</Link>
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default Register;
