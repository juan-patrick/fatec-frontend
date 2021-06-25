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
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../../services/api";

export default function CreatePeriodo() {
    const history = useHistory();
    const PeriodoSchema = Yup.object().shape({
        nome_periodo: Yup.string().min(1, "Nome muito pequeno.").max(255, "Nome muito grande").required(),
    });
    const handleSubmit = async (values, resetForm) => {
        await api.post("/periodo", values).then(({ data }) => {
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
                            Cadastro de Periodo
            </Typography>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography variant="h6">
                                        Formulário de Cadastro de Periodo
                                     </Typography>
                                }
                            />
                            <Divider />
                            <Formik
                                initialValues={{
                                    nome_periodo: "",

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
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                        value={values.nomePeriodo}
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
                                                    Criar Periodo
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
    )


}