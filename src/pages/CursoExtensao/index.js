import Page from '../../components/Page';
import TableCursoExtensao from '../../components/TableCursoExtensao';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';

function CursoExtensao() {
  const [cursosExtensao, setCursosExtensao] = useState([]);

  const getCursos = async () => {
    await api.get('/cursoextensao').then(({ data }) => {
      setCursosExtensao(data);
      console.log(data);
    }).catch((error) => console.log(error));
  };


  useEffect(() => {
    getCursos();
  }, [])

  return (
    <Page>
      <Typography variant="h4" gutterBottom>
        Lista de Cursos de Extensão
      </Typography>
      <TableCursoExtensao data={cursosExtensao} />
    </Page>
  );
}

export default CursoExtensao;
