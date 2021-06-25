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
    await api
      .get(`/curso/${cursoId}`)
      .then(({ data }) => {
        setCurso(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });
  };

  useEffect(() => {
    getCurso();
  },[]);

  const CursoSchema = Yup.object().shape({
    nomeCurso: Yup.string()
      .min(1, "Nome muito pequeno.")
      .max(255, "Nome muito grande")
      .required(),
      duracaoCurso: Yup.number().required(),
    descricaoCurso: Yup.string()
    .min(1, "Nome muito pequeno.")
    .max(255, "Nome muito grande")
    .required(),
    situacaoCurso: Yup.bool().required(),
    codMec: Yup.string()
    .min(1, "Nome muito pequeno.")
    .max(255, "Nome muito grande")
    .required(),
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
              Alteração do Curso
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Alteração do Curso
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
                    duracaoCurso: curso.duracaoCurso,
                    descricaoCurso: curso.descricaoCurso,
                    situacaoCurso: curso.situacaoCurso,
                    codMec: curso.codMec
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
                              name="duracaoCurso"
                              label="Duracao Curso"
                              variant="outlined"
                              required
                              onChange={handleChange}
                              value={values.duracaoCurso}
                              fullWidth
                              type="number"
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
                                situacao Curso
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
                              label="codigo Mec"
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
                        <Grid container item md={12} xs={12} justify="flex-end">
                          <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            type="submit"
                          >
                            Alterar Curso
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
