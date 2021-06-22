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

export default function TableCurso({ data, setData }) {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [cursoToDelete, setCursoToDelete] = useState({});

  const handleCloseDialog = () => {
    setOpen(false);
    setCursoToDelete({});
  };

  const handleOpenDialog = (curso) => {
    setCursoToDelete(curso);
    setOpen(true);
  };

  const deleteCurso = async (cursoId) => {
    await api
      .delete(`/curso/${cursoId}`)
      .then(({ data }) => {
        console.log(data);
        setData();
        handleCloseDialog();
      })
      .catch((error) => {
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
        style={{ maxHeight: "90%" }}
      >
        <DialogTitle>Você deseja realmente deletar este curso?</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <b>
              O curso que será removido é: {cursoToDelete.nomeCurso || ""}
            </b>
          </DialogContentText>
          <DialogActions>
            <Grid container item xs={12} md={12} spacing={4} justify="flex-end">
              <Grid item>
                <Button autoFocus color="primary" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  className={classes.buttonDelete}
                  onClick={(e) => deleteCurso(cursoToDelete.id)}
                >
                  Excluir
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
                <b>Nome</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Descrição</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Duração</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Código Mec</b>
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
            data.map((curso) => (
              <TableRow key={curso.id}>
                <TableCell>{curso.nomeCurso}</TableCell>
                <TableCell>{curso.descricaoCurso}</TableCell>
                <TableCell>{curso.duracaoCurso}h</TableCell>
                <TableCell>{curso.codMec}</TableCell>
                <TableCell>
                  {curso.situacaoCurso ? "Ativo" : "Desativado"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => history.push(`/update/curso/${curso.id}`)}
                  >
                    Alterar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleOpenDialog(curso)}
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
