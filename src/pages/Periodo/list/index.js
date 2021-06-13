import Page from "../../../components/Page";
import TablePeriodo from "../../../components/TablePeriodo"
import api from "../../../services/api";
import { useEffect, useState } from "react";
import { Grid, Button, Typography, Link } from "@material-ui/core";

const Periodo = () => {
  const [periodo, setPeriodo ] = useState([]);

  const getPeriodo = async () => {
    await api
      .get("/periodo")
      .then(({ data }) => {
        setPeriodo(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPeriodo();
  }, []);

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Periodos
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/periodo">
              <Button size="large" color="primary" variant="contained">
                Adicionar Periodo
              </Button>
            </Link>
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <TablePeriodo data={periodo} setData={getPeriodo} />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}

export default Periodo;
