import React, { useState, useEffect } from "react";
import Page from "../../components/Page";


import {
    Grid,
    Typography,
    Button,
    Link,
} from "@material-ui/core";

import api from "../../services/api";
import TableEventos from "../../components/TableEventos";

function Eventos() {
    const [eventos, setEventos] = useState([]);
    const getEventos = async () => {
        await api.get("/eventos").then(({ data }) => {
            setEventos(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getEventos();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Eventos
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/eventos">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar Eventos
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableEventos data={eventos} setData={getEventos} />
                </Grid>
            </Grid>


        </Page>
    );

}

export default Eventos;

