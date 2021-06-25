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

export default function UpdateEmpregoPublico() {
  const { empregoPublicoId } = useParams();

  const [empregoPublico, setEmpregoPublico] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getEmpregoPublico = async () => {
    await api
      .get(`/empregoPublico/${empregoPublicoId}`)
      .then(({ data }) => {
        setEmpregoPublico(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });
  };

  useEffect(() => {
    getEmpregoPublico();
  },[]);

  const EmpregoPublicoSchema = Yup.object().shape({
    cargoPublico: Yup.string()
      .min(1, "Nome muito pequeno.")
      .max(255, "Nome muito grande")
      .required(),
    situacao: Yup.bool().required(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .put(`/empregoPublico/${empregoPublicoId}`, values)
      .then(({ data }) => {
        history.push("/empregoPublico");
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
              Alteração do cargo Publico
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Alteração do cargo Publico
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
                    cargoPublico: empregoPublico.cargoPublico,
                    situacao: empregoPublico.situacao,
                  }}
                  validationSchema={EmpregoPublicoSchema}
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
                              id="cargoPublico"
                              name="cargoPublico"
                              label="cargo Publico"
                              variant="outlined"
                              required
                              value={values.cargoPublico}
                              onChange={handleChange}
                              error={errors.cargoPublico ? true : false}
                              helperText={errors.cargoPublico}
                              fullWidth
                            />
                          </Grid>                       
                          <Grid item md={12} xs={12}>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">
                                situacao
                              </FormLabel>
                              <RadioGroup
                                name="situacao"
                                value={values.situacao}
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
                            Alterar Catgo Publico
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
