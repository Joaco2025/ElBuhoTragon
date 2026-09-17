// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
import { FiAlertCircle, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('username', data.username); 
        localStorage.setItem('es_admin', data.es_admin);
        
        window.dispatchEvent(new Event("storage"));
        navigate('/');
      } else {
        setError(data.error || 'Credenciales no reconocidas en el sistema.');
      }

    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError('Error de conexión con el servidor universitario.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0e2246] text-[#F2F2F0] flex flex-col font-sans selection:bg-[#163A70] selection:text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-md mx-auto">
          
          {/* Encabezado Editorial */}
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B39A3A] block mb-2 font-medium">
              Comunidad Universitaria UNISON
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[#F2F2F0] font-normal tracking-tight mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-neutral-300 text-sm font-light leading-relaxed">
              Ingresa con tus credenciales para registrar opiniones y consultar tu Pasaporte Tragón.
            </p>
          </div>

          {/* Formulario */}
          <form 
            onSubmit={handleSubmit} 
            className="p-8 rounded-2xl bg-[#0a1830] border border-white/[0.1] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]"
          >
            {error && (
              <div 
                className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2 mb-6 animate-fade-in"
                role="alert"
              >
                <FiAlertCircle size={15} className="flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label 
                  htmlFor="login-username" 
                  className="block font-mono text-[11px] uppercase tracking-wider text-neutral-300 mb-1.5 font-medium"
                >
                  Nombre de Usuario
                </label>
                <div className="relative">
                  <input
                    id="login-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ej. buho_estudiante"
                    className="w-full bg-[#071326] border border-white/[0.12] focus:border-[#B39A3A] text-white text-sm rounded-xl px-4 py-3 placeholder-neutral-400 focus:outline-none transition-colors pr-10 font-sans"
                  />
                  <FiUser className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" size={15} />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="login-password" 
                  className="block font-mono text-[11px] uppercase tracking-wider text-neutral-300 mb-1.5 font-medium"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#071326] border border-white/[0.12] focus:border-[#B39A3A] text-white text-sm rounded-xl px-4 py-3 pr-10 placeholder-neutral-400 focus:outline-none transition-colors font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 bg-white text-black font-sans text-xs font-mono uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer font-medium"
              >
                {isLoading ? "Validando credenciales..." : "Acceder a mi cuenta"}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
              <p className="text-xs text-neutral-300 font-light">
                ¿Aún no tienes cuenta universitaria?{" "}
                <Link to="/registro" className="text-white hover:text-[#B39A3A] underline font-medium ml-1 transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>

        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Login;