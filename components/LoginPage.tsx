import React from 'react';
import { LogIn } from 'lucide-react';
import Logo from './Logo';
import { INITIAL_NAVIGATION_DATA } from '../constants';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-sm w-full bg-white rounded-lg shadow-lg border">
        <div className="flex justify-center mb-6">
          {/* FIX: The 'src' property was missing on the Logo component. It has been added using the logoUrl from INITIAL_NAVIGATION_DATA. */}
          <Logo src={INITIAL_NAVIGATION_DATA.logoUrl} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Acceso al Panel</h2>
        <p className="text-center text-gray-500 mb-6">Ingresa para administrar el contenido.</p>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#5a1e38] bg-gray-100"
              id="username"
              type="text"
              value="admin@decoragroup.pc"
              readOnly
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#5a1e38] bg-gray-100"
              id="password"
              type="password"
              value="********"
              readOnly
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-[#5a1e38] hover:bg-[#4d182e] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-colors"
              type="submit"
            >
              <LogIn className="h-4 w-4" />
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;