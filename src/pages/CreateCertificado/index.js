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

export default function CreateProjeto() {
    const history = useHistory();
    const CertificadoSchema = Yup.object().shape({
        nomeAlunoCert: Yup.string().max(255).required(),
        nomePalestrante: Yup.string().max(255).required(),
        dataPalestra: Yup.date().required(),
    });
    const handleSubmit = async (values, resetForm) => {
        await api
            .post("/certificado", values)
            .then(({ data }) => {
                history.push("/certificado");
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
                            Cadastro de Certificado
            </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Cadastro de Certificado
                  </Typography>
                                }
                            />
                            <Divider />
                            <Formik
                                initialValues={{
                                    nomeAlunoCert: "",
                                    nomePalestrante: "",
                             }}
                                validationSchema={CertificadoSchema}
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
                                                        id="nomeAlunoCert"
                                                        name="nomeAlunoCert"
                                                        label="Nome do aluno"
                                                        variant="outlined"
                                                        required
                                                        value={values.nomeAlunoCert}
                                                        onChange={handleChange}
                                                        error={errors.nomeAlunoCert ? true : false}
                                                        helperText={errors.nomeAlunoCert}
                                                        fullWidth />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="nomePalestrante"
                                                        label="Nome do Palestrante"
                                                        fullWidth
                                                        multiline
                                                        rowsMax={4}
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                        value={values.nomePalestrante}
                                                    />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="dataPalestra"
                                                        label="Data da palestra"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={handleChange}
                                                        value={values.dataPalestra}

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
                                                    Criar Certificado
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

