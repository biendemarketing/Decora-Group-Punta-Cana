import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import Logo from './Logo';
import { INITIAL_NAVIGATION_DATA } from '../constants';
import { supabase } from '../supabaseClient';

interface LoginPageProps {
  onGoBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onGoBack }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        setError(error.message);
      }
      // If successful, the onAuthStateChange listener in App.tsx will handle the navigation.
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-sm w-full bg-white rounded-lg shadow-lg border">
        <div className="flex justify-center mb-6">
          <Logo src={INITIAL_NAVIGATION_DATA.logoUrl} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Acceso al Panel</h2>
        <p className="text-center text-gray-500 mb-6">Ingresa para administrar el contenido.</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#5a1e38] bg-gray-50"
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#5a1e38] bg-gray-50"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              className="bg-[#5a1e38] hover:bg-[#4d182e] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-colors disabled:bg-gray-400"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Ingresando...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Ingresar
                </>
              )}
            </button>
          </div>
        </form>
         <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onGoBack}
            className="text-sm text-gray-600 hover:text-[#5a1e38] transition-colors"
          >
            &larr; Volver a la página principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;