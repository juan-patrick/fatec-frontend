import Page from '../../components/Page';

import { Formik, Form } from 'formik';

import { useHistory } from 'react-router-dom';

import { Card, CardHeader, CardContent, Grid, Typography, Divider, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CardActions, Button, CircularProgress } from '@material-ui/core';

import * as Yup from 'yup';

import api from '../../services/api';

import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function UpdateProfessor() {

  const { professorId } = useParams();

  const [professor, setProfessor] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getProfessor = async () => {
    await api.get(`/professores/${professorId}`).then(({ data }) => {
      setProfessor(data);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      history.goBack();
    });
  }

  useEffect(() => {
    getProfessor();
  }, [])


  const ProfessorSchema = Yup.object().shape({
    nome_professor: Yup.string().min(3, 'Nome muito pequeno.').max(45, 'Nome é muito grande').required(),
    email_professor: Yup.string().max(45).required(),
    status: Yup.bool(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api.put(`/professores/${professorId}`, values).then(({ data }) => {
      history.push('/professor');
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
            <Typography variant="h5" gutterBottom>Alteração de Professores</Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader title={<Typography variant="h6">Formulário de Alteração de Professores</Typography>} />
              <Divider />
              {loading ?
                <Grid container item md={12} xs={12} justify="center" alignItems="center" style={{ minHeight: 300 }}>
                  <CircularProgress />
                </Grid> : <Formik initialValues={{ nome_professor: professor.nome_professor, email_professor: professor.email_professor }} validationSchema={ProfessorSchema} onSubmit={(values, { resetForm }) => {
                  handleSubmit(values, resetForm);
                }}>
                  {({ handleChange, values, errors }) => (
                    <Form>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item md={12} xs={12}>
                            <TextField id="nome_professor" name="nome_professor" label="Nome do Professor" variant="outlined" required value={values.nome_professor} onChange={handleChange} fullWidth error={errors.nome_professor ? true : false} helperText={errors.nome_professor} />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField id="email_professor" name="email_professor" label="Email do Professor" variant="outlined" required value={values.email_professor} onChange={handleChange} fullWidth />
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
                            Alterar Professor
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