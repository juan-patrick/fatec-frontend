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

export default function CreateVinculo() {
  const history = useHistory();

  const VinculoSchema = Yup.object().shape({
    nomeVinculo: Yup.string()
      .min(3, "Nome muito pequeno.")
      .max(45, "Nome é muito grande")
      .required(),
    status: Yup.bool(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .post("/vinculos", values)
      .then(({ data }) => {
        history.push("/vinculo");
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
              Cadastro de Vinculos
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Cadastro de Vinculos
                  </Typography>
                }
              />
              <Divider />
              <Formik
                initialValues={{
                  nomeVinculo: "",
                  status: true,
                }}
                validationSchema={VinculoSchema}
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
                            id="nomeVinculo"
                            name="nomeVinculo"
                            label="Nome do Vinculo"
                            variant="outlined"
                            required
                            value={values.nomeVinculo}
                            onChange={handleChange}
                            fullWidth
                            error={errors.nomeVinculo ? true : false}
                            helperText={errors.nomeVinculo}
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
                          Criar Vinculo
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