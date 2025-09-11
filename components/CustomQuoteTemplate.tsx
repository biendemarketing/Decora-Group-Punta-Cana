import React from 'react';
import { useCurrency } from '../App';

interface CustomQuoteTemplateProps {
  title: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  details: { label: string; value: string | number }[];
  subtotal: number;
}

const CustomQuoteTemplate: React.FC<CustomQuoteTemplateProps> = ({ title, userInfo, details, subtotal }) => {
  const { formatPrice } = useCurrency();
  const quoteDate = new Date().toLocaleDateString('es-DO', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const quoteNumber = `DG-CUSTOM-${Date.now().toString().slice(-6)}`;
  const itbis = subtotal * 0.18;
  const total = subtotal + itbis;

  return (
    <div className="printable-area bg-white p-8 font-sans text-sm text-gray-800">
      <style>{`
        .quote-table th, .quote-table td { padding: 0.75rem; text-align: left; }
        .quote-table th { background-color: #f3f4f6; }
        .quote-table tbody tr:nth-child(even) { background-color: #f9fafb; }
      `}</style>
      
      <header className="flex justify-between items-start pb-6 border-b-2 border-gray-800">
        <div>
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-01.png?alt=media&token=790f60ef-0216-4181-ac70-bf781394543a"
            alt="Decora Group Logo"
            className="h-20"
          />
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900 uppercase">COTIZACIÓN</h1>
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <p className="mt-2"><strong>No:</strong> {quoteNumber}</p>
          <p><strong>Fecha:</strong> {quoteDate}</p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-8 my-8">
        <div>
          <h2 className="font-bold text-gray-900 mb-2">PARA:</h2>
          <p className="font-bold">{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <p>{userInfo.phone}</p>
        </div>
        <div className="text-right">
            <h2 className="font-bold text-gray-900 mb-2">DE:</h2>
            <p className="font-bold">Decora Group Punta Cana</p>
            <p>Email: decoragrouppc@gmail.com</p>
            <p>Tel: (849) 456-1963</p>
        </div>
      </section>

      <section>
        <table className="w-full border-collapse quote-table">
          <thead>
            <tr>
              <th className="w-2/3 font-bold">Descripción</th>
              <th className="font-bold text-right">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index} className="border-b">
                <td>{item.label}</td>
                <td className="text-right">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex justify-end mt-6">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-2">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>ITBIS (18%):</span>
            <span>{formatPrice(itbis)}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold text-gray-900 border-t-2 border-gray-800 mt-2">
            <span>TOTAL ESTIMADO:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </section>

      <footer className="mt-12 pt-6 border-t text-center text-xs text-gray-500">
        <p><strong>Nota:</strong> Esta es una cotización estimada y está sujeta a cambios tras la evaluación final del proyecto.</p>
        <p>Válida por 30 días.</p>
      </footer>
    </div>
  );
};

export default CustomQuoteTemplate;
