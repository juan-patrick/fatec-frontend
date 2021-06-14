import React, { useState } from "react";
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

export default function CreateEventos() {
    const history = useHistory();
    const EventosSchema = Yup.object().shape({
        nomeEventos: Yup.string().max(255).required(),
        descricaoEventos: Yup.string().max(255).required(),
        dataInicialEve: Yup.date().required(),
        dataFimEve: Yup.date().required(),
        cargaHorariaEve: Yup.number().required(),
        horarioInicialEve: Yup.string().required(),
        horarioFinalEve: Yup.string().required(),
    });
    const handleSubmit = async (values, resetForm) => {
        await api
            .post("/eventos", values)
            .then(({ data }) => {
                history.push("/eventos");
            })
            .catch((error) => {
                resetForm();
                console.log(error);
            });
    };
    return (
        <Page>
            <Grid container spacing={2}>
                <Grid item container spacing={2} justify="center">
                    <Grid item md={8} xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Cadastro de Eventos
                        </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Cadastro de Eventos
                                    </Typography>
                                }
                            />
                            <Divider />
                            <Formik
                                initialValues={{
                                    nomeEventos: "",
                                    descricaoEventos: "",
                                    situacaoEventos: true,
                                }}
                                validationSchema={EventosSchema}
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
                                                        id="nomeEventos"
                                                        name="nomeEventos"
                                                        label="Nome do Eventos"
                                                        variant="outlined"
                                                        required
                                                        value={values.nomeEventos}
                                                        onChange={handleChange}
                                                        error={errors.nomeEventos ? true : false}
                                                        helperText={errors.nomeEventos}
                                                        fullWidth />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="descricaoEventos"
                                                        label="Descrição do Eventos"
                                                        fullWidth
                                                        multiline
                                                        rowsMax={4}
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                        value={values.descricaoEventos}
                                                    />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="cargaHorariaEve"
                                                        name="cargaHorariaEve"
                                                        label="Carga Horaria"
                                                        variant="outlined"
                                                        required
                                                        onChange={handleChange}
                                                        value={values.cargaHorariaEve}
                                                        fullWidth
                                                        type="number" />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="dataInicialEve"
                                                        label="Data Inicial"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={handleChange}
                                                        value={values.dataInicialEve}

                                                    />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="dataFimEve"
                                                        label="Data Final"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={handleChange}
                                                        value={values.dataFimEve}

                                                    />
                                                </Grid>  <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="horarioInicialEve"
                                                        label="Hora inicial"
                                                        type="time"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={handleChange}
                                                        value={values.horarioInicialEve}

                                                    />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="horarioFinalEve"
                                                        label="Hora final"
                                                        type="time"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={handleChange}
                                                        value={values.horarioFinalEve}

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
                                                    Criar Eventos
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
};

