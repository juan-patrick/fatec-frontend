import Page from '../../components/Page';
import TableProfessor from '../../components/TableProfessor';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Grid, Button, Typography, Link } from '@material-ui/core';

function Professor() {
  const [professores, setProfessores] = useState([]);

  const getProfessores = async () => {
    await api.get('/professores').then(({ data }) => {
      setProfessores(data);
      console.log(data);
    }).catch((error) => console.log(error));
  };


  useEffect(() => {
    getProfessores();
  }, [])

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Professores 
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/professores">
              <Button size="large" color="primary" variant="contained">
                Adicionar Professor
            </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <TableProfessor data={professores} setData={getProfessores} />
        </Grid>
      </Grid>
    </Page>
  );
}

export default Professor;