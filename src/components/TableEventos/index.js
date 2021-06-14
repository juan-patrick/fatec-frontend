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

import moment from "moment";

export default function TableEventos({ data, setData }) {
    const history = useHistory();

    const [openDel, setOpenDel] = useState(false);
    const [openShow, setOpenShow] = useState(false);
    const [eventosToDelete, setEventosToDelete] = useState({});
    const [eventosToView, setEventosToView] = useState({});
    
    const handleCloseDialogDelete = () => {
        setOpenDel(false);
        setEventosToDelete({});

    };
    const handleCloseDialogView = () => {
        setOpenShow(false);
        setEventosToView({});

    };
    const handleOpenDialogDelete = (eventos) => {
        setEventosToDelete(eventos);
        setOpenDel(true);
    };
    const handleOpenDialogShow = (eventos) => {
        setEventosToView(eventos);
        setOpenShow(true);
    };
    function strslice(str){
        if(str.length  >= 50){
            return str.slice(0,50) + "...";
        }
        else return str
    }

    const deleteEventos = async (eventosId) => {
        await api.delete(`/eventos/${eventosId}`).then(({ data }) => {
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
                <DialogTitle>Você deseja deletar este eventos?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText> Se você confirmar esta operação o evento chamado: <b>{eventosToDelete.nomeEventos}</b> será deletado PERMANENTEMENTE</DialogContentText>
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
                                    onClick={(e) => deleteEventos(eventosToDelete.id)}
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

                <DialogTitle><Typography variant="h5" align="center">{eventosToView.nomeEventos}</Typography></DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                    <Typography style={{wordWrap: "break-word"}}>Descrição do Eventos: {eventosToView.descricaoEventos}</Typography><Divider />
                        Data Inicial do evento: {moment(eventosToView.dataInicialEve).format("DD/MM/YYYY")} <Divider />
                        Data Final do evento: {moment(eventosToView.dataFimEve).format("DD/MM/YYYY")} <Divider />
                        Carga Horaria do evento(h): {eventosToView.cargaHorariaEve}h <Divider />
                        Horario Inicial do evento: {eventosToView.horarioInicialEve} <Divider />
                        Horario final do evento: {eventosToView.horarioFinalEve} <Divider />
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
                                    onClick={(e) => history.push(`/update/eventos/${eventosToView.id}`)}
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
                                <b>Nome do Evento</b>
                            </Typography>
                        </TableCell>
                        <TableCell >
                            <Typography variant="subtitle1">
                                <b>Descrição do Evento</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Data Inicial do Evento</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Data Final do Evento</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Carga Horaria do Evento(h)</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Hora de inicio do Evento(h)</b>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1">
                                <b>Hora de termino do Evento(h)</b>
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
                    {data && data.map((eventos) => (
                        <TableRow key={eventos.id} >
                            <TableCell>{eventos.nomeEventos}</TableCell>
                            <TableCell >{strslice(eventos.descricaoEventos)}</TableCell>
                            <TableCell>{moment(eventos.dataInicialEve).format("DD/MM/YYYY")}</TableCell>
                            <TableCell>{moment(eventos.dataFimEve).format("DD/MM/YYYY")}</TableCell>
                            <TableCell>{eventos.cargaHorariaEve}</TableCell>
                            <TableCell>{eventos.horarioInicialEve}</TableCell>
                            <TableCell>{eventos.horarioFinalEve}</TableCell>
                            
                            <TableCell>
                                <Button
                                    variant="contained"
                                    className={classes.buttonView}
                                    onClick={(e) => handleOpenDialogShow(eventos)}
                                >
                                    View
                                 </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e) => handleOpenDialogDelete(eventos)}
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
