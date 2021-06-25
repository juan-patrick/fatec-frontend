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

export default function UpdateCurso() {
  const { cursoId } = useParams();

  const [curso, setCurso] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getCurso = async () => {
    try {
      const response = await api.get("/curso");
      setCurso(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurso();
  }, []);

  const CursoSchema = Yup.object().shape({
    nomeCurso: Yup.string()
      .min(3, "Nome muito pequeno.")
      .max(45, "Nome é muito grande")
      .required(),
    descricaoCurso: Yup.string().max(45).required(),
    duracaoCurso: Yup.number().required(),
    situacaoCurso: Yup.bool(),
    codMec: Yup.string().max(45).required(),
  });
  const handleSubmit = async (values, resetForm) => {
    await api
      .put(`/curso/${cursoId}`, values)
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
                    nomeCurso: curso.nomeCurso,
                    descricaoCurso: curso.descricaoCurso,
                    duracaoCurso: curso.duracaoCurso,
                    situacaoCurso: curso.situacaoCurso,
                    codMec: curso.codMec,
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
                              fullWidth
                              error={errors.nomeCurso ? true : false}
                              helperText={errors.nomeCurso}
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="duracaoCurso"
                              name="duracaoCurso"
                              label="Duraçao do Curso"
                              variant="outlined"
                              required
                              value={values.duracaoCurso}
                              onChange={handleChange}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="descricaoCurso"
                              name="descricaoCurso"
                              label="Descrição do Curso"
                              variant="outlined"
                              required
                              value={values.descricaoCurso}
                              onChange={handleChange}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="codMec"
                              name="codMec"
                              label="Código MEC"
                              variant="outlined"
                              required
                              value={values.codMec}
                              onChange={handleChange}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">Status</FormLabel>
                              <RadioGroup
                                name="status"
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
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
