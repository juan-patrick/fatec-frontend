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

export default function UpdateTurma() {
    const { turmaId } = useParams();

    const [turma, setTurma] = useState({});
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const getTurma = async () => {
        await api.get(`/turma/${turmaId}`).then(({ data }) => {
            setTurma(data);
            setLoading(false);

        })
            .catch((error) => {
                console.log(error);
                history.goBack();
            });
    };

    useEffect(() => {
        getTurma();
    }, []);
    const TurmaSchema = Yup.object().shape({
        nomeTurma: Yup.string().max(20, 'Nome da turma maior que o limite'),
    });

    const handleSubmit = async (values, resetForm) => {
        await api
            .put(`/turma/${turmaId}`, values)
            .then(({ data }) => {
                history.push("/turma");
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
                            Alteração de Turma
            </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Alteração de Turma
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
                                        nomeTurma: turma.nomeTurma,
                                    }}
                                    validationSchema={TurmaSchema}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values, resetForm);
                                    }}
                                >
                                    {({ handleChange, values, errors }) => (
                                        <Form>
                                            <CardContent>
                                                <Grid container spacing={3}>
                                                    =                                                                                                  <Grid item md={12} xs={12}>
                                                        <TextField
                                                            id="nomeTurma"
                                                            label="Nome da turma"
                                                            onChange={handleChange}
                                                            value={values.nomeTurma}

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
                                                        Alterar Turma
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
