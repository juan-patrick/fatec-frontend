import Page from '../../components/Page';
import TableInatividade from '../../components/TableInatividade';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Grid, Button, Typography, Link } from '@material-ui/core';

function Inatividade() {
  const [inatividades, setInatividades] = useState([]);

  const getInatividades = async () => {
    await api.get('/inatividades').then(({ data }) => {
      setInatividades(data);
      console.log(data);
    }).catch((error) => console.log(error));
  };


  useEffect(() => {
    getInatividades();
  }, [])

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Inatividades
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/inatividades">
              <Button size="large" color="primary" variant="contained">
                Adicionar Inatividade
            </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <TableInatividade data={inatividades} setData={getInatividades} />
        </Grid>
      </Grid>
    </Page>
  );
}

export default Inatividade;