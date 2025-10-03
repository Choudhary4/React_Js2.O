import Card from "./components/Card"

function App() {
 
const CardData = [
  {
    "userName": "Saurabh",
    "btxButton": "Click Me"
  },
  {
    "userName": "Kuntal",
    "btxButton": "Learn More"
  },
  {
    "userName": "React Dev",
    "btxButton": "Explore"
  },
  {
    "userName": "Fiber Engine",
    "btxButton": "Read Docs"
  }
]

  return (
   <div className="bg-black">
      <h1 className="text-3xl font-bold underline bg-amber-700">
    Hello world!
  </h1>
  {/* Loop through CardData array and render a Card component for each item */}
{/* {CardData.map((item, index) => {
  return <Card key={index} userName={item.userName} btxButton={item.btxButton} />
})} */}


  {CardData.map((item,index)=>(
    <Card key={index} userName={item.userName} btxButton={item.btxButton}/>
  ))}
  
   </div>
  )
}

export default App
