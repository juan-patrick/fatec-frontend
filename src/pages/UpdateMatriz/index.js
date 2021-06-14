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
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";

import * as Yup from "yup";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateMatriz() {
  const { matrizId } = useParams();

  const [matriz, setMatriz] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getMatriz = async () => {
    await api
      .get(`/matriz/${matrizId}`)
      .then(({ data }) => {
        setMatriz(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        history.goBack();
      });
  };
  useEffect(() => {
    getMatriz();
  }, []);
  const {
    descricaoMatriz,
    anoMatriz,
    statusMatriz,
    duracaoHoraAula,
    periodoLetivo,
    turnoFuncionamento,
    prazoIntegralizacaoMin,
    prazoIntegralizacaoMax,
    regimeMatricula,
    competenciaEspecificas,
    competenciasGerais,
    competencia,
    formaAcesso,
    eixoTecnologico,
    perfilProfissional,
    areasAtuacao,
  } = matriz;
  const MatrizSchema = Yup.object().shape({
    descricaoMatriz: Yup.string().required(),
    anoMatriz: Yup.string().required(),
    statusMatriz: Yup.bool().required(),
    duracaoHoraAula: Yup.string().required(),
    periodoLetivo: Yup.string().required(),
    turnoFuncionamento: Yup.string().required(),
    prazoIntegralizacaoMin: Yup.string().required(),
    prazoIntegralizacaoMax: Yup.string().required(),
    regimeMatricula: Yup.string().required(),
    competenciaEspecificas: Yup.string().required(),
    competenciasGerais: Yup.string().required(),
    competencia: Yup.string().required(),
    formaAcesso: Yup.string().required(),
    eixoTecnologico: Yup.string().required(),
    perfilProfissional: Yup.string().required(),
    areasAtuacao: Yup.string().required(),
  });

  const handleSubmit = async (values, resetForm) => {
    await api
      .put(`/matriz/${matrizId}`, values)
      .then(({ data }) => {
        history.push("/matriz");
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
              Alteração da Matriz
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Alteração da Matriz
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
                    descricaoMatriz,
                    anoMatriz,
                    statusMatriz,
                    duracaoHoraAula,
                    periodoLetivo,
                    turnoFuncionamento,
                    prazoIntegralizacaoMin,
                    prazoIntegralizacaoMax,
                    regimeMatricula,
                    competenciaEspecificas,
                    competenciasGerais,
                    competencia,
                    formaAcesso,
                    eixoTecnologico,
                    perfilProfissional,
                    areasAtuacao,
                  }}
                  validationSchema={MatrizSchema}
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
                              id="descricaoMatriz"
                              name="descricaoMatriz"
                              label="Descrição Matriz"
                              variant="outlined"
                              required
                              value={values.descricaoMatriz}
                              onChange={handleChange}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="anoMatriz"
                              label="Ano Matriz"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              value={values.anoMatriz}
                            />
                            <Grid item md={12} xs={12}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup
                                  name="status"
                                  value={values.statusMatriz}
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
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="duracaoHoraAula"
                              name="duracaoHoraAula"
                              label="Duração Hora Aula"
                              variant="outlined"
                              required
                              onChange={handleChange}
                              value={values.duracaoHoraAula}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="periodoLetivo"
                              label="Periodo Letivo"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              value={values.periodoLetivo}
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="turnoFuncionamento"
                              label="Turno de Funcionamento"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              value={values.turnoFuncionamento}
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="prazoIntegralizacaoMin"
                              label="Prazo de integralização Min"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              value={values.prazoIntegralizacaoMin}
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="prazoIntegralizacaoMax"
                              name="prazoIntegralizacaoMax"
                              label="Prazo de integralização Max"
                              variant="outlined"
                              required
                              value={values.prazoIntegralizacaoMax}
                              onChange={handleChange}
                              error={
                                errors.prazoIntegralizacaoMax ? true : false
                              }
                              helperText={errors.prazoIntegralizacaoMax}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="regimeMatricula"
                              name="regimeMatricula"
                              label="Regime da Matricula"
                              variant="outlined"
                              required
                              value={values.regimeMatricula}
                              onChange={handleChange}
                              error={errors.regimeMatricula ? true : false}
                              helperText={errors.regimeMatricula}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="competenciaEspecificas"
                              name="competenciaEspecificas"
                              label="Competências Especificas"
                              variant="outlined"
                              required
                              value={values.competenciaEspecificas}
                              onChange={handleChange}
                              error={
                                errors.competenciaEspecificas ? true : false
                              }
                              helperText={errors.competenciaEspecificas}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="competenciasGerais"
                              name="competenciasGerais"
                              label="Competencias Gerais"
                              variant="outlined"
                              required
                              value={values.competenciasGerais}
                              onChange={handleChange}
                              error={errors.competenciasGerais ? true : false}
                              helperText={errors.competenciasGerais}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="competencia"
                              name="competencia"
                              label="Competencia"
                              variant="outlined"
                              required
                              value={values.competencia}
                              onChange={handleChange}
                              error={errors.competencia ? true : false}
                              helperText={errors.competencia}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="formaAcesso"
                              name="formaAcesso"
                              label="Forma Acesso"
                              variant="outlined"
                              required
                              value={values.formaAcesso}
                              onChange={handleChange}
                              error={errors.formaAcesso ? true : false}
                              helperText={errors.formaAcesso}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="eixoTecnologico"
                              name="eixoTecnologico"
                              label="Eixo tecnologico"
                              variant="outlined"
                              required
                              value={values.eixoTecnologico}
                              onChange={handleChange}
                              error={errors.eixoTecnologico ? true : false}
                              helperText={errors.eixoTecnologico}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="perfilProfissional"
                              name="perfilProfissional"
                              label="Perfil profissional"
                              variant="outlined"
                              required
                              value={values.perfilProfissional}
                              onChange={handleChange}
                              error={errors.perfilProfissional ? true : false}
                              helperText={errors.perfilProfissional}
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <TextField
                              id="areasAtuacao"
                              name="areasAtuacao"
                              label="Areas de atuação"
                              variant="outlined"
                              required
                              value={values.areasAtuacao}
                              onChange={handleChange}
                              error={errors.areasAtuacao ? true : false}
                              helperText={errors.areasAtuacao}
                              fullWidth
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
