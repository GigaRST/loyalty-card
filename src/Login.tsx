import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useLogin from "./api/useLogin";
import { Link } from "react-router-dom";
import logo from "./assets/logo-red.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = useLogin();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="h-[100vh] flex flex-col items-center pt-20 gap-y-20">
      <img src={logo} alt="Logo" style={{ height: 150 }} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
              Accedi
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Non hai un account? <Link to="/register">Registrati</Link>
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
