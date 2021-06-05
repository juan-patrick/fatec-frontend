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

    Button,
    Link,
} from "@material-ui/core";

import * as Yup from "yup";

import api from "../../services/api";
import TableTurma from "../../components/TableTurma"

function Turma() {
    const [turma, setTurma] = useState([]);
    const getTurma = async () => {
        await api.get("/turma").then(({ data }) => {
            setTurma(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getTurma();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Turma
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/turma">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar Turma
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableTurma data={turma} setData={getTurma} />
                </Grid>
            </Grid>

        </Page>
    );

}

export default Turma;

