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
  const [matrizToDelete, setMatrizToDelete] = useState({});
  const [matrizToView, setMatrizToView] = useState({});

  const handleCloseDialogDelete = () => {
    setOpenDel(false);
    setMatrizToDelete({});
  };
  const handleOpenDialogDelete = (matriz) => {
    setMatrizToDelete(matriz);
    setOpenDel(true);
  };

  const deleteDisciplina = async (matrizId) => {
    await api
      .delete(`/matriz/${matrizId}`)
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
        <DialogTitle>Você deseja deletar esta matriz?</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {" "}
            Se você confirmar esta operação o projeto chamado:{" "}
            <b>{matrizToDelete.nomeDisciplina}</b> será deletado PERMANENTEMENTE
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
                  onClick={(e) => deleteDisciplina(matrizToDelete.id)}
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
                <b>Descrição da Matriz</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Ano da Matriz</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Status da Matriz</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Periodo Letivo</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Turno Funcionamento</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Prazo Integralizacao Minima</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Prazo Integralizacao Maxima</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Regime Matricula</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Competencia Especificas</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Competencias Gerais</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Competencia</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Forma de Acesso</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">
                <b>Ementa da Matriz</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Eixo Tecnologico</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Perfil Profissional</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1">
                <b>Areas de Atuacao</b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((matriz) => (
              <TableRow key={matriz.id}>
                <TableCell>{matriz.descricaoMatriz}</TableCell>
                <TableCell>{matriz.anoMatriz}</TableCell>
                <TableCell>{matriz.statusMatriz}</TableCell>
                <TableCell>{matriz.duracaoHoraAula}</TableCell>
                <TableCell>{matriz.periodoLetivo}</TableCell>
                <TableCell>{matriz.turnoFuncionamento}</TableCell>
                <TableCell>{matriz.prazoIntegralizacaoMin}</TableCell>
                <TableCell>{matriz.prazoIntegralizacaoMax}</TableCell>
                <TableCell>{matriz.regimeMatricula}</TableCell>
                <TableCell>{matriz.competenciaEspecificas}</TableCell>
                <TableCell>{matriz.competenciasGerais}</TableCell>
                <TableCell>{matriz.competencia}</TableCell>
                <TableCell>{matriz.formaAcesso}</TableCell>
                <TableCell>{matriz.eixoTecnologico}</TableCell>
                <TableCell>{matriz.perfilProfissional}</TableCell>
                <TableCell>{matriz.areasAtuacao}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(e) => history.push(`/update/matriz/${matriz.id}`)}
                  >
                    Alterar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleOpenDialogDelete(matriz)}
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
