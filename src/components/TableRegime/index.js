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
  
  export default function TableRegime({ data, setData }) {
    const history = useHistory();
  
    const [openDel, setOpenDel] = useState(false);
    const [openShow, setOpenShow] = useState(false);
    const [regimeToDelete, setRegimeToDelete] = useState({});
    const [regimeToView, setRegimeToView] = useState({});
  
    const handleCloseDialogDelete = () => {
      setOpenDel(false);
      setRegimeToDelete({});
    };
    const handleCloseDialogView = () => {
      setOpenShow(false);
      setRegimeToView({});
    };
    const handleOpenDialogDelete = (regime) => {
      setRegimeToDelete(regime);
      setOpenDel(true);
    };
    const handleOpenDialogShow = (regime) => {
      setRegimeToView(regime);
      setOpenShow(true);
    };
    function strslice(str) {
      if (str.length >= 50) {
        return str.slice(0, 50) + "...";
      } else return str;
    }
  
    const deleteProjeto = async (regimeId) => {
      await api
        .delete(`/regime/${regimeId}`)
        .then(({ data }) => {
          console.log(data);
          setData();
          handleCloseDialogDelete();
        })
        .catch((error) => {
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
          style={{ maxHeight: "90%" }}
        >
          <DialogTitle>Você deseja deletar este projeto?</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              {" "}
              Se você confirmar esta operação o projeto chamado:{" "}
              <b>{regimeToDelete.tipoRegime}</b> será deletado PERMANENTEMENTE
            </DialogContentText>
            <DialogActions>
              <Grid container xs={12} md={12} spacing={4} justify="flex-end">
                <Grid item>
                  <Button
                    autoFocus
                    color="primary"
                    onClick={handleCloseDialogDelete}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    className={classes.buttonDelete}
                    onClick={(e) => deleteProjeto(regimeToDelete.id)}
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
          style={{ maxHeight: "90%" }}
        >
          <DialogTitle>
            <Typography variant="h5" align="center">
              {regimeToView.tipoRegime}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              <Typography style={{ wordWrap: "break-word" }}>
                Tipo do Regime: {regimeToView.tipoRegime}
              </Typography>
            </DialogContentText>
            <DialogActions>
              <Grid container xs={12} md={12} spacing={0} justify="center">
                <Grid item>
                  <Button
                    autoFocus
                    color="primary"
                    onClick={handleCloseDialogView}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(e) =>
                      history.push(`/update/projeto/${regimeToView.id}`)
                    }
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
                  <b>tipo de Regime</b>
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
            {data &&
              data.map((regime) => (
                <TableRow key={regime.id}>
                  <TableCell>{regime.tipoRegime}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={classes.buttonView}
                      onClick={(e) => handleOpenDialogShow(regime)}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(e) => handleOpenDialogDelete(regime)}
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
    buttonView: {
      backgroundColor: theme.palette.success.main,
      color: "#fff",
    },
  }));
  