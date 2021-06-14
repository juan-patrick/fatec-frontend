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
    CircularProgress,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

export default function UpdateEventos() {
    const { eventosId } = useParams();

    const [eventos, setEventos] = useState({});
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const getEventos = async () => {
        await api.get(`/eventos/${eventosId}`).then(({ data }) => {
            setEventos(data);
            setLoading(false);

        })
            .catch((error) => {
                console.log(error);
                history.goBack();
            });
    };

    useEffect(() => {
        getEventos();
    }, []);

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
            .put(`/eventos/${eventosId}`, values)
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
                <Grid item container spacing={2}>
                    <Grid item md={8} xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Alteração de Eventos
                        </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Alteração de Eventos
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
                                        nomeEventos: eventos.nomeEventos,
                                        descricaoEventos: eventos.descricaoEventos,
                                        dataInicialEve: eventos.dataInicialEve,
                                        dataFimEve: eventos.dataFimEve,
                                        cargaHorariaEve: eventos.cargaHorariaEve,
                                        horarioInicialEve: eventos.horarioInicialEve,
                                        horarioFinalEve: eventos.horarioFinalEve,
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
                                                <Grid container item md={12} xs={12} justify="flex-end">
                                                    <Button
                                                        size="large"
                                                        color="primary"
                                                        variant="contained"
                                                        type="submit"
                                                    >
                                                        Alterar Eventos
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
