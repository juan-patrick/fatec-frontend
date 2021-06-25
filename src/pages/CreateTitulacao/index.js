import React from "react";
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

export default function CreateTitulacao() {
    const history = useHistory();
    const TitulacaoSchema = Yup.object().shape({
        nomeTitulacao: Yup.string().min(1, "Nome muito pequeno.").max(255, "Nome muito grande").required(),
    });
    const handleSubmit = async (values, resetForm) => {
        await api
            .post("/titulacao", values)
            .then(({ data }) => {
                history.push("/titulacao");
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
                        Titulacao
            </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Cadastro Titulação
                  </Typography>
                                }
                            />
                            <Divider />
                            <Formik
                                initialValues={{
                                    nomeTitulacao: "",
                                }}
                                validationSchema={TitulacaoSchema}
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
                                                        id="nomeTitulacao"
                                                        name="nomeTitulacao"
                                                        label="Titulacao"
                                                        variant="outlined"
                                                        required
                                                        value={values.nomeTitulacao}
                                                        onChange={handleChange}
                                                        error={errors.nomeTitulacao ? true : false}
                                                        helperText={errors.nomeTitulacao}
                                                        fullWidth />
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
                                                    Criar Titulação
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

