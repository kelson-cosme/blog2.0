import "../NavBar/NavBar.css"
import { Link } from "react-router-dom"

function Navbar() {

  return (
    <nav className="navegacao"> 
        <div className="logo">
            <Link to={"/"}>logo</Link>
            
            <img src="" alt="" />
        </div>

        <div>
            <form action="">
                <input type="text" />
                <button>Lupa</button>
            </form>
            
        </div>

        <div>
            <h1>Login</h1>
        </div>
    </nav>
  )
}

export default Navbar
