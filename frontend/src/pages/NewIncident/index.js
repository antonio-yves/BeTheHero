import React, {useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongID = localStorage.getItem('ongID');
  const history = useHistory()

  async function handleNewIncident(e){
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongID,
        }
      })
      history.push('/profile')
    } catch (err) {
      alert('Erro ao cadastrar novo caso, por favor, tente novamente.');
    }
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft color="#e02041" size={16}/>
            Voltar para home
          </Link>
        </section>
        
        <form onSubmit={handleNewIncident}>
          <input type="text" 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <input type="text" 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
            required
          />

          <button type="submit" className="button">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}