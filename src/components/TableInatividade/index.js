import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import { useState } from 'react';

import api from '../../services/api';

export default function TableInatividade({ data, setData }) {
  
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [inatividadeToDelete, setInatividadeToDelete] = useState({});

  const handleCloseDialog = () => {
    setOpen(false);
    setInatividadeToDelete({});
  };

  const handleOpenDialog = (inatividade) => {
    setInatividadeToDelete(inatividade);
    setOpen(true);
  };

  const deleteInatividade = async (inatividadeId) => {
    await api.delete(`/inatividades/${inatividadeId}`).then(({ data }) => {
      console.log(data);
      setData();
      handleCloseDialog();
    }).catch(error => {
      console.log(error);
      handleCloseDialog();
    });
  }

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Dialog open={open} disableBackdropClick disableEscapeKeyDown style={{ maxHeight: '90%' }}>
        <DialogTitle>
          Você deseja realmente deletar esta inatividade?
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Se você confirma esta operação o registro desta inatividade será deletado PERMANENTEMENTE
          </DialogContentText>
          <DialogContentText>
            <b>A inatividade que será removida é: {inatividadeToDelete.motivo || ''}</b>
          </DialogContentText>
          <DialogActions>
            <Grid container item xs={12} md={12} spacing={4} justify="flex-end">
              <Grid item>
                <Button autoFocus color="primary" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" className={classes.buttonDelete} onClick={e => deleteInatividade(inatividadeToDelete.id)}>
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
              <Typography variant="subtitle1"><b>Motivo da Inatividade</b></Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1"><b>Data de Início</b></Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1"><b>Data fim</b></Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1"><b>Status</b>
              </Typography>
            </TableCell>
          </TableRow>

        </TableHead>
        <TableBody>
          {data && data.map(inatividade => (
            <TableRow key={inatividade.id}>
              <TableCell>
                {inatividade.motivo}
              </TableCell>
              <TableCell>
                {inatividade.dataInicio}
              </TableCell>
              <TableCell>
                {inatividade.dataFim}
              </TableCell>
              <TableCell>
              <Button variant="contained" color="primary"
                  onClick={e => history.push(`/update/inatividade/${inatividade.id}`)}>Alterar</Button>
              </TableCell>
              <TableCell>
              <Button variant="contained" color="secondary" onClick={e => handleOpenDialog(inatividade)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    minHeight: 400,
  },
  buttonDelete: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));