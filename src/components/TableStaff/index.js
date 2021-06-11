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

export default function TableStaff({ data, setData }) {
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [staffToDelete, setStaffToDelete] = useState({});

    const handleCloseDialog = () => {
        setOpen(false);
        setStaffToDelete({});
    };
    const handleOpenDialog = (staff) =>{
        setStaffToDelete(staff);
        setOpen(true);
    }

    const deleteStaff = async (staffId) => {
        await api.delete(`/staff/${staffId}`).then(({ data }) => {
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
                <DialogTitle>Você deseja deletar este staff?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText> Se você confirmar esta operação o staff será deletado PERMANENTEMENTE</DialogContentText>
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
                                    onClick={(e) => deleteStaff(staffToDelete.id)}
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
                                <b>Nome da Staff</b>
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
                    {data && data.map((staff) => (
                        <TableRow key={staff.id}>
                            <TableCell>{staff.nomeStaff}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => history.push(`/update/staff/${staff.id}`)}
                                >
                                    Alterar
                                 </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e) => handleOpenDialog(staff)}
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
  