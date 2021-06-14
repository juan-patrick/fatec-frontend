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

export default function TableCursoExtensao({ data, setData }) {
  const history = useHistory();

  const [openDel, setOpenDel] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  const [cursoExtensaoToDelete, setCursoExtensaoToDelete] = useState({});
  const [cursoExtensaoToView, setCursoExtensaoToView] = useState({});

  const handleCloseDialogDelete = () => {
    setOpenDel(false);
    setCursoExtensaoToDelete({});
  };
  const handleCloseDialogView = () => {
    setOpenShow(false);
    setCursoExtensaoToView({});
  };
  const handleOpenDialogDelete = (cursoExtensao) => {
    setCursoExtensaoToDelete(cursoExtensao);
    setOpenDel(true);
  };
  const handleOpenDialogShow = (cursoExtensao) => {
    setCursoExtensaoToView(cursoExtensao);
    setOpenShow(true);
  };
  function strslice(str) {
    if (str.length >= 50) {
      return str.slice(0, 50) + "...";
    } else return str;
  }

  const deleteCursoExtensao = async (cursoExtensaoId) => {
    await api
      .delete(`/cursoExtensao/${cursoExtensaoId}`)
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
        <DialogTitle>Você deseja deletar este Curso de extensão?</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {" "}
            Se você confirmar esta operação o projeto chamado:{" "}
            <b>{cursoExtensaoToDelete.nomeExtensao}</b> será deletado
            PERMANENTEMENTE
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
                  onClick={(e) => deleteCursoExtensao(cursoExtensaoToDelete.id)}
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
            {cursoExtensaoToView.nomeExtensao}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <Typography style={{ wordWrap: "break-word" }}>
              Nome do curso de extensão: {cursoExtensaoToView.nomeExtensao}
            </Typography>
            <Divider />
            Tipo do curso de extensão: {cursoExtensaoToView.tipoExtensao}{" "}
     
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
                    history.push(
                      `/update/cursoExtensao/${cursoExtensaoToView.id}`
                    )
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
                <b>Nome do Curso de Extensão</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Tipo do Curso de Extensão</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
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
            data.map((cursoExtensao) => (
              <TableRow key={cursoExtensao.id}>
                <TableCell>{cursoExtensao.nomeExtensao}</TableCell>
                <TableCell>{strslice(cursoExtensao.tipoExtensao)}</TableCell>                            
                <TableCell>
                  <Button
                    variant="contained"
                    className={classes.buttonView}
                    onClick={(e) => handleOpenDialogShow(cursoExtensao)}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleOpenDialogDelete(cursoExtensao)}
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
