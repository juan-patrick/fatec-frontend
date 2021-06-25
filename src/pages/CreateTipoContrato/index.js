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

export default function CreateTipoContrato() {
    const history = useHistory();
    const TipoContratoSchema = Yup.object().shape({
        tipoContrato: Yup.string().min(1, "Nome muito pequeno.").max(255, "Nome muito grande").required(),
    });
    const handleSubmit = async (values, resetForm) => {
        await api
            .post("/tipoContrato", values)
            .then(({ data }) => {
                history.push("/tipoContrato");
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
                        Tipo Contrato
            </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Cadastro de Tipo Contrato
                  </Typography>
                                }
                            />
                            <Divider />
                            <Formik
                                initialValues={{
                                    tipoContrato: "",
                                }}
                                validationSchema={TipoContratoSchema}
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
                                                        id="tipoContrato"
                                                        name="tipoContrato"
                                                        label="Tipo de Contrato"
                                                        variant="outlined"
                                                        required
                                                        value={values.tipoContrato}
                                                        onChange={handleChange}
                                                        error={errors.tipoContrato ? true : false}
                                                        helperText={errors.tipoContrato}
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
                                                    Criar Tipo de Contrato
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

