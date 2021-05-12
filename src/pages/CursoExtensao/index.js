import Page from '../../components/Page';
import TableCursoExtensao from '../../components/TableCursoExtensao';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Grid, Button, Typography, Link } from '@material-ui/core';

function CursoExtensao() {
  const [cursosExtensao, setCursosExtensao] = useState([]);

  const getCursos = async () => {
    await api.get('/cursoextensao').then(({ data }) => {
      setCursosExtensao(data);
      console.log(data);
    }).catch((error) => console.log(error));
  };


  useEffect(() => {
    getCursos();
  }, [])

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Cursos de Extensão
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
          <TableCursoExtensao data={cursosExtensao} setData={getCursos} />
        </Grid>
      </Grid>
    </Page>
  );
}

export default CursoExtensao;
