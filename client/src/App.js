import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Homepage from "./Homepage";
import GlobalStyles from './GlobalStyle';

function App() {
  return (
    <>
    <Router>
    <GlobalStyles/>
    <Routes>
      <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
