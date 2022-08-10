import React, { Component } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';

export class funcionarios extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      author: '',
      description: '',
      funcionarios: [],
      modalAberta: false
    };

    this.buscarfuncionarios = this.buscarfuncionarios.bind(this);
    this.buscarfuncionario = this.buscarfuncionario.bind(this);
    this.inserirfuncionario = this.inserirfuncionario.bind(this);
    this.atualizarfuncionario = this.atualizarfuncionario.bind(this);
    this.excluirfuncionario = this.excluirfuncionario.bind(this);
    this.renderTabela = this.renderTabela.bind(this);
    this.abrirModalInserir = this.abrirModalInserir.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
    this.atualizaAuthor = this.atualizaAuthor.bind(this);
    this.atualizaDescription = this.atualizaDescription.bind(this);
  }

  componentDidMount() {
    this.buscarfuncionarios();
  }


  buscarfuncionarios() {
    fetch('https://localhost:44313/api/Books/')
      .then(response => response.json())
      .then(data => this.setState({ funcionarios: data }));
  }
  
  
  buscarfuncionario(id) {
    fetch('https://localhost:44313/api/Books/'+ id)
      .then(response => response.json())
      .then(data => this.setState(
        {
          id: data.id,
          author: data.author,
          description: data.description
        }));
  }

  inserirfuncionario = (funcionario) => {
    fetch('https://localhost:44313/api/Books/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(funcionario)
    }).then((resposta) => {

      if (resposta.ok) {
        this.buscarfuncionarios();
        this.fecharModal();
      } else {
        alert(JSON.stringify(resposta));
      }
    }).catch(console.log);
  }

  atualizarfuncionario(funcionario) {
    fetch('https://localhost:44313/api/Books?id=' + funcionario.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(funcionario)
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarfuncionarios();
        this.fecharModal();
      } else {
        alert(JSON.stringify(resposta));
      }
    });
  }

  excluirfuncionario = (id) => {
    fetch('https://localhost:44313/api/Books/' + id, {
      method: 'DELETE',
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarfuncionarios();
        this.fecharModal();
      } else {
        alert(JSON.stringify(resposta));
      }
    });
  }

  atualizaAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  atualizaDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  abrirModalInserir() {
    this.setState({
      modalAberta: true
    })
  }

  abrirModalAtualizar(id) {
    this.setState({
      id: id,
      modalAberta: true
    });

    this.buscarfuncionario(id);
  }

  fecharModal() {
    this.setState({
      id: 0,
      author: "",
      description: "",
      modalAberta: false
    })
  }

  submit = () => {
    const funcionario = {
      id: this.state.id,
      author: this.state.author,
      description: this.state.description
    };

    if (this.state.id === 0) {
      this.inserirfuncionario(funcionario);
    } else {
      this.atualizarfuncionario(funcionario);
    }
  }

  renderModal() {
    return (
      <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Preencha os dados do funcionario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="modalForm" onSubmit={this.submit}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type='text' placeholder='Nome do funcionario' value={this.state.author} onChange={this.atualizaAuthor} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sobrenome</Form.Label>
              <Form.Control type='text' placeholder='Sobrenome' value={this.state.description} onChange={this.atualizaDescription} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.fecharModal}>
            Cancelar
      </Button>
          <Button variant="primary" form="modalForm" type="submit">
            Confirmar
      </Button>
        </Modal.Footer>
      </Modal>
    );
  }


  renderTabela() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.author}</td>
              <td>{funcionario.description}</td>
              <td>
                <div>
                  <Button variant="link" onClick={() => this.abrirModalAtualizar(funcionario.id)}>Atualizar</Button>
                  <Button variant="link" onClick={() => this.excluirfuncionario(funcionario.id)}>Excluir</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div>
        <br />
        <Button variant="primary" className="button-novo" onClick={this.abrirModalInserir}>Adicionar funcionario</Button>
        {this.renderTabela()}
        {this.renderModal()}
      </div>
    );
  }
}