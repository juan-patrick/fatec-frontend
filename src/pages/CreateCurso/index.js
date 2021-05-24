import React, { useState } from "react";
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

const CreateCurso = () => {
  const history = useHistory();
  const [curso, setCurso] = useState();
  const CursoSchema = Yup.object().shape({
    nome_curso: Yup.string()
      .min(3, "Nome muito pequeno.")
      .max(45, "Nome é muito grande")
      .required(),
    descricao_curso: Yup.string().max(45).required(),
    duracao_curso: Yup.number().required(),
    situacao_curso: Yup.bool(),
    cod_mec: Yup.string().max(45).required(),
  });

  const handleSubmit = async (values, resetForm) => {
    try {
      const response = await api.post("/cursos", values);
      history.push("/cursos");
      setCurso(response);
      console.log(curso);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item container spacing={2}>
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
                  nome_curso: "",
                  descricao_curso: "",
                  duracao_curso: 0,
                  situacao_curso: true,
                  cod_mec: "",
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
                            id="nome_curso"
                            name="nome_curso"
                            label="Nome do Curso"
                            variant="outlined"
                            required
                            value={values.nome_curso}
                            onChange={handleChange}
                            fullWidth
                            error={errors.nome_curso ? true : false}
                            helperText={errors.nome_curso}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="duracao_curso"
                            name="duracao_curso"
                            label="Duraçao do Curso"
                            variant="outlined"
                            required
                            value={values.duracao_curso}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="descricao_curso"
                            name="descricao_curso"
                            label="Descrição do Curso"
                            variant="outlined"
                            required
                            value={values.descricao_curso}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="cod_mec"
                            name="cod_mec"
                            label="Código MEC"
                            variant="outlined"
                            required
                            value={values.cod_mec}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup
                              name="status"
                              value={values.situacao_curso}
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
};

export default CreateCurso;
