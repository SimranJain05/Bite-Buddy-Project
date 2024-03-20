import React,{useState} from 'react'
import { Link , useNavigate } from "react-router-dom";

export default function Login() {

  const [credentials , setCredentials] = useState({ email:"" ,password:"" })

  let navigate = useNavigate() //to navigate 

    const handleFormSubmit = async (e) =>{
        e.preventDefault();  // Synthetic event  to prevent form data from being sent if the user submits the form via pressing Enter in a field

        const response = await fetch("http://localhost:5000/api/loginuser", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ email: credentials.email, password: credentials.password })
        })

        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter valid credentials")
        }

        else{
          localStorage.setItem('authToken',json.authToken);
          // console.log(localStorage.getItem("authToken"))
          navigate("/");   //to navigate to home page on successful login
        }

        
    }

    const onChange = (event) => {
        setCredentials({...credentials,[event.target.name] : event.target.value})
    }

  return (
    <>

      <div className="container">

      <form onSubmit={handleFormSubmit}>

        <div className="mb-3">

          <label htmlFor="email" className="form-label"> Email address  </label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange}/>
          <div id="emailHelp" className="form-text"> We'll never share your email with anyone else. </div>

        </div>
        
        <div className="mb-3">

          <label htmlFor="password" className="form-label"> Password </label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />

        </div>

        <button type="submit" className="btn btn-primary"> Submit </button>

        <Link to="/createuser" className="m-3 btn btn-danger"> New user</Link>

      </form>

      </div>

    </>
  )
}
