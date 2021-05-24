import { BrowserRouter, Route, Switch } from "react-router-dom";

import CursoExtensao from "./pages/CursoExtensao";

import Home from "./pages/Home";
import CreateCursoExtensao from "./pages/CreateCursoExtensao";
import UpdateCursoExtensao from "./pages/UpdateCursoExtensao";
import CreateCurso from "./pages/CreateCurso";
import UpdateCurso from "./pages/UpdateCurso";
import Curso from "./pages/Curso";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cursos-extensao" component={CursoExtensao} />
        <Route path="/create/cursos-extensao" component={CreateCursoExtensao} />
        <Route
          path="/update/cursos-extensao/:cursoId"
          component={UpdateCursoExtensao}
        />
        <Route path="/cursos" component={Curso} />
        <Route path="/create/cursos" component={CreateCurso} />
        <Route path="/update/cursos/:cursoId" component={UpdateCurso} />
      </Switch>
    </BrowserRouter>
  );
}
