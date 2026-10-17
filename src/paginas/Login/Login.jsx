import React, { useState } from 'react';
import './Login.css';
import logoGrande from '../../recursos/logos/logo.png.jpeg';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from '../../api/authApi';

const Login = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.trim() === '' || password.trim() === '') {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('Iniciando sesión con:', { usuario, password });
      const respuesta = await login(usuario, password);

      // Guardar JWT en el navegador
      localStorage.setItem('token', respuesta.token);
      console.log('Token recibido:', respuesta.token);

      if (onLoginSuccess) {
        onLoginSuccess();
      }

    } catch (err) {
      console.error(err);
  
        if (err.response && err.response.data) {
            setError(err.response.data); // usa el mensaje real del backend
      } else {
            setError('Usuario o contraseña incorrectos');
  }
}   finally {
      setLoading(false);
}
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Logo Circular de Bros Burger */}
        <div className="login-logo-wrapper">
          <div className="login-circulo-logo">
            <img src={logoGrande} alt="Bros Burger Logo" />
          </div>
        </div>

        <h2 className="login-titulo">
          ¡BIENVENIDO A BROS BURGER!
        </h2>

        <p className="login-subtitulo">
          Ingresa tus credenciales para acceder al sistema de gestión
        </p>

        {error && (
          <div className="login-error-badge">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">

          {/* Campo de Usuario */}
          <div className="login-input-group">
            <label htmlFor="usuario">
              Usuario o Correo
            </label>
            <div className="login-input-wrapper">
              <FaUser className="login-icon" />
              <input
                type="text"
                id="usuario"
                placeholder="Ej. admin"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Campo de Contraseña */}
          <div className="login-input-group">
            <label htmlFor="password">
              Contraseña
            </label>
            <div className="login-input-wrapper">
              <FaLock className="login-icon" />
              <input
                type={mostrarPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn-mostrar-psw"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
          >
            {loading ? 'VALIDANDO...' : 'INGRESAR'}
          </button>

        </form>

        <div className="login-footer">
          <p>
            © 2026 Bros Burger - Todos los derechos reservados.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;