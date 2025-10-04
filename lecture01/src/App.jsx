import './App.css'
import {useState} from 'react'
function App() {
  const [counter,setCounter] = useState(23);
   const addCounter = ()=>{
      setCounter(counter+1)
      setCounter(counter+1)
      setCounter(counter+1)
      setCounter(counter+1)
  }

  const removeCounter = ()=>{
    if(counter>0){
        setCounter(counter-1);
    }
  
  }

  return (
    <>
     <div>
      Counter is {counter}
     </div>
     <button onClick={addCounter}>Add Counter</button>
     <br />
     <button onClick={removeCounter}>Remove Counter</button>
    </>
  )
}

export default App
