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

export default function TableHorario({ data, setData }) {
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [horarioToDelete, setHorarioToDelete] = useState({});

    const handleCloseDialog = () => {
        setOpen(false);
        setHorarioToDelete({});
    };
    const handleOpenDialog = (horario) =>{
        setHorarioToDelete(horario);
        setOpen(true);
    }

    const deleteHorario = async (horarioId) => {
        await api.delete(`/horario/${horarioId}`).then(({ data }) => {
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
                <DialogTitle>Você deseja deletar este horario?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText> Se você confirmar esta operação o horario será deletado PERMANENTEMENTE</DialogContentText>
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
                                    onClick={(e) => deleteHorario(horarioToDelete.id)}
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
                                <b>Hora de Inicio</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Hora do Final</b>
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
                    {data && data.map((horario) => (
                        <TableRow key={horario.id}>
                            <TableCell>{horario.horarioInicial}</TableCell>
                            <TableCell>{horario.horarioFinal}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => history.push(`/update/horario/${horario.id}`)}
                                >
                                    Alterar
                                 </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e) => handleOpenDialog(horario)}
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
  