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
  CircularProgress,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

export default function UpdateCursoExtensao() {
  const { cursoExtensaoId } = useParams();

  const [cursoExtensao, setCursoExtensao] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getCursoExtensao = async () => {
    await api
      .get(`/cursoExtensao/${cursoExtensaoId}`)
      .then(({ data }) => {
        setCursoExtensao(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });
  };

  useEffect(() => {
    getCursoExtensao();
  });

  const CursoExtesaoSchema = Yup.object().shape({
    nomeExtensao: Yup.string()
      .min(3, "Nome muito pequeno.")
      .max(45, "Nome é muito grande")
      .required(),
    tipoExtensao: Yup.string().max(45).required(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .put(`/cursoExtensao/${cursoExtensaoId}`, values)
      .then(({ data }) => {
        history.push("/cursoExtensao");
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
              Alteração do Curso de Extensão
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Alteração do Curso de Extensão
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
                    nomeExtensao: cursoExtensao.nomeExtensao,
                    tipoExtensao: cursoExtensao.tipoExtensao,
                    status: cursoExtensao.Status,
                  }}
                  validationSchema={CursoExtesaoSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values, resetForm);
                  }}
                >
                  {({ handleChange, values, errors }) => (
                    <Form>
                      <CardContent>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="tipoExtensao"
                            name="tipoExtensao"
                            label="Tipo do Curso de extensão"
                            variant="outlined"
                            required
                            value={values.tipoExtensao}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid container spacing={3}>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="nomeExtensao"
                              name="nomeExtensao"
                              label="Nome do Curso"
                              variant="outlined"
                              required
                              value={values.nomeExtensao}
                              onChange={handleChange}
                              fullWidth
                              error={errors.nomeExtensao ? true : false}
                              helperText={errors.nomeExtensao}
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
                            Alterar Curso Extensão
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
