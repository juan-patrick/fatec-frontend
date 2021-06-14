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
    Divider,
} from "@material-ui/core";


import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

import { useState } from "react";

import api from "../../services/api";
import moment from "moment"

export default function Tableprojeto({ data, setData }) {
    const history = useHistory();

    const [openDel, setOpenDel] = useState(false);
    const [openShow, setOpenShow] = useState(false);
    const [projetoToDelete, setProjetoToDelete] = useState({});
    const [projetoToView, setProjetoToView] = useState({});
    
    const handleCloseDialogDelete = () => {
        setOpenDel(false);
        setProjetoToDelete({});

    };
    const handleCloseDialogView = () => {
        setOpenShow(false);
        setProjetoToView({});

    };
    const handleOpenDialogDelete = (projeto) => {
        setProjetoToDelete(projeto);
        setOpenDel(true);
    };
    const handleOpenDialogShow = (projeto) => {
        setProjetoToView(projeto);
        setOpenShow(true);
    };
    function strslice(str){
        if(str.length  >= 50){
            return str.slice(0,50) + "...";
        }
        else return str
    }

    const deleteProjeto = async (projetoId) => {
        await api.delete(`/projeto/${projetoId}`).then(({ data }) => {
            console.log(data);
            setData();
            handleCloseDialogDelete();
        }).catch((error) => {
            console.log(error);
            handleCloseDialogDelete();
        });
    };


    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Dialog
                open={openDel}
                disableBackdropClick
                disableEscapeKeyDown
                style={{ maxHeight: "90%" }}>
                <DialogTitle>Você deseja deletar este projeto?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText> Se você confirmar esta operação o projeto chamado: <b>{projetoToDelete.nome_projetos}</b> será deletado PERMANENTEMENTE</DialogContentText>
                    <DialogActions>
                        <Grid container xs={12} md={12} spacing={4} justify="flex-end">
                            <Grid item>
                                <Button autoFocus color="primary" onClick={handleCloseDialogDelete}>
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
            <Dialog
                open={openShow}
                disableBackdropClick
                disableEscapeKeyDown
                style={{ maxHeight: "90%" }}>

                <DialogTitle><Typography variant="h5" align="center">{projetoToView.nomeProjetos}</Typography></DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                    <Typography style={{wordWrap: "break-word"}}>Descrição do Projeto: {projetoToView.descricaoProjetos}</Typography><Divider />
                        Data Inicial do projeto: {moment(projetoToView.dataInicial).format('DD/MM/YYYY')} <Divider />
                        Data Final do projeto: {moment(projetoToView.dataFim).format('DD/MM/YYYY')} <Divider />
                        Carga Horaria do projeto(h): {projetoToView.cargaHoraria}h <Divider />
                        Situação do projeto: {projetoToView.situacaoProjetos ? "Ativo" : "Inativo"}
                    </DialogContentText>
                    <DialogActions>
                        <Grid container xs={12} md={12} spacing={0} justify="center">
                            <Grid item>
                                <Button autoFocus color="primary" onClick={handleCloseDialogView}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={(e) => history.push(`/update/projeto/${projetoToView.id}`)}
                                >
                                    Alterar
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
                        <TableCell >
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
                <TableBody >
                    {data && data.map((projeto) => (
                        <TableRow key={projeto.id} >
                            <TableCell>{projeto.nomeProjetos}</TableCell>
                            <TableCell >{strslice(projeto.descricaoProjetos)}</TableCell>
                            <TableCell>{moment(projeto.dataInicial).format('DD/MM/YYYY')}</TableCell>
                            <TableCell>{moment(projeto.dataFim).format('DD/MM/YYYY')}</TableCell>
                            <TableCell>{projeto.cargaHoraria}</TableCell>
                            <TableCell>{projeto.situacaoProjetos ? "Ativo" : "Inativo"}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    className={classes.buttonView}
                                    onClick={(e) => handleOpenDialogShow(projeto)}
                                >
                                    View
                                 </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e) => handleOpenDialogDelete(projeto)}
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
    buttonView:{
        backgroundColor: theme.palette.success.main,
        color: "#fff",


    },

}));
