import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#933043",
        color: "white",
        textAlign: "center",
        py: 2,
        width: "100%",
      }}
    >
      <Typography variant="h6">Ristorante Terzo Gusto</Typography>
      <Typography variant="body2">
        Via Appia Nuova, 1055 - 00178 Roma
      </Typography>
      <Typography variant="body2">Telefono: 06 7185865</Typography>
      <Typography variant="body2">Email: info@terzogusto.com</Typography>
    </Box>
  );
};

export default Footer;
