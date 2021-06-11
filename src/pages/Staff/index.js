import React, { useState, useEffect } from "react";
import Page from "../../components/Page";

import {
    Grid,
    Typography,
    Button,
    Link,
} from "@material-ui/core";


import api from "../../services/api";
import TableStaff from "../../components/TableStaff"

function Staff() {
    const [staff, setStaff] = useState([]);
    const getStaff = async () => {
        await api.get("/staff").then(({ data }) => {
            setStaff(data);
            console.log(data);
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getStaff();
    }, []);

    return (
        <Page>
            <Grid container>
                <Grid item container spacing={5} sm={12} justify="space-between">
                    <Grid item sm={10} md={6} lg={6} xs={10}>
                        <Typography variant="h5" gutterBottom fullWidth>
                            Lista de Staff
            </Typography>
                    </Grid>
                    <Grid item sm={2} md={6} lg={6} xs={2}>
                        <Link href="/create/staff">
                            <Button size="large" color="primary" variant="contained">
                                Adicionar Staff
              </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <TableStaff data={staff} setData={getStaff} />
                </Grid>
            </Grid>

        </Page>
    );

}

export default Staff;

