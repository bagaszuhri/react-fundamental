import { useState } from 'react';
import classname from 'classnames'

// import './App.css';

import Navbar from './components/Navbar';
import Container from './components/Container';
import SearchInput from './components/SearchInput'
import Info from './components/Info';
import Todos from './components/Todos';
import Empty from './components/Empty';



function App() {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([
    {title: 'susu ultra', count: 1},
    {title: 'tahu sumedang', count: 1},
    {title: 'semangka', count: 1}
  ])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!value){
      alert('mohon isi sesuatu')
        return
    }

    const addedTodos = [...todos, {
      title:value,
      count: 1
    }]

    setTodos(addedTodos)
    setValue('')
  }


  const handleAdditionCount = (index) => {
    const newTodos = [...todos]

    newTodos[index].count = newTodos[index].count + 1

    setTodos(newTodos)
  }

  const handleSubstractionCount =  (index) => {
    const newTodos = [...todos]

    if(newTodos[index].count > 0) {
      // melakukan pengurangan sampai bataas 0
      newTodos[index].count = newTodos[index].count - 1
    }else{
      // melakukan fungsi penghapusan jika terus dikurangi ketika mencapai 0
      newTodos.splice(index, 1)
    }


    setTodos(newTodos)
  }

  const getTotalCount = () => {
    const totalCounts = todos.reduce((total, num) => {
      return total + num.count
    }, 0)

    return totalCounts
  }


  return (
    <>

      <Navbar />

      <Container>
        <SearchInput
          onSubmit={handleSubmit}
          onChange={(e) =>{setValue(e.target.value)}}
          value={value}
        />       

        <Info
          todosLength={todos.length}
          totalCount={getTotalCount()}
          onDelete={() => setTodos([])}
        />

        {todos.length > 0 ? (
          <Todos
          todos={todos}
          onSubstraction={(index) => handleSubstractionCount(index)}
          onAddition={(index) => handleAdditionCount(index)}
          
          />
        ) : (
          <Empty/>
        )}
      </Container>

    </>
  );
}

export default App;
