import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Grid,
} from "@material-ui/core";


import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

import { useState } from "react";

import api from "../../services/api";

export default function TablePeriodo({ data, setData }) {
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [periodoToDelete, setPeriodoToDelete] = useState({});

    const handleCloseDialog = () => {
        setOpen(false);
        setPeriodoToDelete({});
    };
    const handleOpenDialog = (periodo) =>{
        setPeriodoToDelete(periodo);
        setOpen(true);
    }

    const deletePeriodo = async (periodoId) => {
        await api.delete(`/periodo/${periodoId}`).then(({ data }) => {
            console.log(data);
            setData();
            handleCloseDialog();
        }).catch((error) => {
            console.log(error);
            handleCloseDialog();
        });
    };
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Dialog
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                style={{ maxHeight: "90%" }}>
                <DialogTitle>Você deseja deletar este periodo?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText> Se você confirmar esta operação o periodo será deletado PERMANENTEMENTE</DialogContentText>
                    <DialogActions>
                        <Grid container xs={12} md={12} spacing={4} justify="flex-end">
                            <Grid item>
                                <Button autoFocus color="primary" onClick={handleCloseDialog}>
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    color="primary"
                                    className={classes.buttonDelete}
                                    onClick={(e) => deletePeriodo(periodoToDelete.id)}
                                >
                                    Deletar
                                 </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Nome do Periodo</b>
                            </Typography>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Typography variant="subtitle1">
                                <b>Ações</b>
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((periodo) => (
                        <TableRow key={periodo.id}>
                            <TableCell>{periodo.nome_periodo}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => history.push(`/update/periodo/${periodo.id}`)}
                                >
                                    Alterar
                                 </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e) => handleOpenDialog(periodo)}
                                >
                                    Deletar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
      minHeight: 400,
    },
    buttonDelete: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
      },
    },
  }));