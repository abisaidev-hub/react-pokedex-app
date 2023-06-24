import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/user.slice';
import profoaklogin from '../images/profoaklogin.png'

const Login = () => {

  //  React
  const [ userInput, setUserInput ] = useState('');
  //  React Router DOM
  const navigate = useNavigate();
  //  Redux
  const dispatch = useDispatch();

  const handleInput = () => {
    if (userInput.trim().length > 0) {
      document.getElementById('login-button')?.classList.add('active-login-button');
      document.getElementById('login-button')?.removeAttribute('disabled');
      document.getElementById('login-input')?.classList.add('active-login-input');
    } else {
      document.getElementById('login-button')?.classList.remove('active-login-button');
      document.getElementById('login-button')?.setAttribute('disabled', false);
      document.getElementById('login-input')?.classList.remove('active-login-input');
    }
  };

  handleInput();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateUser(userInput.trim()))
    navigate('/pokedex')
    window.scrollTo(0, 0)
  }

  return (
    <div className='login-container'>
      <img src={profoaklogin} alt="professor_oak" />
      <p>Please, enter your <b>name</b> to start!</p>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder='John Doe'
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          id='login-input'
        />
        <button id='login-button' disabled>
          <i className='bx bxs-right-arrow' ></i>
        </button>
      </form>
      <div className="login__footer">
        <ul className="footer__social-media">
          <li><a className="footer__link" href="https://www.linkedin.com/in/abisaidev" target='_blank'>LinkedIn</a></li>
          <span>|</span>
          <li><a className="footer__link" href="https://github.com/abisaidev-hub" target='_blank'>GitHub</a></li>
        </ul>
        <p>© Abisai Luna</p>
      </div>
    </div>
  );
};

export default Login;