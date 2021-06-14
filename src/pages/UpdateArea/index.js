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

export default function UpdateArea() {
    const { areaId } = useParams();

    const [area, setArea] = useState({});
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const getArea = async () => {
        await api.get(`/area/${areaId}`).then(({ data }) => {
            setArea(data);
            setLoading(false);

        })
            .catch((error) => {
                console.log(error);
                history.goBack();
            });
    };

    useEffect(() => {
        getArea();
    }, []);

    const AreaSchema = Yup.object().shape({
        nomeArea: Yup.string().min(1, "Nome muito pequeno.").max(255, "Nome muito grande").required(),
        descricaoArea: Yup.string().max(255, "Descrição muito grande").required(),
    });

    const handleSubmit = async (values, resetForm) => {
        await api
            .put(`/area/${areaId}`, values)
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
                <Grid item container spacing={2}>
                    <Grid item md={8} xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Alteração de Areas
                        </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Alteração de Areas
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
                                        nomeArea: area.nomeArea,
                                        descricaoArea: area.descricaoArea,
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
                                                            value={values.nomeArea}
                                                            onChange={handleChange}
                                                            error={errors.nomeArea ? true : false}
                                                            helperText={errors.nomeArea}
                                                            fullWidth/>
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
                                                <Grid container item md={12} xs={12} justify="flex-end">
                                                    <Button
                                                        size="large"
                                                        color="primary"
                                                        variant="contained"
                                                        type="submit"
                                                    >
                                                        Alterar Area
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
