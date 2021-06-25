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
  
  export default function TableTipoContrato({ data, setData }) {
    const history = useHistory();
  
    const [openDel, setOpenDel] = useState(false);
    const [openShow, setOpenShow] = useState(false);
    const [tipoContratoToDelete, setTipoContratoToDelete] = useState({});
    const [tipoContratoToView, setTipoContratoToView] = useState({});
  
    const handleCloseDialogDelete = () => {
      setOpenDel(false);
      setTipoContratoToDelete({});
    };
    const handleCloseDialogView = () => {
      setOpenShow(false);
      setTipoContratoToView({});
    };
    const handleOpenDialogDelete = (tipoContrato) => {
      setTipoContratoToDelete(tipoContrato);
      setOpenDel(true);
    };
    const handleOpenDialogShow = (tipoContrato) => {
      setTipoContratoToView(tipoContrato);
      setOpenShow(true);
    };
    function strslice(str) {
      if (str.length >= 50) {
        return str.slice(0, 50) + "...";
      } else return str;
    }
  
    const deleteTipoContrato= async (tipoContratoId) => {
      await api
        .delete(`/tipoContrato/${tipoContratoId}`)
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
          <DialogTitle>Você deseja deletar esse Contrato?</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              {" "}
              Se você confirmar esta operação o projeto chamado:{" "}
              <b>{tipoContratoToDelete.tipoContrato}</b> será deletado PERMANENTEMENTE
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
                    onClick={(e) => deleteTipoContrato(tipoContratoToDelete.id)}
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
              {tipoContratoToView.tipoContrato}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              <Typography style={{ wordWrap: "break-word" }}>
              TipoContrato: {tipoContratoToView.tipoContrato}
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
                      history.push(`/update/tipoContrato/${tipoContratoToView.id}`)
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
                  <b>Tipo Contrato</b>
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
              data.map((tipoContrato) => (
                <TableRow key={tipoContrato.id}>
                  <TableCell>{tipoContrato.tipoContrato}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={classes.buttonView}
                      onClick={(e) => handleOpenDialogShow(tipoContrato)}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(e) => handleOpenDialogDelete(tipoContrato)}
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
  