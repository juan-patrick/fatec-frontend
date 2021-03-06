import Page from '../../components/Page';

import { Formik, Form } from 'formik';

import { useHistory } from 'react-router-dom';

import { Card, CardHeader, CardContent, Grid, Typography, Divider, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CardActions, Button, CircularProgress } from '@material-ui/core';

import * as Yup from 'yup';

import api from '../../services/api';

import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function UpdateVinculo() {

  const { vinculoId } = useParams();

  const [vinculo, setVinculo] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getVinculo = async () => {
    await api.get(`/vinculos/${vinculoId}`).then(({ data }) => {
      setVinculo(data);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      history.goBack();
    });
  }

  useEffect(() => {
    getVinculo();
  }, [])


  const VinculoSchema = Yup.object().shape({
    tipoVinculo: Yup.string().min(3, "Nome muito pequeno.").max(45, "Nome é muito grande").required(),
    status: Yup.bool(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api.put(`/vinculos/${vinculoId}`, values).then(({ data }) => {
      history.push('/vinculo');
    }).catch(error => {
      resetForm();
      console.log(error);
    });
  }

  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item container spacing={2}>
          <Grid item md={8} xs={12}>
            <Typography variant="h5" gutterBottom>Alteração de Vinculos</Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader title={<Typography variant="h6">Formulário de Alteração de Vinculos</Typography>} />
              <Divider />
              {loading ?
                <Grid container item md={12} xs={12} justify="center" alignItems="center" style={{ minHeight: 300 }}>
                  <CircularProgress />
                </Grid> : <Formik initialValues={{ tipoVinculo: vinculo.tipoVinculo }} validationSchema={VinculoSchema} onSubmit={(values, { resetForm }) => {
                  handleSubmit(values, resetForm);
                }}>
                  {({ handleChange, values, errors }) => (
                    <Form>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item md={12} xs={12}>
                            <TextField id="tipoVinculo" name="tipoVinculo" label="Tipo do Vinculo" variant="outlined" required value={values.tipoVinculo} onChange={handleChange} fullWidth error={errors.tipoVinculo ? true : false} helperText={errors.tipoVinculo} />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">Status</FormLabel>
                              <RadioGroup name="status" value={values.status} onChange={handleChange}>
                                <FormControlLabel value={true} control={<Radio />} label="Ativo" checked={values.status} />
                                <FormControlLabel value={false} control={<Radio />} label="Inativo" checked={!values.status} />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider />
                      <CardActions>
                        <Grid container item md={12} xs={12} justify="flex-end">
                          <Button size="large" color="primary" variant="contained" type="submit">
                            Alterar Vinculo
                        </Button>
                        </Grid>
                      </CardActions>
                    </Form>
                  )}
                </Formik>
              }
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
};