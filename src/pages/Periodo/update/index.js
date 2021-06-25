import Page from "../../../components/Page";

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

import api from "../../../services/api";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

export default function UpdatePeriodo() {
    const { periodoId } = useParams();

    const [periodo, setPeriodo] = useState({});
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const getPeriodo = async () => {
        await api.get(`/periodo/${periodoId}`).then(({ data }) => {
            setPeriodo(data);
            setLoading(false);

        })
            .catch((error) => {
                console.log(error);
                history.goBack();
            });
    };

    useEffect(() => {
        getPeriodo();
    }, []);
    const PeriodoSchema = Yup.object().shape({
        nome_periodo: Yup.string().max(20, 'Nome da periodo maior que o limite'),
    });

    const handleSubmit = async (values, resetForm) => {
        await api
            .put(`/periodo/${periodoId}`, values)
            .then(({ data }) => {
                history.push("/periodo");
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
                            Alteração de Periodo
            </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Alteração de Periodo
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
                                        nome_periodo: periodo.nome_periodo,
                                    }}
                                    validationSchema={PeriodoSchema}
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
                                                            id="nome_periodo"
                                                            label="Nome do periodo"
                                                            onChange={handleChange}
                                                            value={values.nome_periodo}
                                                            variant="outlined"
                                                            fullWidth
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
                                                        Alterar Periodo
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
