import { signOut, getAuth } from "firebase/auth";
import { auth } from "../Home";

import "./Admin.css"

function Admin() {

    function sair(){
        window.location.reload(true);

        signOut(auth).then(() => {
            setUserLogado("")
            console.log("Sign-out successful")
            
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    return(
        <div className="administrador">
            <h1>teste admin</h1>

            <ul>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>
                <li>teste1</li>

            </ul>

            <button onClick={sair}>saindoooooo</button>
        </div>
    )
}

export default Admin