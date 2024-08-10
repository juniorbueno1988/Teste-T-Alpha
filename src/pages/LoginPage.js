import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [taxNumber, setTaxNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Tentando fazer login com:', taxNumber, password);

        try {
            const response = await axios.post('https://interview.t-alpha.com.br/api/auth/login', {
                taxNumber,
                password,
            });

            console.log('Resposta da API:', response);

            if (response.data.success) {
                // Ajuste para armazenar o token recebido no corpo da resposta
                const token = response.data.data.token;
                console.log('Token recebido:', token);
                localStorage.setItem('token', token);
                navigate('/products');
            } else {
                console.log('Erro no login:', response.data.message);
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (err) {
            console.error('Erro durante o login:', err);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>CPF ou CNPJ:</label>
                    <input 
                        type="text" 
                        value={taxNumber} 
                        onChange={(e) => setTaxNumber(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
