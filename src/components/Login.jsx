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
          placeholder=''
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <button>
          <i className='bx bxs-right-arrow' ></i>
        </button>
      </form>
      <div class="login__footer">
        <ul class="footer__social-media">
          <li>
            <a href="https://www.linkedin.com/in/abisaidev" target='_blank' className='footer__link'>
              <i className='bx bxl-linkedin-square bx-md'></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/abisaidev-hub" target='_blank' className='footer__link'>
              <i className='bx bxl-github bx-md' ></i>
            </a>
          </li>
        </ul>
        <p>© Abisai Luna</p>
      </div>
    </div>
  );
};

export default Login;