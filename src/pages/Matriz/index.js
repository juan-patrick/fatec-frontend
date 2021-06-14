import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import api from "../../services/api";
import TableMatriz from "../../components/TableMatriz";

function Matriz() {
  const [matriz, setMatriz] = useState([]);
  const getMatriz = async () => {
    await api
      .get("/matriz")
      .then(({ data }) => {
        setMatriz(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getMatriz();
  }, []);

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Matriz
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/disciplina">
              <Button size="large" color="primary" variant="contained">
                Matriz
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <TableMatriz data={matriz} setData={getMatriz} />
        </Grid>
      </Grid>
    </Page>
  );
}
export default Matriz;
