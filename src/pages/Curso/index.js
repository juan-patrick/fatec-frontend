import Page from "../../components/Page";
import TableCursoExtensao from "../../components/TableCurso";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { Grid, Button, Typography, Link } from "@material-ui/core";
import TableCurso from "../../components/TableCurso";

function Curso() {
  const [cursos, setCursos] = useState([]);

  const getCursos = async () => {
    await api
      .get("/cursos")
      .then(({ data }) => {
        setCursos(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCursos();
  }, []);

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Cursos
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/cursos">
              <Button size="large" color="primary" variant="contained">
                Adicionar Curso
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <TableCurso data={cursos} setData={getCursos} />
        </Grid>
      </Grid>
    </Page>
  );
}

export default Curso;
