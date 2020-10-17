import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Entrance from './components/Entrance';
declare let module: any

ReactDOM.render(<Entrance />,

document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}