import { BrowserRouter, Route, Switch } from "react-router-dom";

import { SnackbarProvider } from 'notistack';

import ValidationProvider from './providers/ValidationProvider';

import CursoExtensao from "./pages/CursoExtensao";
import Home from "./pages/Home";
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
import Login from "./pages/Login";

export default function Routes() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <ValidationProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/cursos-extensao" component={CursoExtensao} />
            <Route path="/create/cursos-extensao" component={CreateCursoExtensao} />
            <Route
              path="/update/cursos-extensao/:cursoId"
              component={UpdateCursoExtensao}
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

          </Switch>
        </BrowserRouter>
      </ValidationProvider>
    </SnackbarProvider>
  );
}
