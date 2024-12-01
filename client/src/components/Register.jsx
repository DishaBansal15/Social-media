import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContextProvider';

const Register = ({ setIsLoginBox }) => {
  const { username, setUsername, email, setEmail, password, setPassword, register } = useContext(AuthenticationContext);

  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple validation to check if fields are empty
    if (!username || !email || !password) {
      setError('All fields are required!');
      return;
    }

    try {
      await register(); // Assuming register is a function that registers the user
      setError('');
      setUsername(''); // Clear username
      setEmail('');    // Clear email
      setPassword(''); // Clear password
      // Optionally redirect to login page or reset other states
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form className="authForm">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="floatingInput">Username</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="btn btn-primary" onClick={handleRegister}>
        Sign up
      </button>

      <p>
        Already registered?{' '}
        <span onClick={() => setIsLoginBox(true)}>Login</span>
      </p>
    </form>
  );
};

export default Register;
