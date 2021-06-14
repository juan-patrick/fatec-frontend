import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import { useState } from 'react';

import api from '../../services/api';

export default function TableVinculo({ data, setData }) {
  
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [vinculoToDelete, setVinculoToDelete] = useState({});

  const handleCloseDialog = () => {
    setOpen(false);
    setVinculoToDelete({});
  };

  const handleOpenDialog = (vinculo) => {
    setVinculoToDelete(vinculo);
    setOpen(true);
  };

  const deleteVinculo = async (vinculoId) => {
    await api.delete(`/vinculos/${vinculoId}`).then(({ data }) => {
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
          Você deseja realmente deletar este vinculo?
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A voluptatem voluptas consequuntur adipisci soluta fuga molestias voluptate praesentium, distinctio nesciunt nam veniam repudiandae sint mollitia illum veritatis ipsa ratione deleniti!
          </DialogContentText>
          <DialogContentText>
            <b>A inatividade que será removida é: {vinculoToDelete.nome_vinculo || ''}</b>
          </DialogContentText>
          <DialogActions>
            <Grid container item xs={12} md={12} spacing={4} justify="flex-end">
              <Grid item>
                <Button autoFocus color="primary" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" className={classes.buttonDelete} onClick={e => deleteVinculo(vinculoToDelete.id)}>
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
              <Typography variant="subtitle1"><b>Nome</b></Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1"><b>Status</b>
              </Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1"><b>Ações</b></Typography>
            </TableCell>
          </TableRow>

        </TableHead>
        <TableBody>
          {data && data.map(vinculo => (
            <TableRow key={vinculo.id}>
              <TableCell>
                {vinculo.nome_vinculo}
              </TableCell>
              <TableCell>
              <Button variant="contained" color="primary"
                  onClick={e => history.push(`/update/vinculo/${vinculo.id}`)}>Alterar</Button>
              </TableCell>
              <TableCell>
              <Button variant="contained" color="secondary" onClick={e => handleOpenDialog(vinculo)}>Deletar</Button>
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