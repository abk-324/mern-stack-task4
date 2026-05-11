import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  // Welcome Page After Login
  if (loggedIn) {

    return (

      <div className="app">

        <div className="stars"></div>

        <div className="container">

          <h1>Welcome User 🎉</h1>

          <button
            onClick={() => {

              localStorage.removeItem("token");

              setLoggedIn(false);

            }}
          >
            Logout
          </button>

        </div>

      </div>
    );
  }

  const handleSubmit = () => {

    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/signup";

    const data = isLogin
      ? { email, password }
      : { name, email, password };

    axios.post(url, data)

      .then((res) => {

        alert(res.data.message);

        if (res.data.token) {

          localStorage.setItem("token", res.data.token);

          setLoggedIn(true);
        }

      })

      .catch((err) => console.log(err));
  };

  return (

    <div className="app">

      <div className="stars"></div>

      <div className="container">

        <h2>
          {isLogin ? "Login" : "Signup"}
        </h2>

        {!isLogin && (

          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

        )}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>

          {isLogin ? "Login" : "Signup"}

        </button>

        <button onClick={() => setIsLogin(!isLogin)}>

          {isLogin
            ? "Create new account"
            : "Already have an account"}

        </button>

      </div>

    </div>
  );
}

export default App;
