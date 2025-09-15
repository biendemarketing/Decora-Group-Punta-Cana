import React, { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, Download, MessageSquare, Mail } from 'lucide-react';
import { QuoteConfig, ClosetTypeOption, InstallationOption, QuoteOption } from '../types';
import { PROVINCES } from '../constants';
import QuoteStep from './QuoteStep';
import NumberInputWithControls from './NumberInputWithControls';
import ClosetTypeSelector from './ClosetTypeSelector';
import ModuleSelector from './ModuleSelector';
import InstallationSelector from './InstallationSelector';
import UserInfoForm from './UserInfoForm';
import PaymentAndTerms from './PaymentAndTerms';
import StickyTotalBar from './StickyTotalBar';
import TermsModal from './TermsModal';
import CustomQuoteTemplate from './CustomQuoteTemplate';
import { useCurrency } from '../App';


interface ClosetQuoteFormProps {
  onBack: () => void;
  quoteConfig: QuoteConfig;
}

const ClosetQuoteForm: React.FC<ClosetQuoteFormProps> = ({ onBack, quoteConfig }) => {
  const [formData, setFormData] = useState({
    closetType: quoteConfig.closet.types[0],
    wallA: 100,
    wallB: 100,
    selectedModules: [] as QuoteOption[],
    selectedAccessories: [] as QuoteOption[],
    installation: quoteConfig.general.installationOptions.find(o => o.label.includes('vacío')) || quoteConfig.general.installationOptions[0],
    userInfo: {
      name: '', email: '', phone: '', location: PROVINCES[0], observations: '',
    },
    paymentOption: quoteConfig.general.paymentOptions[0],
    termsAccepted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteForPrint, setQuoteForPrint] = useState<React.ReactNode | null>(null);
  const { formatPrice } = useCurrency();

  const closetM2 = useMemo(() => (formData.wallA * formData.wallB) / 10000, [formData.wallA, formData.wallB]);
  const moduleCapacity = useMemo(() => formData.closetType.value, [formData.closetType]);

  const subtotal = useMemo(() => {
    const modulesValue = formData.selectedModules.reduce((sum, module) => sum + module.price, 0);
    const accessoriesValue = formData.selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
    const installationPrice = formData.installation.price;
    const modulesCost = formData.selectedModules.length > 0 ? (modulesValue * closetM2) / 4 : 0;
    return modulesCost + accessoriesValue + installationPrice;
  }, [formData, closetM2]);
  
  const itbis = useMemo(() => subtotal * 0.18, [subtotal]);
  const totalPrice = useMemo(() => subtotal + itbis, [subtotal, itbis]);

  const handleUserInfoChange = useCallback((field: keyof typeof formData.userInfo, value: string) => {
    setFormData(prev => ({ ...prev, userInfo: { ...prev.userInfo, [field]: value } }));
  }, []);

  const getQuoteDetails = () => [
    { label: "Tipo de Closet", value: formData.closetType.name },
    { label: "Pared A", value: `${formData.wallA} cm` },
    { label: "Pared B", value: `${formData.wallB} cm` },
    { label: "Metros Cuadrados", value: `${closetM2.toFixed(2)} m²` },
    { label: "Módulos Seleccionados", value: formData.selectedModules.map(m => m.name).join(', ') || 'N/A' },
    { label: "Accesorios Seleccionados", value: formData.selectedAccessories.map(a => a.name).join(', ') || 'N/A' },
    { label: "Instalación", value: formData.installation.label },
  ];

  const validateForm = () => {
    if (!formData.termsAccepted) {
      alert("Por favor, acepte los términos y condiciones para continuar.");
      return false;
    }
    if (formData.selectedModules.length > moduleCapacity) {
      alert(`Ha seleccionado más módulos (${formData.selectedModules.length}) de los permitidos para este tipo de closet (${moduleCapacity}).`);
      return false;
    }
    return true;
  };

  const handleDownloadPDF = () => {
    if (!validateForm()) return;
    setQuoteForPrint(
      <CustomQuoteTemplate 
        title="Cotización de Closet" 
        userInfo={formData.userInfo} 
        details={getQuoteDetails()} 
        subtotal={subtotal}
        templateConfig={quoteConfig.template}
        logoUrl="https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-01.png?alt=media&token=790f60ef-0216-4181-ac70-bf781394543a"
      />
    );
    setTimeout(() => { window.print(); setQuoteForPrint(null); }, 100);
  };
  
  const handleSendWhatsApp = () => {
    if (!validateForm()) return;
    let message = `*Cotización de Closet - Decora Group*\n\n`;
    message += `Hola, me gustaría solicitar una cotización con los siguientes detalles:\n\n`;
    message += `*Cliente:* ${formData.userInfo.name}\n\n`;
    getQuoteDetails().forEach(detail => { message += `- ${detail.label}: ${detail.value}\n`; });
    message += `\n*Subtotal:* ${formatPrice(subtotal)}\n`;
    if (quoteConfig.template.visibility.showTax) {
      message += `*ITBIS (18%):* ${formatPrice(itbis)}\n*Total Estimado:* ${formatPrice(totalPrice)}`;
    } else {
      message += `*Total Estimado:* ${formatPrice(subtotal)}`;
    }
    const whatsappUrl = `https://wa.me/18494561963?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendEmail = () => {
    if (!validateForm()) return;
    const subject = `Nueva Cotización de Closet para ${formData.userInfo.name}`;
    let body = `Se ha generado una nueva solicitud de cotización de Closet:\n\n`;
    body += `*Cliente:* ${formData.userInfo.name}\n*Email:* ${formData.userInfo.email}\n*Teléfono:* ${formData.userInfo.phone}\n\n`;
    getQuoteDetails().forEach(detail => { body += `- ${detail.label}: ${detail.value}\n`; });
    body += `\nSubtotal: ${formatPrice(subtotal)}\n`;
    if (quoteConfig.template.visibility.showTax) {
      body += `ITBIS (18%): ${formatPrice(itbis)}\nTotal Estimado: ${formatPrice(totalPrice)}`;
    } else {
      body += `Total Estimado: ${formatPrice(subtotal)}`;
    }
    const mailtoLink = `mailto:decoragrouppc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };


  return (
    <main className="bg-gray-50 pb-28">
      {quoteForPrint && <div className="hidden">{quoteForPrint}</div>}
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
          </button>
        </div>
        
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Cotizador de Closets</h1>
            <p className="mt-2 text-gray-600">Recibe el estimado para la realización de tu proyecto personalizado.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
            <QuoteStep title="1.- Selecciona tu tipo de closet:">
              <ClosetTypeSelector
                types={quoteConfig.closet.types}
                selectedType={formData.closetType}
                onSelect={(type: ClosetTypeOption) => setFormData(p => ({ ...p, closetType: type, selectedModules: [] }))}
              />
            </QuoteStep>

            <QuoteStep title="2.- ¿Cuál es el tamaño de tu closet?">
                <p className="text-sm text-gray-600 mb-6">Toma una cinta métrica y, mide las dos paredes de tu closet. La pared más extensa será el largo y la otra el ancho, asegúrate de medir en <strong>centímetros</strong>.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <img src="https://hom.com.do/wp-content/uploads/2025/05/closet-u.jpg" alt="Ilustración de cómo medir las paredes de un closet tipo U" className="rounded-lg shadow-md w-full" />
                    <div className="space-y-6">
                        <NumberInputWithControls label="Pared A en cm ↕️" value={formData.wallA} onChange={(val) => setFormData(p => ({...p, wallA: val}))} min={100} max={700} step={10} unit="cm" />
                        <NumberInputWithControls label="Pared B en cm ↔️" value={formData.wallB} onChange={(val) => setFormData(p => ({...p, wallB: val}))} min={100} max={700} step={10} unit="cm" />
                        <div className="flex items-center justify-between gap-4">
                            <label className="block text-sm font-medium text-gray-700">Su closet mide</label>
                            <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-semibold w-full max-w-[200px] text-left">
                                {closetM2.toFixed(2)} m²
                            </div>
                        </div>
                    </div>
                </div>
            </QuoteStep>

            <QuoteStep title="3.- Cantidad de módulos:">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <img src="https://hom.com.do/wp-content/uploads/2025/05/medida-de-closet-768x768.jpg" alt="Ilustración que muestra la capacidad de módulos de un closet" className="rounded-lg shadow-md w-full" />
                    <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-900">Basándonos en tu tipo de closet y las medidas suministradas, <span className="text-[#621330]">tu closet</span> tiene una capacidad para:</h3>
                        <p className="text-5xl font-bold text-gray-900 my-4">{moduleCapacity} <span className="text-3xl font-medium text-gray-700">Módulos</span></p>
                    </div>
                </div>
            </QuoteStep>

            <ModuleSelector
                title="4.- Módulos de tu closet:"
                description="Selecciona los módulos que te gustaría tener en tu closet."
                options={quoteConfig.closet.modules}
                selectedOptions={formData.selectedModules}
                onSelectionChange={(selection) => setFormData(p => ({...p, selectedModules: selection}))}
                selectionLimit={moduleCapacity}
            />

            <ModuleSelector
                title="5.- Accesorios del closet:"
                options={quoteConfig.closet.accessories}
                selectedOptions={formData.selectedAccessories}
                onSelectionChange={(selection) => setFormData(p => ({...p, selectedAccessories: selection}))}
            />

            <QuoteStep title="6.- ¿Qué instalación requieres?">
                <InstallationSelector options={quoteConfig.general.installationOptions} selectedValue={formData.installation} onChange={(option: InstallationOption) => setFormData(p => ({...p, installation: option}))} />
            </QuoteStep>
            
            <QuoteStep title="7.- Datos del usuario:">
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
      <StickyTotalBar total={quoteConfig.template.visibility.showTax ? totalPrice : subtotal} />
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default ClosetQuoteForm;