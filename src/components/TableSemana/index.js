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

export default function TableSemana({ data, setData }) {
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [semanaToDelete, setSemanaToDelete] = useState({});

    const handleCloseDialog = () => {
        setOpen(false);
        setSemanaToDelete({});
    };
    const handleOpenDialog = (semana) =>{
        setSemanaToDelete(semana);
        setOpen(true);
    }

    const deleteSemana = async (semanaId) => {
        console.log(semanaId)
        await api.delete(`/semana/${semanaId}`).then(({ data }) => {
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
                <DialogTitle>Você deseja deletar este semana?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText> Se você confirmar esta operação o semana será deletado PERMANENTEMENTE</DialogContentText>
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
                                    onClick={(e) => deleteSemana(semanaToDelete.id)}
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
                                <b>Nome da Semana</b>
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
                    {data && data.map((semana) => (
                        <TableRow key={semana.id}>
                            <TableCell>{semana.nome_semana}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => history.push(`/update/semana/${semana.id}`)}
                                >
                                    Alterar
                                 </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e) => handleOpenDialog(semana)}
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
  