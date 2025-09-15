import React from 'react';
import { useCart, useCurrency } from '../App';
import { QuoteTemplateConfig } from '../types';

interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface QuoteTemplateProps {
  customerInfo: CustomerInfo;
  templateConfig: QuoteTemplateConfig;
  logoUrl: string;
}

const QuoteTemplate: React.FC<QuoteTemplateProps> = ({ customerInfo, templateConfig, logoUrl }) => {
  const { cartItems } = useCart();
  const { formatPrice } = useCurrency();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itbis = subtotal * 0.18;
  const total = subtotal + itbis;
  const quoteDate = new Date().toLocaleDateString('es-DO', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const quoteNumber = `DG-${Date.now().toString().slice(-6)}`;

  const { companyInfo, labels, visibility, style } = templateConfig;

  return (
    <div className="printable-area bg-white p-8 font-sans text-sm text-gray-800">
      <style>{`
        .quote-table th, .quote-table td { padding: 0.75rem; text-align: left; }
        .quote-table th { background-color: ${style.accentColor}1A; color: ${style.accentColor}; }
        .quote-table tbody tr:nth-child(even) { background-color: #f9fafb; }
      `}</style>
      
      <header className="flex justify-between items-start pb-6" style={{ borderBottom: `2px solid ${style.accentColor}`}}>
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
          <h1 className="text-3xl font-bold text-gray-900">{labels.mainTitle}</h1>
          {visibility.showQuoteNumber && <p className="mt-1"><strong>{labels.quoteNumberLabel}</strong> {quoteNumber}</p>}
          {visibility.showDate && <p><strong>{labels.dateLabel}</strong> {quoteDate}</p>}
        </div>
      </header>

      <section className="grid grid-cols-2 gap-8 my-8">
        <div>
          <h2 className="font-bold text-gray-900 mb-2">{labels.fromLabel}</h2>
          <p className="font-bold">{companyInfo.name}</p>
          <p>{companyInfo.addressLine1}</p>
          <p>{companyInfo.addressLine2}</p>
          {visibility.showRnc && <p>RNC: {companyInfo.rnc}</p>}
          <p>Email: {companyInfo.email}</p>
          <p>Tel: {companyInfo.phone}</p>
        </div>
        <div>
          <h2 className="font-bold text-gray-900 mb-2">{labels.toLabel}</h2>
          <p className="font-bold">{customerInfo.name}</p>
          <p>{customerInfo.address || 'Dirección no proporcionada'}</p>
          <p>{customerInfo.email}</p>
          <p>{customerInfo.phone}</p>
        </div>
      </section>

      <section>
        <table className="w-full border-collapse quote-table">
          <thead>
            <tr>
              <th className="w-1/2 font-bold">{labels.itemDescriptionHeader}</th>
              <th className="font-bold text-center">{labels.itemQuantityHeader}</th>
              <th className="font-bold text-right">{labels.itemUnitPriceHeader}</th>
              <th className="font-bold text-right">{labels.itemTotalHeader}</th>
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
            <span>{labels.totalLabel}</span>
            <span>{formatPrice(visibility.showTax ? total : subtotal)}</span>
          </div>
        </div>
      </section>

      <footer className="mt-12 pt-6 border-t text-center text-xs text-gray-500">
        <p>{labels.footerTextLine1}</p>
        <p>{labels.footerTextLine2}</p>
      </footer>
    </div>
  );
};

export default QuoteTemplate;