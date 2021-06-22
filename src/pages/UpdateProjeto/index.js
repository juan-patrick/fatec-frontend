import Page from "../../components/Page";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Divider,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardActions,
  Button,
  CircularProgress,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

export default function UpdateProjeto() {
  const { projetoId } = useParams();

  const [projeto, setProjeto] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getProjeto = async () => {
    await api
      .get(`/projeto/${projetoId}`)
      .then(({ data }) => {
        setProjeto(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });
  };

  useEffect(() => {
    getProjeto();
  },[]);

  const ProjetoSchema = Yup.object().shape({
    nomeProjetos: Yup.string()
      .min(1, "Nome muito pequeno.")
      .max(255, "Nome muito grande")
      .required(),
    descricaoProjetos: Yup.string()
      .max(255, "Descrição muito grande")
      .required(),
    cargaHoraria: Yup.number().required(),
    situacaoProjetos: Yup.bool().required(),
    dataInicial: Yup.date().required(),
    dataFim: Yup.date().required(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .put(`/projeto/${projetoId}`, values)
      .then(({ data }) => {
        history.push("/projeto");
      })
      .catch((error) => {
        resetForm();
        console.log(error);
      });
  };

  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item container spacing={2}>
          <Grid item md={8} xs={12}>
            <Typography variant="h5" gutterBottom>
              Alteração de Projetos
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Alteração de Projetos
                  </Typography>
                }
              />
              <Divider />
              {loading ? (
                <Grid
                  container
                  item
                  md={12}
                  xs={12}
                  justify="center"
                  alignItems="center"
                  style={{ minHeight: 300 }}
                >
                  <CircularProgress />
                </Grid>
              ) : (
                <Formik
                  initialValues={{
                    nomeProjetos: projeto.nomeProjetos,
                    descricaoProjetos: projeto.descricaoProjetos,
                    dataInicial: projeto.dataInicial,
                    dataFim: projeto.dataFim,
                    cargaHoraria: projeto.cargaHoraria,
                    situacaoProjetos: projeto.situacaoProjetos,
                  }}
                  validationSchema={ProjetoSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values, resetForm);
                  }}
                >
                  {({ handleChange, values, errors }) => (
                    <Form>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="nomeProjetos"
                              name="nomeProjetos"
                              label="Nome do Projeto"
                              variant="outlined"
                              required
                              value={values.nomeProjetos}
                              onChange={handleChange}
                              error={errors.nomeProjetos ? true : false}
                              helperText={errors.nomeProjetos}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="descricaoProjetos"
                              label="Descrição do Projeto"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              value={values.descricaoProjetos}
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="cargaHoraria"
                              name="cargaHoraria"
                              label="Carga Horaria"
                              variant="outlined"
                              required
                              onChange={handleChange}
                              value={values.cargaHoraria}
                              fullWidth
                              type="number"
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="dataInicial"
                              label="Data Inicial"
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={handleChange}
                              value={values.dataInicial}
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="dataFim"
                              label="Data Final"
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={handleChange}
                              value={values.dataFim}
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">
                                situacaoProjetos
                              </FormLabel>
                              <RadioGroup
                                name="situacaoProjetos"
                                value={values.situacaoProjetos}
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  value="true"
                                  control={<Radio />}
                                  label="Ativo"
                                />
                                <FormControlLabel
                                  value="false"
                                  control={<Radio />}
                                  label="Inativo"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider />
                      <CardActions>
                        <Grid container item md={12} xs={12} justify="flex-end">
                          <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            type="submit"
                          >
                            Alterar Projeto
                          </Button>
                        </Grid>
                      </CardActions>
                    </Form>
                  )}
                </Formik>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
