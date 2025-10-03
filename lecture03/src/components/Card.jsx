
function Card({userName = 'saurabh',btxButton}){
return(
      <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="React Logo"
      />
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{userName}</h2>
        <p className="text-gray-600 text-sm">
          Fiber is the new reconciliation engine in React that enables smooth,
          interruptible, and prioritized rendering.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          {btxButton}
        </button>
      </div>
    </div>
)
}

export default Card