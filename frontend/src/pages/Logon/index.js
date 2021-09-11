import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import landscapeImg from '../../assets/1x1_annapurna-massif-himalayas-nepal-4k-wallpaper.jpg'
import logoImg from '../../assets/logo-paraiba-2019.png';

import './style.css';
import api from '../../services/api';

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handlelogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('profile');
        } catch(err) {
            alert('Login inválido. Tente novamente.');
        }
    }


    return (
        <div className="logon-container">
            <section className="form" onSubmit={handlelogin}>
                <img src={logoImg} alt="Logo Paraíba" />
                <form>
                    <h1>Faça seu login</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setID(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={landscapeImg} className="landscapeImg" alt="LandscapeImg" />
        </div>
    );
}