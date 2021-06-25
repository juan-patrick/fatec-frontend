import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import {
    Grid,
    Typography,
    Button,
    Link,
} from "@material-ui/core";

import api from "../../services/api";
import TableEmpregoPublico from "../../components/TableEmpregoPublico";

function EmpregoPublico() {
    const [empregoPublico, setEmpregoPublico] = useState([]);
    const getEmpregoPublico = async () => {
        await api.get("/empregoPublico").then(({ data }) => {
            setEmpregoPublico(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getEmpregoPublico();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Cargos Publicos
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/empregoPublico">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar cargo Publico
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableEmpregoPublico data={empregoPublico} setData={getEmpregoPublico} />
                </Grid>
            </Grid>


        </Page>
    );

}

export default EmpregoPublico;

