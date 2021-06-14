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

export default function UpdateDisciplina() {
  const { disciplinaId } = useParams();

  const [disciplina, setDisciplina] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getDisciplina = async () => {
    await api
      .get(`/disciplina/${disciplinaId}`)
      .then(({ data }) => {
        setDisciplina(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });
  };
  useEffect(() => {
    getDisciplina();
  });

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
      .put(`/disciplina/${disciplinaId}`, values)
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
        <Grid item container spacing={2}>
          <Grid item md={8} xs={12}>
            <Typography variant="h5" gutterBottom>
              Alteração da Disciplina
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Alteração da Disciplina
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
                    nomeDisciplina: disciplina.nomeDisciplina,
                    descricaoDisciplina: disciplina.descricaoDisciplina,
                    cargaHoraria: disciplina.cargaHoraria,
                    objetivoDisciplina: disciplina.objetivoDisciplina,
                    ementaDisciplina: disciplina.ementaDisciplina,
                    refenciaBasicaDisciplina:
                      disciplina.refenciaBasicaDisciplina,
                    refenciaComplementarDisciplina:
                      disciplina.refenciaComplementarDisciplina,
                    codSigaDisciplina: disciplina.codSigaDisciplina,
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
                            Alterar Disciplina
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
