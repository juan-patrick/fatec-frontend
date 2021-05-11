import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, Button, Divider, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

export default function TableCursoExtensao({ data }) {

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1"><b>Nome</b></Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1"><b>Tipo</b></Typography>
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
          {data && data.map(curso => (
            <TableRow key={curso.id}>
              <TableCell>
                {curso.nome_extensao}
              </TableCell>
              <TableCell>
                {curso.tipo_extensao}
              </TableCell>
              <TableCell>
                {curso.status ? 'Ativo' : 'Desativado'}
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary">Alterar</Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="secondary">Deletar</Button>
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
}));