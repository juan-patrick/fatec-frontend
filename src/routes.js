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

import Login from "./pages/Login";
// GRUPO 4
import { ListSemana, CreateSemana, UpdateSemana } from "./pages/Semana"
import { ListPeriodo, CreatePeriodo, UpdatePeriodo } from "./pages/Periodo"


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CursoExtensao} />
        <Route path="/login" component={Login} />
        <Route path="/cursoExtensao" component={CursoExtensao} />
        <Route path="/create/cursoExtensao" component={CreateCursoExtensao} />
        <Route path="/update/cursoExtensao/:cursoExtensaoId" component={UpdateCursoExtensao}
        />

        <Route path="/curso" component={Curso} />
        <Route path="/create/curso" component={CreateCurso} />
        <Route path="/update/curso/:cursoId" component={UpdateCurso} />

        <Route path="/projeto" component={Projeto} />
        <Route path="/create/projeto" component={CreateProjeto} />
        <Route path="/update/projeto/:projetoId" component={UpdateProjeto} />

        <Route path="/matriz" component={Matriz} />
        <Route path="/create/matriz" component={CreateMatriz} />
        <Route path="/update/matriz/:matrizId" component={UpdateMatriz} />

        <Route path="/horario" component={Horario} />
        <Route path="/create/horario" component={CreateHorario} />
        <Route path="/update/horario/:horarioId" component={UpdateHorario} />

        <Route path="/turma" component={Turma} />
        <Route path="/create/turma" component={CreateTurma} />
        <Route path="/update/turma/:turmaId" component={UpdateTurma} />

        <Route path="/professores" component={Professor} />
        <Route path="/create/professores" component={CreateProfessor} />
        <Route path="/update/professores/:professorId" component={UpdateProfessor} />

        <Route path="/inatividades" component={Inatividade} />
        <Route path="/create/inatividades" component={CreateInatividade} />
        <Route path="/update/inatividades/:inatividadeId" component={UpdateInatividade} />

        <Route path="/vinculos" component={Vinculo} />
        <Route path="/create/vinculos" component={CreateVinculo} />
        <Route path="/update/vinculos/:vinculoId" component={UpdateVinculo} />
        <Route path="/update/vinculos/:vinculoId" component={UpdateVinculo} />
        <Route path="/update/turma/:turmaId" component={UpdateTurma} />

        <Route path="/semana" component={ListSemana} />
        <Route path="/create/semana" component={CreateSemana} />
        <Route path="/update/semana/:semanaId" component={UpdateSemana} />

        <Route path="/periodo" component={ListPeriodo} />
        <Route path="/create/periodo" component={CreatePeriodo} />
        <Route path="/update/periodo/:periodoId" component={UpdatePeriodo} />

        <Route path="/disciplina" component={Disciplina} />
        <Route path="/create/disciplina" component={CreateDisciplina} />
        <Route
          path="/update/disciplina/:disciplinaId"
          component={UpdateDisciplina}
        />
      </Switch>
    </BrowserRouter>
  );
}
