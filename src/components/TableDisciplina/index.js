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

export default function TableDisciplina({ data, setData }) {
  const history = useHistory();

  const [openDel, setOpenDel] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  const [disciplinaToDelete, setDisciplinaToDelete] = useState({});
  const [disciplinaToView, setDisciplinaToView] = useState({});

  const handleCloseDialogDelete = () => {
    setOpenDel(false);
    setDisciplinaToDelete({});
  };
  const handleCloseDialogView = () => {
    setOpenShow(false);
    setDisciplinaToView({});
  };
  const handleOpenDialogDelete = (disciplina) => {
    setDisciplinaToDelete(disciplina);
    setOpenDel(true);
  };
  const handleOpenDialogShow = (disciplina) => {
    setDisciplinaToView(disciplina);
    setOpenShow(true);
  };
  function strslice(str) {
    if (str.length >= 50) {
      return str.slice(0, 50) + "...";
    } else return str;
  }

  const deleteDisciplina = async (disciplinaId) => {
    await api
      .delete(`/disciplina/${disciplinaId}`)
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
        <DialogTitle>Você deseja deletar esta disciplina?</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {" "}
            Se você confirmar esta operação o projeto chamado:{" "}
            <b>{disciplinaToDelete.nomeDisciplina}</b> será deletado
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
                  onClick={(e) => deleteDisciplina(disciplinaToDelete.id)}
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
            {disciplinaToView.nomeDisciplina}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <Typography style={{ wordWrap: "break-word" }}>
              nome da disciplina: {disciplinaToView.nomeDisciplina}
            </Typography>
            <Divider />
            Descrição da Disciplina: {
              disciplinaToView.descricaoDisciplina
            }h <Divider />
            Carga Horaria do projeto(h): {disciplinaToView.cargaHoraria}h{" "}
            <Divider />
            Objetivo da Disciplina: {disciplinaToView.objetivoDisciplina}h{" "}
            <Divider />
            Ementa da Disciplina: {disciplinaToView.ementaDisciplina}h{" "}
            <Divider />
            Referência Básica da Disciplina:{" "}
            {disciplinaToView.refenciaBasicaDisciplina}h <Divider />
            Referência Complementar da Disciplina:{" "}
            {disciplinaToView.refenciaComplementarDisciplina}h <Divider />
            Codigo Siga: {disciplinaToView.codSigaDisciplina}h <Divider />
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
                    history.push(`/update/disciplina/${disciplinaToView.id}`)
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
                <b>Nome da Disciplina</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Descrição da Disciplina</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Carga Horaria do Projeto(h)</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Objetivo da Disciplina</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Ementa da Disciplina</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Referência Basica da Disciplina</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Referência Complementar da Disciplina</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Codigo Siga da Disciplina</b>
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
            data.map((disciplina) => (
              <TableRow key={disciplina.id}>
                <TableCell>{disciplina.nomeDisciplina}</TableCell>
                <TableCell>
                  {strslice(disciplina.descricaoDisciplina)}
                </TableCell>
                <TableCell>{disciplina.cargaHoraria}</TableCell>
                <TableCell>{disciplina.objetivoDisciplina}</TableCell>
                <TableCell>{disciplina.ementaDisciplina}</TableCell>
                <TableCell>{disciplina.refenciaBasicaDisciplina}</TableCell>
                <TableCell>{disciplina.refenciaComplementarDisciplina}</TableCell>
                <TableCell>{disciplina.codSigaDisciplina}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    className={classes.buttonView}
                    onClick={(e) => handleOpenDialogShow(disciplina)}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleOpenDialogDelete(disciplina)}
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
