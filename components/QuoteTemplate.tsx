import React from 'react';
import { useCart, useCurrency } from '../App';

interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface QuoteTemplateProps {
  customerInfo: CustomerInfo;
}

const QuoteTemplate: React.FC<QuoteTemplateProps> = ({ customerInfo }) => {
  const { cartItems } = useCart();
  const { formatPrice } = useCurrency();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const quoteDate = new Date().toLocaleDateString('es-DO', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const quoteNumber = `DG-${Date.now().toString().slice(-6)}`;

  return (
    <div className="printable-area bg-white p-8 font-sans text-sm text-gray-800">
      <style>{`
        .quote-table th, .quote-table td { padding: 0.75rem; text-align: left; }
        .quote-table th { background-color: #f3f4f6; }
        .quote-table tbody tr:nth-child(even) { background-color: #f9fafb; }
      `}</style>
      
      {/* Header */}
      <header className="flex justify-between items-start pb-6 border-b-2 border-gray-800">
        <div>
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-01.png?alt=media&token=790f60ef-0216-4181-ac70-bf781394543a"
            alt="Decora Group Logo"
            className="h-20"
          />
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900">COTIZACIÓN</h1>
          <p className="mt-1"><strong>No:</strong> {quoteNumber}</p>
          <p><strong>Fecha:</strong> {quoteDate}</p>
        </div>
      </header>

      {/* Company and Client Info */}
      <section className="grid grid-cols-2 gap-8 my-8">
        <div>
          <h2 className="font-bold text-gray-900 mb-2">DE:</h2>
          <p className="font-bold">Decora Group Punta Cana</p>
          <p>CANATOWN Plaza & Centro de Logística</p>
          <p>Av. Barceló, local 101, Veron, Punta Cana</p>
          <p>RNC: [Tu RNC aquí]</p>
          <p>Email: decoragrouppc@gmail.com</p>
          <p>Tel: (849) 456-1963</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-900 mb-2">PARA:</h2>
          <p className="font-bold">{customerInfo.name}</p>
          <p>{customerInfo.address || 'Dirección no proporcionada'}</p>
          <p>{customerInfo.email}</p>
          <p>{customerInfo.phone}</p>
        </div>
      </section>

      {/* Items Table */}
      <section>
        <table className="w-full border-collapse quote-table">
          <thead>
            <tr>
              <th className="w-1/2 font-bold">Descripción</th>
              <th className="font-bold">Cant.</th>
              <th className="font-bold text-right">Precio Unit.</th>
              <th className="font-bold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} className="border-b">
                <td>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                </td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">{formatPrice(item.price)}</td>
                <td className="text-right">{formatPrice(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Totals Section */}
      <section className="flex justify-end mt-6">
        <div className="w-1/3">
          <div className="flex justify-between py-2">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>ITBIS (0%):</span>
            <span>{formatPrice(0)}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold text-gray-900 border-t-2 border-gray-800 mt-2">
            <span>TOTAL:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t text-center text-xs text-gray-500">
        <p>Gracias por su interés en Decora Group.</p>
        <p>Esta cotización es válida por 30 días. Los precios no incluyen instalación a menos que se especifique lo contrario.</p>
      </footer>
    </div>
  );
};

export default QuoteTemplate;
