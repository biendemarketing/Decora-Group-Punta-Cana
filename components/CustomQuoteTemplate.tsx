import React from 'react';
import { useCurrency } from '../App';
import { QuoteTemplateConfig } from '../types';

interface CustomQuoteTemplateProps {
  title: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  details: { label: string; value: string | number }[];
  subtotal: number;
  templateConfig: QuoteTemplateConfig;
  logoUrl: string;
}

const CustomQuoteTemplate: React.FC<CustomQuoteTemplateProps> = ({ title, userInfo, details, subtotal, templateConfig, logoUrl }) => {
  const { formatPrice } = useCurrency();
  const quoteDate = new Date().toLocaleDateString('es-DO', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const quoteNumber = `DG-CUSTOM-${Date.now().toString().slice(-6)}`;
  const itbis = subtotal * 0.18;
  const total = subtotal + itbis;
  
  const { companyInfo, labels, visibility, style } = templateConfig;


  return (
    <div className="printable-area bg-white p-8 font-sans text-sm text-gray-800">
      <style>{`
        .quote-table th, .quote-table td { padding: 0.75rem; text-align: left; }
        .quote-table th { background-color: ${style.accentColor}1A; color: ${style.accentColor}; }
        .quote-table tbody tr:nth-child(even) { background-color: #f9fafb; }
      `}</style>
      
      <header className="flex justify-between items-start pb-6" style={{ borderBottom: `2px solid ${style.accentColor}` }}>
        <div>
          {visibility.showLogo && (
            <img 
              src={logoUrl}
              alt={`${companyInfo.name} Logo`}
              className="h-20"
            />
          )}
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900 uppercase">{labels.mainTitle}</h1>
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          {visibility.showQuoteNumber && <p className="mt-2"><strong>{labels.quoteNumberLabel}</strong> {quoteNumber}</p>}
          {visibility.showDate && <p><strong>{labels.dateLabel}</strong> {quoteDate}</p>}
        </div>
      </header>

      <section className="grid grid-cols-2 gap-8 my-8">
        <div>
          <h2 className="font-bold text-gray-900 mb-2">{labels.toLabel}</h2>
          <p className="font-bold">{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <p>{userInfo.phone}</p>
        </div>
        <div className="text-right">
            <h2 className="font-bold text-gray-900 mb-2">{labels.fromLabel}</h2>
            <p className="font-bold">{companyInfo.name}</p>
            <p>{companyInfo.addressLine1}</p>
            <p>{companyInfo.addressLine2}</p>
            {visibility.showRnc && <p>RNC: {companyInfo.rnc}</p>}
            <p>Email: {companyInfo.email}</p>
            <p>Tel: {companyInfo.phone}</p>
        </div>
      </section>

      <section>
        <table className="w-full border-collapse quote-table">
          <thead>
            <tr>
              <th className="w-2/3 font-bold">{labels.itemDescriptionHeader}</th>
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
            <span>{labels.subtotalLabel}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {visibility.showTax && (
            <div className="flex justify-between py-2">
              <span>{labels.taxLabel}</span>
              <span>{formatPrice(itbis)}</span>
            </div>
          )}
          <div className="flex justify-between py-2 text-lg font-bold text-gray-900 mt-2" style={{ borderTop: `2px solid ${style.accentColor}`}}>
            <span>TOTAL ESTIMADO:</span>
            <span>{formatPrice(visibility.showTax ? total : subtotal)}</span>
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