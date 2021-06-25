import React from "react";
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
  CardActions,
  Button,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";
import { getCEP } from "../../services/brasilAPI";

export default function CreateDisciplina() {
  const handleGetCep = (cep) => getCEP(cep)
  const history = useHistory();
  const DisciplinaSchema = Yup.object().shape({
    nomeDisciplina: Yup.string()
      .min(1, "Nome muito pequeno.")
      .max(255, "Nome muito grande")
      .required(),
    descricaoDisciplina: Yup.string()
      .max(255, "Descrição muito grande")
      .required(),
    cargaHoraria: Yup.string().required(),
    objetivoDisciplina: Yup.string().required(),
    ementaDisciplina: Yup.string().required(),
    refenciaBasicaDisciplina: Yup.string().required(),
    refenciaComplementarDisciplina: Yup.string().required(),
    codSigaDisciplina: Yup.string().required(),
  });
  const handleSubmit = async (values, resetForm) => {
    await api
      .post("/disciplina", values)
      .then(({ data }) => {
        history.push("/disciplina");
      })
      .catch((error) => {
        resetForm();
        console.log(error);
      });
  };
  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item container spacing={2} justify="center">
          <Grid item md={8} xs={12}>
            <Typography variant="h5" gutterBottom>
              Cadastro de Disciplinas
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Cadastro de Disciplinas
                  </Typography>
                }
              />
              <Divider />
              <Formik
                initialValues={{
                  nomeDisciplina: "",
                  descricaoDisciplina: "",
                }}
                validationSchema={DisciplinaSchema}
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
                            id="nomeDisciplina"
                            name="nomeDisciplina"
                            label="Nome da Disciplina"
                            variant="outlined"
                            required
                            value={values.nomeDisciplina}
                            onChange={handleChange}
                            error={errors.nomeDisciplina ? true : false}
                            helperText={errors.nomeDisciplina}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="descricaoDisciplina"
                            label="Descrição da Disciplina"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.descricaoDisciplina}
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
                            id="objetivoDisciplina"
                            label="Objetivo da Disciplina"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.objetivoDisciplina}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="ementaDisciplina"
                            label="Ementa da Disciplina"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.ementaDisciplina}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="refenciaBasicaDisciplina"
                            label="Referência básica da Disciplina"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.refenciaBasicaDisciplina}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="refenciaComplementarDisciplina"
                            label="Referência complementar da Disciplina"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.refenciaComplementarDisciplina}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="codSigaDisciplina"
                            label="Código siga da Disciplina"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.codSigaDisciplina}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Grid container item md={12} xs={12} justify="center">
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Criar Disciplina
                        </Button>
                      </Grid>
                    </CardActions>
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
