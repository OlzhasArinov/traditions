import React from "react";
import { useState, useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import { func } from "prop-types";
// import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {

  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   completed: false,
    //   title: 'Buy milk'
    // },
    // {
    //   id: 2,
    //   completed: true,
    //   title: 'Buy chocolate'
    // },
    // {
    //   id: 3,
    //   completed: false,
    //   title: 'Buy cola'
    // }
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos)
        setLoading(false)
      })
  }, [])

  function toggleTodo(id) {
    setTodos (todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }
  

  return (
    <Context.Provider value={{removeTodo}}>
    <div className='wrapper'>
      <h1>React tutorial </h1>

      <Modal />

      <React.Suspense fallback={<p>Loading...</p>}>
        <AddTodo  onCreate={addTodo}/>
      </React.Suspense>


      {loading && <Loader />}

      {todos.length ? <TodoList todos={todos} onToggle={toggleTodo} /> : loading ? null : <p>No todos</p>}

      
    </div>
    </Context.Provider>
  );
}

export default App;
