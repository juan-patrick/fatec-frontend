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

export default function CreateCursoExtensao() {
  const history = useHistory();
  const CursoExtensaoSchema = Yup.object().shape({
    tipoExtensao: Yup.string().required(),
    nomeExtensao: Yup.string().required(),
  });
  const handleSubmit = async (values, resetForm) => {
    await api
      .post("/cursoExtensao", values)
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
        <Grid item container spacing={2} justify="center">
          <Grid item md={8} xs={12}>
            <Typography variant="h5" gutterBottom>
              Cadastro de Curso de Extensao
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Cadastro de Curso de Extensao
                  </Typography>
                }
              />
              <Divider />
              <Formik
                initialValues={{
                  tipoExtensao: "",
                  nomeExtensao: "",
                }}
                validationSchema={CursoExtensaoSchema}
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
                            id="tipoExtensao"
                            label="Tipo do curso de Extensao"
                            InputLabelProps={{}}
                            onChange={handleChange}
                            value={values.tipoExtensao}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="nomeExtensao"
                            label="Nome curso Extensão"
                            InputLabelProps={{}}
                            onChange={handleChange}
                            value={values.nomeExtensao}
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
                          Criar Curso de Extensao
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
