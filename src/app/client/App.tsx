import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Body from './components/Body';
declare let module: any;

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Body />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}