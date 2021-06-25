import React, { useCallback, useEffect, useState } from "react";
import Page from "../../components/Page";

import { Formik, Form } from "formik";

import { useHistory } from "react-router-dom";

import { Grade, SelectContainer, SelectGrade } from "./styles";

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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";

export default function CreateMatriz() {
  const history = useHistory();
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
  const [disciplinasToShow, setDisciplinasToShow] = useState([]);
  const [cursosToShow, setCursosToShow] = useState([]);
  const handleSubmitMatriz = useCallback(
    async (values, resetForm) => {
      try {
        const response = await api.post("/matriz", values);
        history.push("/matriz");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    [history]
  );
  const handleSubmitSemestre = useCallback(async (values, resetForm) => {
    try {
      const response = await api.post("/disciplinaMatriz", values);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getDisciplinas = async () => {
    try {
      const response = await api.get("/disciplina");
      setDisciplinasToShow(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const getCursos = async () => {
    try {
      const response = await api.get("/curso");
      setCursosToShow(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDisciplinas();
    getCursos();
  }, []);
  const disciplinas = [1, 2, 3, 4, 5, 6];
  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item container spacing={2} justify="center">
          <Grid item md={8} xs={12}>
            <Typography variant="h5" gutterBottom>
              Cadastro de Matriz
            </Typography>
          </Grid>
          <Grid item md={7} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Formulário de Cadastro de Matriz
                  </Typography>
                }
              />
              <Divider />
              <Formik
                initialValues={{
                  descricaoMatriz: "",
                  anoMatriz: "",
                  statusMatriz: true,
                  duracaoHoraAula: "",
                  periodoLetivo: "",
                  turnoFuncionamento: "",
                  prazoIntegralizacaoMin: "",
                  prazoIntegralizacaoMax: "",
                  regimeMatricula: "",
                  competenciaEspecificas: "",
                  competenciasGerais: "",
                  competencia: "",
                  formaAcesso: "",
                  eixoTecnologico: "",
                  perfilProfissional: "",
                  areasAtuacao: "",
                }}
                validationSchema={MatrizSchema}
                onSubmit={(values, { resetForm }) => {
                  handleSubmitMatriz(values, resetForm);
                }}
              >
                {({ handleChange, values, errors }) => (
                  <Form>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                          <SelectContainer>
                            <p>Selecione o curso</p>
                            <select>
                              {cursosToShow.map((curso) => (
                                <option>{curso.nomeCurso}</option>
                              ))}
                            </select>
                          </SelectContainer>
                          <TextField
                            id="descricaoMatriz"
                            label="Descrição da Matriz"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.descricaoMatriz}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="anoMatriz"
                            name="anoMatriz"
                            label="Ano Matriz"
                            variant="outlined"
                            required
                            onChange={handleChange}
                            value={values.anoMatriz}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">
                              Status Matriz
                            </FormLabel>
                            <RadioGroup
                              name="statusMatriz"
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
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="duracaoHoraAula"
                            label="Duração Hora Aula"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.duracaoHoraAula}
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
                            label="Prazo de Integralizacao Min"
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
                            label="Prazo de Integralizacao Max"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.prazoIntegralizacaoMax}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="regimeMatricula"
                            label="Regime de Matricula"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.regimeMatricula}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="competenciaEspecificas"
                            label="Competências Especificas"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.competenciaEspecificas}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="competenciasGerais"
                            label="Competências Gerais"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.competenciasGerais}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="competencia"
                            label="Competência"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.competencia}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="formaAcesso"
                            label="Forma Acesso"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.formaAcesso}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="eixoTecnologico"
                            label="Eixo Tecnologico"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.eixoTecnologico}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="perfilProfissional"
                            label="perfil profissional"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.perfilProfissional}
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            id="areasAtuacao"
                            label="Areas Atuação"
                            fullWidth
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            onChange={handleChange}
                            value={values.areasAtuacao}
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
                          Criar Matriz
                        </Button>
                      </Grid>
                    </CardActions>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{
                  semestre: 0,
                  nomeDisciplina: "",
                  cargaHoraria: "",
                  qtdeAulaPratica: "",
                  qtdeAulaTeorica: "",
                  usaLaboratorio: true,
                }}
                onSubmit={(values, { resetForm }) => {
                  handleSubmitSemestre(values, resetForm);
                }}
              >
                {({ handleChange, values, errors }) => (
                  <Form>
                    <Grade>
                      {disciplinas.map((_, index) => (
                        <>
                          <div>
                            {index === 0 && <p>Semestre</p>}
                            <div>
                              <select>
                                {disciplinas.map((value) => (
                                  <option value={values.semestre}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <SelectGrade>
                            {index === 0 && <p>Disciplina</p>}
                            <div>
                              <select value={(e) => e.target.value}>
                                {disciplinasToShow.map((disciplina) => (
                                  <option value>
                                    {disciplina.nomeDisciplina}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </SelectGrade>
                          <div>
                            {index === 0 && <p>Carga Horária</p>}
                            <TextField
                              id="cargaHoraria"
                              label="Carga Horária"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              type="text"
                              value={values.cargaHoraria}
                            />
                          </div>
                          <div>
                            {index === 0 && <p>Aulas Prática</p>}
                            <TextField
                              id="qtdeAulaPratica"
                              label="Aulas práticas"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              type="text"
                              value={values.qtdeAulaPratica}
                            />
                          </div>
                          <div>
                            {index === 0 && <p>Aulas Teórica</p>}
                            <TextField
                              id="qtdeAulaTeorica"
                              label="Aulas Teóricas"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              type="text"
                              value={values.qtdeAulaTeorica}
                            />
                          </div>
                          <div>
                            {index === 0 && <p>Laboratório</p>}
                            <input
                              id="usaLaboratorio"
                              label="Laboratório"
                              fullWidth
                              multiline
                              rowsMax={4}
                              variant="outlined"
                              onChange={handleChange}
                              type="checkbox"
                              defaultChecked={true}
                            />
                          </div>
                        </>
                      ))}
                    </Grade>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Cadastrar Semestre
                    </Button>
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
