import { BrowserRouter, Route, Switch } from "react-router-dom";

import CursoExtensao from "./pages/CursoExtensao";
import CreateCursoExtensao from "./pages/CreateCursoExtensao";
import UpdateCursoExtensao from "./pages/UpdateCursoExtensao";

import CreateCurso from "./pages/CreateCurso";
import UpdateCurso from "./pages/UpdateCurso";
import Curso from "./pages/Curso";

import Projeto from "./pages/Projeto";
import CreateProjeto from "./pages/CreateProjeto";
import UpdateProjeto from "./pages/UpdateProjeto";

import Horario from "./pages/Horario";
import CreateHorario from "./pages/CreateHorario";
import UpdateHorario from "./pages/UpdateHorario";

import Turma from "./pages/Turma";
import CreateTurma from "./pages/CreateTurma";
import UpdateTurma from "./pages/UpdateTurma";

import CreateProfessor from './pages/CreateProfessor';
import UpdateProfessor from './pages/UpdateProfessor';
import Professor from './pages/Professor';

import CreateInatividade from './pages/CreateInatividade';
import UpdateInatividade from './pages/UpdateInatividade';
import Inatividade from './pages/Inatividade';

import CreateVinculo from './pages/CreateVinculo';
import UpdateVinculo from './pages/UpdateVinculo';
import Vinculo from './pages/Vinculo';

import Disciplina from "./pages/Disciplina";
import CreateDisciplina from "./pages/CreateDisciplina";
import UpdateDisciplina from "./pages/UpdadeDisciplina";

import Matriz from "./pages/Matriz";
import CreateMatriz from "./pages/CreateMatriz";
import UpdateMatriz from "./pages/UpdateMatriz";

import PrivateRoute from "./components/PrivateRoute";

import { SnackbarProvider } from "notistack";

import Login from "./pages/Login";

export default function Routes() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} permission={1} />
          <PrivateRoute path="/" exact component={CursoExtensao} />
          <PrivateRoute path="/cursoExtensao" component={CursoExtensao} permission={1} />
          <PrivateRoute path="/create/cursoExtensao" component={CreateCursoExtensao} permission={1} />
          <PrivateRoute path="/update/cursoExtensao/:cursoExtensaoId" component={UpdateCursoExtensao}  permission={1}
          />

          <PrivateRoute path="/cursos" component={Curso} permission={1} />
          <PrivateRoute path="/create/cursos" component={CreateCurso} permission={1} />
          <PrivateRoute path="/update/cursos/:cursoId" component={UpdateCurso} permission={1} />

          <PrivateRoute path="/projeto" component={Projeto} permission={1} />
          <PrivateRoute path="/create/projeto" component={CreateProjeto} permission={1} />
          <PrivateRoute path="/update/projeto/:projetoId" component={UpdateProjeto} permission={1} />

          <PrivateRoute path="/matriz" component={Matriz} permission={1} />
          <PrivateRoute path="/create/matriz" component={CreateMatriz} permission={1} />
          <PrivateRoute path="/update/matriz/:matrizId" component={UpdateMatriz} permission={1} />

          <PrivateRoute path="/horario" component={Horario} permission={1} />
          <PrivateRoute path="/create/horario" component={CreateHorario} permission={1} />
          <PrivateRoute path="/update/horario/:horarioId" component={UpdateHorario} permission={1} />

          <PrivateRoute path="/turma" component={Turma} permission={1} />
          <PrivateRoute path="/create/turma" component={CreateTurma} permission={1} />
          <PrivateRoute path="/update/turma/:turmaId" component={UpdateTurma} permission={1} />

          <PrivateRoute path="/professores" component={Professor} permission={1} />
          <PrivateRoute path="/create/professores" component={CreateProfessor} permission={1} />
          <PrivateRoute path="/update/professores/:professorId" component={UpdateProfessor} permission={1} />

          <PrivateRoute path="/inatividades" component={Inatividade} permission={1} />
          <PrivateRoute path="/create/inatividades" component={CreateInatividade} permission={1} />
          <PrivateRoute path="/update/inatividades/:inatividadeId" component={UpdateInatividade} permission={1} />

          <PrivateRoute path="/vinculos" component={Vinculo} permission={1} />
          <PrivateRoute path="/create/vinculos" component={CreateVinculo} permission={1} />
          <PrivateRoute path="/update/vinculos/:vinculoId" component={UpdateVinculo} permission={1} />

          <PrivateRoute path="/disciplina" component={Disciplina} permission={1} />
          <PrivateRoute path="/create/disciplina" component={CreateDisciplina} permission={1} />
          <PrivateRoute permission={1}
            path="/update/disciplina/:disciplinaId"
            component={UpdateDisciplina}
          />
        </Switch>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
