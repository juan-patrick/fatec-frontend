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

export default function CreateCursoExtensao() {
  const history = useHistory();

  const CursoExtesaoSchema = Yup.object().shape({
    nome_extensao: Yup.string()
      .min(3, "Nome muito pequeno.")
      .max(45, "Nome é muito grande")
      .required(),
    tipo_extensao: Yup.string().max(45).required(),
    status: Yup.bool(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .post("/cursoextensao", values)
      .then(({ data }) => {
        history.push("/cursos");
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
              <Formik
                initialValues={{
                  nome_extensao: "",
                  tipo_extensao: "",
                  status: true,
                }}
                validationSchema={CursoExtesaoSchema}
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
                            id="nome_extensao"
                            name="nome_extensao"
                            label="Nome do Curso"
                            variant="outlined"
                            required
                            value={values.nome_extensao}
                            onChange={handleChange}
                            fullWidth
                            error={errors.nome_extensao ? true : false}
                            helperText={errors.nome_extensao}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="tipo_extensao"
                            name="tipo_extensao"
                            label="Tipo do Curso"
                            variant="outlined"
                            required
                            value={values.tipo_extensao}
                            onChange={handleChange}
                            fullWidth
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
                          Criar Curso
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
