import React, { useState, useEffect } from "react";
import Page from "../../components/Page";

import {
    Grid,
    Typography,
    Button,
    Link,
} from "@material-ui/core";

import api from "../../services/api";
import TableAreas from "../../components/TableArea";

function Area() {
    const [area, setArea] = useState([]);
    const getArea = async () => {
        await api.get("/area").then(({ data }) => {
            setArea(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getArea();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Areas
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/area">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar Area
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableAreas data={area} setData={getArea} />
                </Grid>
            </Grid>


        </Page>
    );

}

export default Area;

