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
    const ProjetoSchema = Yup.object().shape({
        nome_projetos: Yup.string().min(1, "Nome muito pequeno.").max(255, "Nome muito grande").required(),
        descricao_projetos: Yup.string().max(255, "Descrição muito grande").required(),
        carga_horaria: Yup.number().required(),
        status: Yup.bool().required(),
        data_ini: Yup.date().required(),
        data_fim: Yup.date().required(),

    });
    const handleSubmit = async (values, resetForm) => {
        await api
            .post("/projeto", values)
            .then(({ data }) => {
                history.push("/projeto");
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
                            Cadastro de Projeto
            </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Cadastro de Projeto
                  </Typography>
                                }
                            />
                            <Divider />
                            <Formik
                                initialValues={{
                                    nome_projetos: "",
                                    descricao_projetos: "",
                                    situacao_projetos: true,
                                }}
                                validationSchema={ProjetoSchema}
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
                                                        id="nome_projetos"
                                                        name="nome_projetos"
                                                        label="Nome do Projeto"
                                                        variant="outlined"
                                                        required
                                                        value={values.nome_projetos}
                                                        onChange={handleChange}
                                                        error={errors.nome_projetos ? true : false}
                                                        helperText={errors.nome_projetos}
                                                        fullWidth />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="descricao_projetos"
                                                        label="Descrição do Projeto"
                                                        fullWidth
                                                        multiline
                                                        rowsMax={4}
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                        value={values.descricao_projetos}
                                                    />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="carga_horaria"
                                                        name="carga_horaria"
                                                        label="Carga Horaria"
                                                        variant="outlined"
                                                        required
                                                        onChange={handleChange}
                                                        value={values.carga_horaria}
                                                        fullWidth
                                                        type="number" />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="data_ini"
                                                        label="Data Inicial"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={handleChange}
                                                        value={values.data_ini}

                                                    />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="data_fim"
                                                        label="Data Final"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={handleChange}
                                                        value={values.data_fim}

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
                                            <Grid container item md={12} xs={12} justify="center">
                                                <Button
                                                    size="large"
                                                    color="primary"
                                                    variant="contained"
                                                    type="submit"
                                                >
                                                    Criar Projeto
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

