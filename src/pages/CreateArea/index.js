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

export default function CreateArea() {
    const history = useHistory();
    const AreaSchema = Yup.object().shape({
        nomeArea: Yup.string().min(1, "Nome muito pequeno.").max(255, "Nome muito grande").required(),
        descricaoArea: Yup.string().max(255, "Descrição muito grande").required(),
    });
    const handleSubmit = async (values, resetForm) => {
        await api
            .post("/area", values)
            .then(({ data }) => {
                history.push("/area");
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
                            Cadastro de Area
                        </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Cadastro de Area
                                    </Typography>
                                }
                            />
                            <Divider />
                            <Formik
                                initialValues={{
                                    nomeArea: "",
                                    descricaoArea: "",
                                }}
                                validationSchema={AreaSchema}
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
                                                        id="nomeArea"
                                                        name="nomeArea"
                                                        label="Nome do Area"
                                                        variant="outlined"
                                                        required
                                                        value={values.nomeAreas}
                                                        onChange={handleChange}
                                                        error={errors.nomeAreas ? true : false}
                                                        helperText={errors.nomeArea}
                                                        fullWidth />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        id="descricaoArea"
                                                        label="Descrição do Area"
                                                        fullWidth
                                                        multiline
                                                        rowsMax={4}
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                        value={values.descricaoArea}
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
                                                    Criar Area
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

