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

export default function UpdateSemana() {
    const { semanaId } = useParams();

    const [semana, setSemana] = useState({});
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const getSemana = async () => {
        await api.get(`/semana/${semanaId}`).then(({ data }) => {
            setSemana(data);
            setLoading(false);

        })
            .catch((error) => {
                console.log(error);
                history.goBack();
            });
    };

    useEffect(() => {
        getSemana();
    }, []);
    const SemanaSchema = Yup.object().shape({
        nome_semana: Yup.string().max(20, 'Nome da semana maior que o limite'),
    });

    const handleSubmit = async (values, resetForm) => {
        await api
            .put(`/semana/${semanaId}`, values)
            .then(({ data }) => {
                history.push("/semana");
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
                            Alteração de Semana
                        </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Alteração de Semana
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
                                        nome_semana: semana.nome_semana,
                                    }}
                                    validationSchema={SemanaSchema}
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
                                                            id="nome_semana"
                                                            label="Nome da semana"
                                                            onChange={handleChange}
                                                            value={values.nome_semana}
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
                                                        Alterar Semana
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
