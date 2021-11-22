import React from 'react'; // importando react
import ReactDOM from 'react-dom'; // para manipular arvore de elementos

import App from './App';

// renderizando App para div com id root no index.html
ReactDOM.render(<App />, document.getElementById('root'));
// normalmente é executado apenas uma vez para falar quem é o componente global de nossa aplicação