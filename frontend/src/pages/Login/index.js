import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

export default function Login(){
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (err) {
      alert('Falha ao realizar login, favor tentar novamente!');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            type="text"
            placeholder="Informe sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
            required
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn color="#e02041" size={16}/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}