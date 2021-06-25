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

export default function CreateInatividade() {
  const history = useHistory();

  const InatividadeSchema = Yup.object().shape({
    motivo: Yup.string().min(4, "Motivo muito pequeno.").max(100, "Motivo é muito grande").required(),
    dataInicio: Yup.date().required(),
    dataFim: Yup.date().required(),
    status: Yup.bool(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .post("/inatividades", values)
      .then(({ data }) => {
        history.push("/inatividade");
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
              Cadastro de Inatividades
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Cadastro de Inatividades
                  </Typography>
                }
              />
              <Divider />
              <Formik
                initialValues={{
                  motivo: "",
                  dataInicio: "",
                  dataFim: "",
                  status: true,
                }}
                validationSchema={InatividadeSchema}
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
                            id="motivo"
                            name="motivo"
                            label="Motivo da Inatividade"
                            variant="outlined"
                            required
                            value={values.motivo}
                            onChange={handleChange}
                            fullWidth
                            error={errors.motivo ? true : false}
                            helperText={errors.motivo}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="dataInicio"
                            label="Data de inicio"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            value={values.dataInicio}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="dataFim"
                            label="Data fim"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            value={values.dataFim}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup
                              name="status"
                              value={values.status}
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
                          Criar Inatividade
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