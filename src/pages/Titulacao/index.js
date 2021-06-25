import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import {
    Grid,
    Typography,
    Button,
    Link,
} from "@material-ui/core";

import api from "../../services/api";
import TableTitulacao from "../../components/TableTitulacao";

function Titulacao() {
    const [titulacao, setTitulacao] = useState([]);
    const getTitulacao = async () => {
        await api.get("/titulacao").then(({ data }) => {
            setTitulacao(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getTitulacao();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Titulacao
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/titulacao">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar Titulacao
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableTitulacao data={titulacao} setData={getTitulacao} />
                </Grid>
            </Grid>


        </Page>
    );

}

export default Titulacao;

