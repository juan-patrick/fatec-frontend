import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CursoExtensao from './pages/CursoExtensao';

import CustomThemeProvider from './providers/CustomThemeProvider';

import Home from './pages/Home';
import CreateCurso from './pages/CreateCurso';
import UpdateCurso from './pages/UpdateCurso';

export default function Routes() {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cursos" component={CursoExtensao} />
          <Route path="/create/cursos" component={CreateCurso} />
          <Route path="/update/cursos/:cursoId" component={UpdateCurso} />
        </Switch>
      </BrowserRouter>
    </CustomThemeProvider>
  );
};