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
    nomeInatividade: Yup.string()
      .min(3, "Nome muito pequeno.")
      .max(45, "Nome é muito grande")
      .required(),
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
                  nomeInatividade: "",
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
                            id="nomeInatividade"
                            name="nomeInatividade"
                            label="Nome da Inatividade"
                            variant="outlined"
                            required
                            value={values.nomeInatividade}
                            onChange={handleChange}
                            fullWidth
                            error={errors.nomeInatividade ? true : false}
                            helperText={errors.nomeInatividade}
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