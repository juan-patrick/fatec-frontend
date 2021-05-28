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

export default function Tableprojeto({ data, setData }) {
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [projetoToDelete, setProjetoToDelete] = useState({});

    const handleCloseDialog = () => {
        setOpen(false);
        setProjetoToDelete({});
    };
    const handleOpenDialog = (projeto) =>{
        setProjetoToDelete(projeto);
        setOpen(true);
    }

    const deleteProjeto = async (projetoId) => {
        await api.delete(`/projeto/${projetoId}`).then(({ data }) => {
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
                <DialogTitle>Você deseja deletar este projeto?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText> Se você confirmar esta operação o projeto chamado: <b>{projetoToDelete.nome_projetos}</b> será deletado PERMANENTEMENTE</DialogContentText>
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
                                    onClick={(e) => deleteProjeto(projetoToDelete.id)}
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
                                <b>Nome do Projeto</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Descrição do Projeto</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Data Inicial do Projeto</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Data Final do Projeto</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Carga Horaria do Projeto(h)</b>
                            </Typography>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Typography variant="subtitle1">
                                <b>Situação</b>
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
                    {data && data.map((projeto) => (
                        <TableRow key={projeto.id}>
                            <TableCell>{projeto.nome_projetos}</TableCell>
                            <TableCell>{projeto.descricao_projetos}</TableCell>
                            <TableCell>{projeto.data_ini}</TableCell>
                            <TableCell>{projeto.data_fim}</TableCell>
                            <TableCell>{projeto.carga_horaria}</TableCell>
                            <TableCell>{projeto.status ? "Ativo" : "Inativo"}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => history.push(`/update/projeto/${projeto.id}`)}
                                >
                                    Alterar
                                 </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e) => handleOpenDialog(projeto)}
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
  