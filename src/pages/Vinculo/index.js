import Page from '../../components/Page';
import TableVinculo from '../../components/TableVinculo';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Grid, Button, Typography, Link } from '@material-ui/core';

function Vinculo() {
  const [vinculos, setVinculos] = useState([]);

  const getVinculos = async () => {
    await api.get('/vinculos').then(({ data }) => {
      setVinculos(data);
      console.log(data);
    }).catch((error) => console.log(error));
  };


  useEffect(() => {
    getVinculos();
  }, [])

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Vinculos
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/vinculos">
              <Button size="large" color="primary" variant="contained">
                Adicionar Vinculo
            </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <TableVinculo data={vinculos} setData={getVinculos} />
        </Grid>
      </Grid>
    </Page>
  );
}

export default Vinculo;