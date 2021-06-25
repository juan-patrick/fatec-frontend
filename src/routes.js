import { BrowserRouter, Route, Switch } from "react-router-dom";

import EmpregoPublico from "./pages/EmpregoPublico";
import CreateEmpregoPublico from "./pages/CreateEmpregoPublico";
import UpdateEmpregoPublico from "./pages/UpdateEmpregoPublico";

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
import Titulacao from "./pages/Titulacao";
import CreateTitulacao from "./pages/CreateTitulacao";
import UpdateTitulacao from "./pages/UpdateTitulacao";

import TipoContrato from "./pages/TipoContrato";
import CreateTipoContrato from "./pages/CreateTipoContrato";
import UpdateTipoContrato from "./pages/UpdateTipoContrato";

import Login from "./pages/Login";
// GRUPO 4
import { ListSemana, CreateSemana, UpdateSemana } from "./pages/Semana"
import { ListPeriodo, CreatePeriodo, UpdatePeriodo } from "./pages/Periodo"


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
          <Route path="/" exact component={CursoExtensao} />
          <PrivateRoute path="/login" component={Login} permission={1} />
          <PrivateRoute path="/cursoExtensao" component={CursoExtensao} permission={1} />
          <PrivateRoute path="/create/cursoExtensao" component={CreateCursoExtensao} permission={1} />
          <PrivateRoute path="/update/cursoExtensao/:cursoExtensaoId" component={UpdateCursoExtensao} permission={1}
          />

          <PrivateRoute path="/curso" component={Curso} permission={1} />
          <PrivateRoute path="/create/curso" component={CreateCurso} permission={1} />
          <PrivateRoute path="/update/curso/:cursoId" component={UpdateCurso} permission={1} />

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
          <PrivateRoute path="/update/vinculos/:vinculoId" component={UpdateVinculo} permission={1} />
          <PrivateRoute path="/update/turma/:turmaId" component={UpdateTurma} permission={1} />

          <PrivateRoute path="/semana" component={ListSemana} permission={1} />
          <PrivateRoute path="/create/semana" component={CreateSemana} permission={1} />
          <PrivateRoute path="/update/semana/:semanaId" component={UpdateSemana} permission={1} />

          <PrivateRoute path="/periodo" component={ListPeriodo} permission={1} />
          <PrivateRoute path="/create/periodo" component={CreatePeriodo} permission={1} />
          <PrivateRoute path="/update/periodo/:periodoId" component={UpdatePeriodo} permission={1} />

          <PrivateRoute path="/disciplina" component={Disciplina} permission={1} />
          <PrivateRoute path="/create/disciplina" component={CreateDisciplina} permission={1} />
          <PrivateRoute path="/update/disciplina/:disciplinaId" component={UpdateDisciplina} permission={1} />

          <PrivateRoute path="/empregoPublico" component={EmpregoPublico} permission={1} />
          <PrivateRoute path="/create/empregoPublico" component={CreateEmpregoPublico} permission={1} />
          <PrivateRoute path="/update/empregoPublico/:empregoPublicoId" component={UpdateEmpregoPublico} permission={1} />

          <PrivateRoute path="/titulacao" component={Titulacao} permission={1} />
          <PrivateRoute path="/create/titulacao" component={CreateTitulacao} permission={1} />
          <PrivateRoute path="/update/titulacao/:titulacaoId" component={UpdateTitulacao} permission={1} />

          <PrivateRoute path="/tipoContrato" component={TipoContrato} permission={1} />
          <PrivateRoute path="/create/tipoContrato" component={CreateTipoContrato} permission={1} />
          <PrivateRoute path="/update/tipoContrato/:tipoContratoId" component={UpdateTipoContrato} permission={1} />

        </Switch>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
