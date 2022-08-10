import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Home } from './components/Home';
import {funcionarios} from './components/Funcionarios';

function App() {
  return (
    <Container className="Container">
      <BrowserRouter>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand as={Link} to="/">CRUD Funcionarios</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to="/">Ínicio</Nav.Link>
              <NavDropdown title='Cadastros' id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/funcionarios'>funcionarios</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/funcionarios" component={funcionarios} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
