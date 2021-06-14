import Page from "../../components/Page";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { Grid, Button, Typography, Link } from "@material-ui/core";

import TableCertificado from "../../components/TableCertificado";

function Certificado() {
  const [certificado, setCertificado] = useState([]);

  const getCertificado = async () => {
    await api
      .get("/certificado")
      .then(({ data }) => {
        setCertificado(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCertificado();
  }, []);

  return (
    <Page>
      <Grid container>
        <Grid item container spacing={5} sm={12} justify="space-between">
          <Grid item sm={10} md={6} lg={6} xs={10}>
            <Typography variant="h5" gutterBottom fullWidth>
              Lista de Certificado
            </Typography>
          </Grid>
          <Grid item sm={2} md={6} lg={6} xs={2}>
            <Link href="/create/certificado">
              <Button size="large" color="primary" variant="contained">
                Adicionar Certificado
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <TableCertificado data={certificado} setData={getCertificado} />
        </Grid>
      </Grid>
    </Page>
  );
}

export default Certificado;
