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
    CircularProgress,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

export default function UpdateCertificado() {
    const { certificadoId } = useParams();

    const [certificado, setCertificado] = useState({});
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const getCertificado = async () => {
        await api.get(`/certificado/${certificadoId}`).then(({ data }) => {
            setCertificado(data);
            setLoading(false);

        })
            .catch((error) => {
                console.log(error);
                history.goBack();
            });
    };

    useEffect(() => {
        getCertificado();
    }, []);

    const CertificadoSchema = Yup.object().shape({
        nomeAlunoCert: Yup.string().max(255).required(),
        nomePalestrante: Yup.string().max(255).required(),
        dataPalestra: Yup.date().required(),
    });

    const handleSubmit = async (values, resetForm) => {
        await api
            .put(`/certificado/${certificadoId}`, values)
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
                <Grid item container spacing={2}>
                    <Grid item md={8} xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Alteração de Certificados
            </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Alteração de Certificados
                  </Typography>
                                }
                            />
                            <Divider />
                            {loading ?
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
                                : <Formik
                                    initialValues={{
                                        nomeAlunoCert: certificado.nomeAlunoCert,
                                        nomePalestrante: certificado.nomePalestrante,
                                        dataPalestra: certificado.dataPalestra,
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
                                                            label="Nome do Certificado"
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
                                                            label="Descrição do Certificado"
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
                                                            label="Data Inicial"
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
                                                <Grid container item md={12} xs={12} justify="flex-end">
                                                    <Button
                                                        size="large"
                                                        color="primary"
                                                        variant="contained"
                                                        type="submit"
                                                    >
                                                        Alterar Certificado
                  </Button>
                                                </Grid>
                                            </CardActions>
                                        </Form>
                                    )}
                                </Formik>

                            }
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    );
}
