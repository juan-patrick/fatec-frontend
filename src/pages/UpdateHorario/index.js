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

export default function UpdateHorario() {
  const { horarioId } = useParams();

  const [horario, setHorario] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getHorario = async () => {
    await api
      .get(`/horario/${horarioId}`)
      .then(({ data }) => {
        setHorario(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });
  };

  useEffect(() => {
    getHorario();
  },[]);
  const HorarioSchema = Yup.object().shape({
    HorarioInicial: Yup.string().required(),
    HorarioFinal: Yup.string().required(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .put(`/horario/${horarioId}`, values)
      .then(({ data }) => {
        history.push("/horario");
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
              Alteração de Horario
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Alteração de Horario
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
                    HorarioInicial: horario.HorarioInicial,
                    HorarioFinal: horario.HorarioFinal,
                  }}
                  validationSchema={HorarioSchema}
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
                              id="HorarioInicial"
                              label="Hora inicial"
                              type="time"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={handleChange}
                              value={values.HorarioInicial}
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="HorarioFinal"
                              label="Hora final"
                              type="time"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={handleChange}
                              value={values.HorarioFinal}
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
                            Alterar Horario
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
