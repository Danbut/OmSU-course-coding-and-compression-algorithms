import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Huffman from './components/Huffman';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HUFFMAN} component={Huffman} />
        <Route path={routes.MENU} component={HomePage} />
      </Switch>
    </App>
  );
}
