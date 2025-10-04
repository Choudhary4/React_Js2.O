import { useEffect, useState } from 'react'
function App() {
  const [color, setColor] = useState(()=>{
    return localStorage.getItem("bgColor") || "olive";
  })

  useEffect(()=>{
    localStorage.setItem("bgColor",color)
  },[color])

  return (
    <div className="w-full h-screen" style={{backgroundColor:color}}>
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-wrap justify-center items-center bg-amber-50 rounded-3xl gap-3.5 p-3 shadow-lg">
  <button className="bg-red-600 text-white px-4 py-2 rounded-3xl" onClick={() => setColor("red")}>
    Red
  </button>
  <button className="bg-green-600 text-white px-4 py-2 rounded-3xl" onClick={() => setColor("green")}>
    Green
  </button>
  <button className="bg-blue-600 text-white px-4 py-2 rounded-3xl" onClick={() => setColor("blue")}>
    Blue
  </button>
</div>

      
    </div>
  )
}

export default App
