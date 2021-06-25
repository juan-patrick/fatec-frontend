import Page from "../../components/Page";
import TableCurso from "../../components/TableCurso";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { Grid, Button, Typography, Link } from "@material-ui/core";

function Curso() {
  const [curso, setCurso] = useState([]);

  const getCurso = async () => {
    await api
      .get("/curso")
      .then(({ data }) => {
        setCurso(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCurso();
  }, []);

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Curso
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/curso">
              <Button size="large" color="primary" variant="contained">
                Adicionar Curso
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <TableCurso data={curso} setData={getCurso} />
        </Grid>
      </Grid>
    </Page>
  );
}

export default Curso;
