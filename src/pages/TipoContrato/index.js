import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import {
    Grid,
    Typography,
    Button,
    Link,
} from "@material-ui/core";

import api from "../../services/api";
import TableTipoContrato from "../../components/TableTipoContrato";

function TipoContrato() {
    const [tipoContrato, setTipoContrato] = useState([]);
    const getTipoContrato = async () => {
        await api.get("/tipoContrato").then(({ data }) => {
            setTipoContrato(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getTipoContrato();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Tipos de Contrato
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/tipoContrato">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar Tpo de Contrato
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableTipoContrato data={tipoContrato} setData={getTipoContrato} />
                </Grid>
            </Grid>


        </Page>
    );

}

export default TipoContrato;

