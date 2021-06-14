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

import Disciplina from "./pages/Disciplina";
import CreateDisciplina from "./pages/CreateDisciplina";
import UpdateDisciplina from "./pages/UpdadeDisciplina";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CursoExtensao} />
        <Route path="/cursoExtensao" component={CursoExtensao} />
        <Route path="/create/cursoExtensao" component={CreateCursoExtensao} />
        <Route path="/update/cursoExtensao/:cursoExtensaoId" component={UpdateCursoExtensao}
        />

        <Route path="/cursos" component={Curso} />
        <Route path="/create/cursos" component={CreateCurso} />
        <Route path="/update/cursos/:cursoId" component={UpdateCurso} />

        <Route path="/projeto" component={Projeto} />
        <Route path="/create/projeto" component={CreateProjeto} />
        <Route path="/update/projeto/:projetoId" component={UpdateProjeto} />

        <Route path="/horario" component={Horario} />
        <Route path="/create/horario" component={CreateHorario} />
        <Route path="/update/horario/:horarioId" component={UpdateHorario} />

        <Route path="/turma" component={Turma} />
        <Route path="/create/turma" component={CreateTurma} />
        <Route path="/update/turma/:turmaId" component={UpdateTurma} />

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
