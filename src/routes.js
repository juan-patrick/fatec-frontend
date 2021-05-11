import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CursoExtensao from './pages/CursoExtensao';

import Home from './pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cursos" component={CursoExtensao} />
      </Switch>
    </BrowserRouter>
  );
};