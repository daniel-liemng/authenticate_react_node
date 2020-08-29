import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset errors
    setErrors({ email: "", password: "" });

    try {
      const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setErrors({
          ...errors,
          email: data.errors.email,
          password: data.errors.password,
        });
      }
      if (data.user) {
        // history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            required
            name='email'
            value={email}
            onChange={handleChange}
          />
          <small className='form-text text-danger'>{errors.email}</small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            required
            name='password'
            value={password}
            onChange={handleChange}
          />
          <small className='form-text text-danger'>{errors.password}</small>
        </div>

        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
