import Page from "../../../components/Page";
import TableSemana from "../../../components/TableSemana"
import api from "../../../services/api";
import { useEffect, useState } from "react";
import { Grid, Button, Typography, Link } from "@material-ui/core";

const Semana = () => {
  const [semana, setSemana] = useState([]);

  const getSemana = async () => {
    await api
      .get("/semana")
      .then(({ data }) => {
        setSemana(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSemana();
  }, []);

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Semanas
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/semana">
              <Button size="large" color="primary" variant="contained">
                Adicionar Semana
              </Button>
            </Link>
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <TableSemana data={semana} setData={getSemana} />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}

export default Semana;
