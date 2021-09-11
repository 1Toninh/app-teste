import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/logo-paraiba-2019.png'

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    
    async function handleNewIncident(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            
            history.push('/profile');
        } catch(err) {
            alert('Não foi possível criar. Tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <section>
                <img src={logoImg} className="logoParaiba" alt="Logo Paraíba" />

                <h1>Cadastrar Novo Caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar
                </Link>
            </section>

            <form>
                <input 
                placeholder="Título do caso"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <input 
                placeholder="Valor em reais"
                value={value}
                onChange={e => setValue(e.target.value)}
                />

                <button className="button" onClick={handleNewIncident} type="submit">Cadastrar</button>
            </form>
        </div>
    );
}