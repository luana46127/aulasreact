import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import Button from './Button'
import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:38000"
})

const App = props => {
  const [form, setForm] = useState({id:'',title:'',author:''})
  const [books, setBooks] = useState([
    
  ])

  // UseEffect com parametro [] (vazio dentro) roda a função que está dentro (no caso getBooks)
  // quando carrega o componente
  useEffect(() => {
    getBooks();
  }, [])

  // Pegar os dados de cada input no formulário
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value })
  }

  // Pegar os livros do servidor
  const getBooks = () => {
    api.get("/books")
    .then(res => setBooks(res.data))
    .catch(err => console.log(err))
  }

  // enviar um livro para o servidor, e, pegar a atualizacao
  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/books", form )
      .then(res => {
        console.log(res)
        // limpa formulario
        setForm({id:'',title:'',author:''})
        getBooks();
      })
      .catch(err => console.log(err))
    
  }

  // Deleta algum livro do servidor dado o id desse livro 
  const deleteFromServer = (id) => {
    api.delete("/books/" + id)
      .then(res => {
        console.log(res);
        getBooks();
      })
  }

  return (
    <div>
      <form>
        <Input id="id" label="ID" name="id"
         value={form.id} onChange={handleChange} />
        <Input id="title" label="Title" name="title"
         value={form.title} onChange={handleChange} />
        <Input id="author" label="Author" name="author"
         value={form.author} onChange={handleChange} />

          {/* Aqui não se passa nenhum parametro. Então posso chamar direto. Obs: evento (e) não é parâemtro
          obrigatório */}

        <Button onClick={handleSubmit}>
          <h2>Submit</h2>
        </Button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
           {/* Transformo cada livro em livros numa linha de tabela com seus respectivos atributos */}
          {books.map((book) => <tr>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            {/* Quando passa parâmetro específico, usa-se a notação de função anonima */}
            <td onClick={() => deleteFromServer(book.id)}>X</td>

          </tr>)}
        </tbody>
      </table>


    </div>
  )
}

App.propTypes = {}

export default App