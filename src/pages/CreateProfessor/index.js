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
import { getCEP } from "../../services/brasilAPI";

export default function CreateProfessor() {
  const history = useHistory();

  const ProfessorSchema = Yup.object().shape({
    nomeProfessor: Yup.string().min(1, "Nome muito pequeno.").max(100, "Nome é muito grande").required(),
    cpfProfessor: Yup.number().required(),
    rgProfessor: Yup.number().required(),
    enderecoProfessor: Yup.string().max(100, "Endereço muito grande").required(),
    cepProfessor: Yup.number().required(),
    telefoneProfessor: Yup.number().required(),
    emailProfessor: Yup.string().max(100, "Email muito grande").required(),
    dataNascProfessor: Yup.date().required(),
    status: Yup.bool(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .post("/professores", values)
      .then(({ data }) => {
        history.push("/professor");
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
              Cadastro de Professores
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Cadastro de Professores
                  </Typography>
                }
              />
              <Divider />
              <Formik
                initialValues={{
                  nomeProfessor: "",
                  emailProfessor: "",
                  enderecoProfessor: "",
                  telefoneProfessor: "",
                  cpfProfessor: "",
                  rgProfessor: "",
                  dataNascProfessor: "", 
                  cepProfessor: "",
                  status: true,
                }}
                validationSchema={ProfessorSchema}
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
                            id="nomeProfessor"
                            name="nomeProfessor"
                            label="Nome do Professor"
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="cpfProfessor"
                            name="cpfProfessor"
                            label="CPF do Professor"
                            variant="outlined"
                            required
                            value={values.cpfProfessor}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="rgProfessor"
                            name="rgProfessor"
                            label="RG do Professor"
                            variant="outlined"
                            required
                            value={values.rgProfessor}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="dataNascProfessor"
                            label="Data de nascimento do professor"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            value={values.dataNascProfessor}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="telefoneProfessor"
                            name="telefoneProfessor"
                            label="Telefone do Professor"
                            variant="outlined"
                            required
                            value={values.telefoneProfessor}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="emailProfessor"
                            name="emailProfessor"
                            label="Email do Professor"
                            variant="outlined"
                            required
                            value={values.emailProfessor}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="enderecoProfessor"
                            name="enderecoProfessor"
                            label="Endereço do Professor"
                            variant="outlined"
                            required
                            value={values.enderecoProfessor}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                           id="cepProfessor"
                           name="cepProfessor"
                           label="CEP do Professor"
                           variant="outlined"
                           required
                           value={values.cepProfessor}
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
                          Criar Professor
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