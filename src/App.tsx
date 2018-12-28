import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import rxjs from 'rxjs';
import getRoutes from './routes';
import { ModuleInfo } from './redux/append-reducer';

type Props = {
  loadedChunkNames?: string[];
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void;
  epicSubject$?: rxjs.BehaviorSubject<any>;
};

const App = (props: Props) => (
  <Switch>
    {getRoutes(props.loadedChunkNames, props.appendAsyncReducer, props.epicSubject$).map(
      (route, key: number) => {
        const { loadData, ...routeProps } = route;
        return <Route key={key} {...routeProps} />;
      }
    )}
  </Switch>
);

App.displayName = 'App';

export default hot(App);