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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardActions,
  Button,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";

export default function CreateCurso() {
  const history = useHistory();
  const CursoSchema = Yup.object().shape({
    nomeCurso: Yup.string()
      .min(1, "Nome muito pequeno.")
      .max(255, "Nome muito grande")
      .required(),
    duracaoCurso: Yup.number().required(),
    descricaoCurso: Yup.string().max(255, "Descrição muito grande").required(),
    situacaoCurso: Yup.bool().required(),
    codMec: Yup.string().required(),
  });
  const handleSubmit = async (values, resetForm) => {
    await api
      .post("/curso", values)
      .then(({ data }) => {
        history.push("/curso");
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
              Cadastro de Cursos
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Cadastro de Cursos
                  </Typography>
                }
              />
              <Divider />
              <Formik
                initialValues={{
                  nomeCurso: "",
                  duracaoCurso: "",
                  descricaoCurso: "",
                  situacaoCurso: true,
                  codMec: "",
                }}
                validationSchema={CursoSchema}
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
                            id="nomeCurso"
                            name="nomeCurso"
                            label="Nome do Curso"
                            variant="outlined"
                            required
                            value={values.nomeCurso}
                            onChange={handleChange}
                            error={errors.nomeCurso ? true : false}
                            helperText={errors.nomeCurso}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="duracaoCurso"
                            label="Duração do Curso"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.duracaoCurso}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="descricaoCurso"
                            label="Descrição do Curso"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.descricaoCurso}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">
                              situacaoCurso
                            </FormLabel>
                            <RadioGroup
                              name="situacaoCurso"
                              value={values.situacaoCurso}
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
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="codMec"
                            label="Código MEC"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.codMec}
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
                          Criar Curso
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
