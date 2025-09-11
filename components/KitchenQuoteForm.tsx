import React, { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, Download, MessageSquare, Mail } from 'lucide-react';
import { QuoteConfig, InstallationOption, QuoteOption } from '../types';
import { PROVINCES } from '../constants';
import QuoteStep from './QuoteStep';
import UserInfoForm from './UserInfoForm';
import PaymentAndTerms from './PaymentAndTerms';
import StickyTotalBar from './StickyTotalBar';
import TermsModal from './TermsModal';
import InstallationSelector from './InstallationSelector';
import { useCurrency } from '../App';
import CustomQuoteTemplate from './CustomQuoteTemplate';


// --- Reusable Sub-components defined locally ---

const ImageSelector = ({ options, selectedOption, onSelect, gridCols = 'grid-cols-2 sm:grid-cols-3 gap-4', itemClassName = '' }: any) => {
  return (
    <div className={`grid ${gridCols}`}>
      {options.map((option: any) => (
        <label
          key={option.name}
          className={`relative border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedOption.name === option.name
              ? 'border-[#621330] shadow-lg scale-105'
              : 'border-gray-200 hover:border-gray-400'
          } ${itemClassName}`}
        >
          <input
            type="radio"
            name="style-selector"
            value={option.name}
            checked={selectedOption.name === option.name}
            onChange={() => onSelect(option)}
            className="sr-only"
          />
          <div className="aspect-square w-full overflow-hidden rounded-t-md">
            <img
              src={option.imageUrl}
              alt={option.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-3 text-center bg-white rounded-b-md">
            <p className="font-semibold text-sm text-gray-800">{option.name}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

const AccessorySelector = ({ options, selectedOptions, onSelectionChange }: any) => {
  const { formatPrice } = useCurrency();
  const handleSelection = (option: any) => {
    const isSelected = selectedOptions.some((item: any) => item.name === option.name);
    let newSelection;

    if (isSelected) {
      newSelection = selectedOptions.filter((item: any) => item.name !== option.name);
    } else {
      newSelection = [...selectedOptions, option];
    }
    onSelectionChange(newSelection);
  };

  const isSelected = (option: any) => selectedOptions.some((item: any) => item.name === option.name);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {options.map((option: any) => (
        <label
          key={option.name}
          className={`relative border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            isSelected(option)
              ? 'border-[#621330] shadow-lg scale-105'
              : 'border-gray-200 hover:border-gray-400'
          }`}
        >
          <input
            type="checkbox"
            checked={isSelected(option)}
            onChange={() => handleSelection(option)}
            className="sr-only"
          />
          <div className="aspect-square w-full overflow-hidden rounded-t-md">
            <img src={option.imageUrl} alt={option.name} className="w-full h-full object-contain" />
          </div>
          <div className="p-2 text-center bg-white rounded-b-md">
            <p className="font-semibold text-xs text-gray-800 leading-tight">{option.name}</p>
            <p className="text-xs text-gray-500">{formatPrice(option.price)}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

// --- Main Form Component ---

interface KitchenQuoteFormProps {
  onBack: () => void;
  quoteConfig: QuoteConfig;
}

const KitchenQuoteForm: React.FC<KitchenQuoteFormProps> = ({ onBack, quoteConfig }) => {
  const [formData, setFormData] = useState({
    kitchenSize: quoteConfig.kitchen.sizes[0],
    kitchenStyle: quoteConfig.kitchen.styles[0],
    kitchenCountertop: quoteConfig.kitchen.countertops[0],
    selectedSink: quoteConfig.kitchen.sinks[0],
    selectedFaucet: quoteConfig.kitchen.faucets[0],
    selectedAccessories: [] as QuoteOption[],
    installation: quoteConfig.general.installationOptions[3], // Default to "Sin instalación"
    userInfo: {
      name: '', email: '', phone: '', location: PROVINCES[0], observations: '',
    },
    paymentOption: quoteConfig.general.paymentOptions[0],
    termsAccepted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteForPrint, setQuoteForPrint] = useState<React.ReactNode | null>(null);
  const { formatPrice } = useCurrency();

  const subtotal = useMemo(() => {
    const { kitchenSize, kitchenStyle, kitchenCountertop, installation, selectedSink, selectedFaucet, selectedAccessories } = formData;
    const baseTotal = (kitchenSize.price * (kitchenStyle.multiplier || 1)) + 
                      (kitchenSize.price * (kitchenCountertop.multiplier || 0)) + 
                      (kitchenSize.price * installation.multiplier);
    const accessoriesTotal = selectedAccessories.reduce((sum: number, acc: { price: number }) => sum + acc.price, 0);
    const sinkPrice = selectedSink.price;
    const faucetPrice = selectedFaucet.price;
    return baseTotal + sinkPrice + faucetPrice + accessoriesTotal;
  }, [formData]);

  const itbis = useMemo(() => subtotal * 0.18, [subtotal]);
  const totalPrice = useMemo(() => subtotal + itbis, [subtotal, itbis]);

  const handleUserInfoChange = useCallback((field: keyof typeof formData.userInfo, value: string) => {
    setFormData(prev => ({ ...prev, userInfo: { ...prev.userInfo, [field]: value } }));
  }, []);

  const getQuoteDetails = () => [
    { label: "Tamaño de Cocina", value: formData.kitchenSize.name },
    { label: "Estilo", value: formData.kitchenStyle.name },
    { label: "Tope", value: formData.kitchenCountertop.name },
    { label: "Fregadero", value: formData.selectedSink.name },
    { label: "Mezcladora", value: formData.selectedFaucet.name },
    { label: "Accesorios", value: formData.selectedAccessories.map(a => a.name).join(', ') || 'Ninguno' },
    { label: "Instalación", value: formData.installation.label },
  ];

  const validateForm = () => {
    if (!formData.termsAccepted) {
      alert("Por favor, acepte los términos y condiciones para continuar.");
      return false;
    }
    return true;
  };

  const handleDownloadPDF = () => {
    if (!validateForm()) return;
    setQuoteForPrint(<CustomQuoteTemplate title="Cotización de Cocina" userInfo={formData.userInfo} details={getQuoteDetails()} subtotal={subtotal} />);
    setTimeout(() => { window.print(); setQuoteForPrint(null); }, 100);
  };
  
  const handleSendWhatsApp = () => {
    if (!validateForm()) return;
    let message = `*Cotización de Cocina - Decora Group*\n\n`;
    message += `Hola, me gustaría solicitar una cotización con los siguientes detalles:\n\n`;
    message += `*Cliente:* ${formData.userInfo.name}\n\n`;
    getQuoteDetails().forEach(detail => { message += `- ${detail.label}: ${detail.value}\n`; });
    message += `\n*Subtotal:* ${formatPrice(subtotal)}\n*ITBIS (18%):* ${formatPrice(itbis)}\n*Total Estimado:* ${formatPrice(totalPrice)}`;
    const whatsappUrl = `https://wa.me/18494561963?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendEmail = () => {
    if (!validateForm()) return;
    const subject = `Nueva Cotización de Cocina para ${formData.userInfo.name}`;
    let body = `Se ha generado una nueva solicitud de cotización de Cocina:\n\n`;
    body += `*Cliente:* ${formData.userInfo.name}\n*Email:* ${formData.userInfo.email}\n*Teléfono:* ${formData.userInfo.phone}\n\n`;
    getQuoteDetails().forEach(detail => { body += `- ${detail.label}: ${detail.value}\n`; });
    body += `\nSubtotal: ${formatPrice(subtotal)}\nITBIS (18%): ${formatPrice(itbis)}\nTotal Estimado: ${formatPrice(totalPrice)}`;
    const mailtoLink = `mailto:decoragrouppc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="bg-gray-50 pb-28">
      {quoteForPrint && <div className="hidden">{quoteForPrint}</div>}
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </button>
        </div>
        
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Cotizador de Cocinas</h1>
            <p className="mt-2 text-gray-600">Recibe el estimado para la realización de tu proyecto de cocina personalizado.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
            <QuoteStep title="1.- Selecciona la cantidad de módulos:" subtitle="¡El tamaño si importa!">
              <ImageSelector options={quoteConfig.kitchen.sizes} selectedOption={formData.kitchenSize} onSelect={(val: any) => setFormData(p => ({...p, kitchenSize: val}))} />
            </QuoteStep>

            <QuoteStep title="2.- ¿Qué estilo buscas?">
               <ImageSelector options={quoteConfig.kitchen.styles} selectedOption={formData.kitchenStyle} onSelect={(val: any) => setFormData(p => ({...p, kitchenStyle: val}))} gridCols="grid-cols-2 lg:grid-cols-4 gap-4" />
            </QuoteStep>
            
            <QuoteStep title="3.- ¿Qué tope prefieres?">
               <ImageSelector options={quoteConfig.kitchen.countertops} selectedOption={formData.kitchenCountertop} onSelect={(val: any) => setFormData(p => ({...p, kitchenCountertop: val}))} gridCols="grid-cols-2 lg:grid-cols-4 gap-4" />
            </QuoteStep>

            <QuoteStep title="4.- ¿Qué tipo de fregadero te gustaría?">
                <ImageSelector options={quoteConfig.kitchen.sinks} selectedOption={formData.selectedSink} onSelect={(val: any) => setFormData(p => ({...p, selectedSink: val}))} />
            </QuoteStep>
            
            <QuoteStep title="5.- Cuéntanos de la mezcladora:">
                <ImageSelector options={quoteConfig.kitchen.faucets} selectedOption={formData.selectedFaucet} onSelect={(val: any) => setFormData(p => ({...p, selectedFaucet: val}))} gridCols="grid-cols-2 sm:grid-cols-3 gap-4" />
            </QuoteStep>

            <QuoteStep title="6.- Optimización y Accesorios:">
                <AccessorySelector options={quoteConfig.kitchen.accessories} selectedOptions={formData.selectedAccessories} onSelectionChange={(val: any) => setFormData(p => ({...p, selectedAccessories: val}))} />
            </QuoteStep>
            
            <QuoteStep title="7.- ¿Qué instalación requieres?">
                 <InstallationSelector options={quoteConfig.general.installationOptions} selectedValue={formData.installation} onChange={(option: InstallationOption) => setFormData(p => ({...p, installation: option}))} />
            </QuoteStep>

            <QuoteStep title="8.- Datos del usuario:">
                <UserInfoForm userData={formData.userInfo} onUserDataChange={handleUserInfoChange} />
            </QuoteStep>

            <PaymentAndTerms
                paymentOptions={quoteConfig.general.paymentOptions}
                selectedOption={formData.paymentOption}
                onPaymentChange={(option) => setFormData(p => ({ ...p, paymentOption: option }))}
                termsAccepted={formData.termsAccepted}
                onTermsChange={(accepted) => setFormData(p => ({ ...p, termsAccepted: accepted }))}
                onShowTerms={() => setIsModalOpen(true)}
            />

            <div className="border-t border-gray-200 pt-8 space-y-4">
                <h3 className="text-lg font-medium text-center text-gray-900">Finalizar Cotización</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <button type="button" onClick={handleDownloadPDF} disabled={!formData.termsAccepted} className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-3 px-4 rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <Download className="h-5 w-5" /> Descargar PDF
                    </button>
                    <button type="button" onClick={handleSendWhatsApp} disabled={!formData.termsAccepted} className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed">
                        <MessageSquare className="h-5 w-5" /> Enviar por WhatsApp
                    </button>
                     <button type="button" onClick={handleSendEmail} disabled={!formData.termsAccepted} className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed">
                        <Mail className="h-5 w-5" /> Enviar por Correo
                    </button>
                </div>
                {!formData.termsAccepted && <p className="text-xs text-red-600 text-center">Debe aceptar los términos y condiciones para continuar.</p>}
            </div>
          </form>
        </div>
      </div>
      <StickyTotalBar total={totalPrice} />
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default KitchenQuoteForm;