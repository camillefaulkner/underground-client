import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import './Login.css'

export const Login = ({ setToken, setUserId }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setIsUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user).then(res => {
      if ("valid" in res && res.valid) {

        setToken(res.token)
        setUserId(res.user_id)
        localStorage.setItem('is_staff', res.is_staff)
        navigate("/events")
      }
      else {
        setIsUnsuccessful(true)
      }
    })
  }

  return (
    <section className="columns is-centered">
      <div className="loginblob">
        <div className="loginblob2">
          <form className="column is-two-thirds" onSubmit={handleLogin}>
            <h1 className="title">underground</h1>
            <p className="subtitle">sign in</p>

            <div className="field">
              <label className="label">username</label>
              <div className="control">
                <input className="input" type="text" ref={username} />
              </div>
            </div>

            <div className="field">
              <label className="label">password</label>
              <div className="control">
                <input className="input" type="password" ref={password} />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit" >submit</button>
              </div>
              <div className="control">
                <Link to="/register" className="registerbutton">register</Link>
              </div>
            </div>
            {
              isUnsuccessful ? <p className="help is-danger">username or password not valid</p> : ''
            }
          </form>
        </div>
      </div>
    </section>
  )
}