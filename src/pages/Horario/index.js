import React, { useState, useEffect } from "react";
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
    Link,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";
import TableHorario from "../../components/TableHorario"

function Horario() {
    const [horario, setHorario] = useState([]);
    const getHorario = async () => {
        await api.get("/horario").then(({ data }) => {
            setHorario(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getHorario();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Horario
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/horario">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar Horario
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableHorario data={horario} setData={getHorario} />
                </Grid>
            </Grid>

        </Page>
    );

}

export default Horario;

