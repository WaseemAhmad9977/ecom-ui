import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen flex-col animate__animated animate__fadeIn">
        <img 
            src="/images/not-found.svg"
            className="lg:w-4/12 w-full"
        />
        <h1 className="text-zinc-600">404 ! Page not found</h1>
        <Link to="/">
            <button className="bg-indigo-600 text-white px-12 py-3 rounded-lg mt-4">
                <i className="ri-home-line mr-2"></i>
                Go Home
            </button>
        </Link>
    </div>
  )
}

export default NotFound
