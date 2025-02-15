import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import { useUserStore } from "./store/useUserStore";
import logo from "./assets/logo-red.svg";

function Home() {
  const { user } = useUserStore();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={15}
      marginX={"auto"}
      paddingX={6}
    >
      <img src={logo} alt="Logo" style={{ height: 150 }} className="mb-10" />
      <Typography variant="h4" gutterBottom>
        Benvenuto, {user?.username}!
      </Typography>
      <Grid2 container spacing={2} justifyContent="center">
        <Grid2>
          <Paper
            elevation={3}
            sx={{ padding: 4, textAlign: "center", minWidth: 250 }}
          >
            <LocalPizzaIcon sx={{ fontSize: 60, color: "#FF9800" }} />
            <Typography variant="h6" mt={2}>
              I tuoi punti:
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {user?.points}
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
      <Typography
        variant="h5"
        color="primary"
        fontWeight={500}
        textAlign={"center"}
        marginTop={5}
      >
        Ogni 10 pizze in Omaggio 1 Pizza + 1 Chips!
      </Typography>
    </Box>
  );
}

export default Home;
