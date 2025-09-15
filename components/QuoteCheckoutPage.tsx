import React from 'react';
import { useCart, useCurrency } from '../App';
import { Download, MessageSquare, ArrowLeft, PlusCircle } from 'lucide-react';
import QuoteTemplate from './QuoteTemplate';
import { QuoteTemplateConfig } from '../types';

interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface QuoteCheckoutPageProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
  onPrintQuote: () => void;
  onWhatsAppQuote: () => void;
  onGoBackToCart: () => void;
  onContinueShopping: () => void;
  templateConfig: QuoteTemplateConfig;
  logoUrl: string;
}

const QuoteCheckoutPage: React.FC<QuoteCheckoutPageProps> = ({ 
    customerInfo, 
    onCustomerInfoChange, 
    onPrintQuote, 
    onWhatsAppQuote,
    onGoBackToCart,
    onContinueShopping,
    templateConfig,
    logoUrl
}) => {
  const { cartItems } = useCart();
  const { formatPrice } = useCurrency();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onCustomerInfoChange({ ...customerInfo, [name]: value });
  };
  
  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone;
  const inputClasses = "mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900 focus:ring-[#5a1e38] focus:border-[#5a1e38]";

  return (
    <main className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:justify-between lg:items-center mb-8">
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Cotización</h1>
                <p className="text-gray-600">Completa tus datos para generar tu cotización personalizada.</p>
            </div>
             <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4 lg:mt-0">
                <button 
                    onClick={onGoBackToCart}
                    className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                >
                    <ArrowLeft className="h-4 w-4" /> Volver atrás
                </button>
                <button 
                    onClick={onContinueShopping}
                    className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                >
                    <PlusCircle className="h-4 w-4" /> Añadir otro producto
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Form & Summary */}
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Tus Datos</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo *</label>
                            <input type="text" name="name" id="name" required value={customerInfo.name} onChange={handleInputChange} className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico *</label>
                            <input type="email" name="email" id="email" required value={customerInfo.email} onChange={handleInputChange} className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono *</label>
                            <input type="tel" name="phone" id="phone" required value={customerInfo.phone} onChange={handleInputChange} className={inputClasses} />
                        </div>
                         <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección (para envío)</label>
                            <textarea name="address" id="address" rows={3} value={customerInfo.address} onChange={handleInputChange} className={inputClasses}></textarea>
                        </div>
                    </form>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen de Cotización</h2>
                    <ul className="space-y-3 text-sm mb-4 max-h-40 overflow-y-auto">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex justify-between items-start">
                                <span className="flex-1 pr-2">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-base font-bold">
                        <span>Total Estimado</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>

                    <div className="mt-6 space-y-3">
                        <button 
                            onClick={onPrintQuote} 
                            disabled={!isFormValid}
                            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-3 px-4 rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <Download className="h-5 w-5" /> Descargar Cotización (PDF)
                        </button>
                        <button 
                            onClick={onWhatsAppQuote}
                            disabled={!isFormValid}
                            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
                        >
                            <MessageSquare className="h-5 w-5" /> Enviar por WhatsApp
                        </button>
                    </div>
                    {!isFormValid && <p className="text-xs text-red-600 mt-3 text-center">Por favor, completa los campos obligatorios (*).</p>}
                </div>
            </div>
            
            {/* Right Column: Quote Preview */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Vista Previa</h2>
                <div className="bg-white shadow-2xl rounded-lg p-2 aspect-[8.5/11] overflow-hidden">
                    <div className="h-full w-full overflow-auto border rounded-sm">
                        <QuoteTemplate customerInfo={customerInfo} templateConfig={templateConfig} logoUrl={logoUrl} />
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  );
};

export default QuoteCheckoutPage;