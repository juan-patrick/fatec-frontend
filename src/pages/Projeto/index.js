import React, { useState, useEffect } from "react";
import Page from "../../components/Page";

import {
    Grid,
    Typography,
    Button,
    Link,
} from "@material-ui/core";


import api from "../../services/api";
import TableProjetos from "../../components/TableProjeto";

function Projeto() {
    const [projeto, setProjeto] = useState([]);
    const getProjeto = async () => {
        await api.get("/projeto").then(({ data }) => {
            setProjeto(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getProjeto();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Projetos
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/projeto">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar Projeto
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableProjetos data={projeto} setData={getProjeto} />
                </Grid>
            </Grid>


        </Page>
    );

}

export default Projeto;

