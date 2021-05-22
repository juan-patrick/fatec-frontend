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
      .delete(`/cursos/${cursoId}`)
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A
            voluptatem voluptas consequuntur adipisci soluta fuga molestias
            voluptate praesentium, distinctio nesciunt nam veniam repudiandae
            sint mollitia illum veritatis ipsa ratione deleniti!
          </DialogContentText>
          <DialogContentText>
            <b>
              O curso que será removido é: {cursoToDelete.nome_extensao || ""}
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
                <TableCell>{curso.nome_curso}</TableCell>
                <TableCell>{curso.descricao_curso}</TableCell>
                <TableCell>{curso.duracao_curso}h</TableCell>
                <TableCell>{curso.cod_mec}</TableCell>
                <TableCell>
                  {curso.situacao_curso ? "Ativo" : "Desativado"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => history.push(`/update/cursos/${curso.id}`)}
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
