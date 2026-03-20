import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import api from './api';
import Input from './Input';
import Button from './Button';

function App() {

  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({id: '', title:'', author: ''})
  const [enviado, setEnviado] = useState(0)

  useEffect(() => {
    api.get("/posts")
      .then( resposta => setPosts(resposta.data))
  },[])

  const pegaPosts = () => {
    api.get("/posts")
      .then( resposta => setPosts(resposta.data))

  }

  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target;
    setForm({...form, [name]: value})
  }

  const adicionaPost = e => {
    e.preventDefault();
    console.log(form)
    api.post("/posts", form)
    .then(console.log).then(pegaPosts)
  }

  return (
    <div className="App">
      <form>
        <Input id="id" name="id" onChange={handleChange} label="ID"  />
        <Input id="title" name="title" onChange={handleChange} label="Title"  />
        <Input id="author" name="author" onChange={handleChange} label="Author"  />
        <Button onClick={adicionaPost} >Adicionar Post</Button>
      </form>
      <hr />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => 
          <tr key={i}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.author}</td>
          </tr>
          )}
      </tbody>
      </table>
    </div>
  );
}

export default App;
