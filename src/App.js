import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sobre from './componentes/sobre';
import Main from './componentes/main';
import Equipo from './componentes/equipo';
import ListaProductos from './componentes/lista-productos';
import BasicModal from './componentes/modal';
import PokemonList from './componentes/pokemon-list';
import RickAndMortyList from './componentes/rick-and-morty-list';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/sobre' element={ <Sobre nombre="ABC"/>  }  />
        <Route path='/equipo' element={ <Equipo /> } />
        <Route path='/lista' element= { <ListaProductos/> } />
        <Route path='/modal' element= { <BasicModal/> } />
        <Route path='/poke' element= { <PokemonList/>} />
        <Route path='/rym' element= { <RickAndMortyList/>} />
      </Routes>
    </Router>
  );
}

export default App;
