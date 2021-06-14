import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import api from "../../services/api";
import TableDisciplina from "../../components/TableDisciplina";

function Disciplina() {
  const [disciplina, setDisciplina] = useState([]);
  const getDisciplina = async () => {
    await api
      .get("/disciplina")
      .then(({ data }) => {
        setDisciplina(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getDisciplina();
  }, []);

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Disciplinas
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/disciplina">
              <Button size="large" color="primary" variant="contained">
                Adicionar Disciplina
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <TableDisciplina data={disciplina} setData={getDisciplina} />
        </Grid>
      </Grid>
    </Page>
  );
}
export default Disciplina;
