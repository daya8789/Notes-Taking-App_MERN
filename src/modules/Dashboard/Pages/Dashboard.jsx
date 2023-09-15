import { NavBar } from "../../../shared/components/NavBar";
import { Header } from "../../../shared/components/Header";
import { Main } from "../components/Main";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export const Dashboard = () => {
  return (
    <Container fixed>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <NavBar />
        </Grid>
        <Grid item xs={8}>
          <Main />
        </Grid>
      </Grid>
    </Container>
  );
};
