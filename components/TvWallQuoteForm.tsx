import React, { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, Download, MessageSquare, Mail } from 'lucide-react';
import { QuoteConfig, QuoteOption, InstallationOption } from '../types';
import { PROVINCES } from '../constants';
import QuoteStep from './QuoteStep';
import NumberInputWithControls from './NumberInputWithControls';
import StyleSelector from './StyleSelector';
import InstallationSelector from './InstallationSelector';
import UserInfoForm from './UserInfoForm';
import PaymentAndTerms from './PaymentAndTerms';
import StickyTotalBar from './StickyTotalBar';
import TermsModal from './TermsModal';
import CustomQuoteTemplate from './CustomQuoteTemplate';
import { useCurrency } from '../App';


interface TvWallQuoteFormProps {
  onBack: () => void;
  quoteConfig: QuoteConfig;
}

const TvWallQuoteForm: React.FC<TvWallQuoteFormProps> = ({ onBack, quoteConfig }) => {
  const [formData, setFormData] = useState({
    width: 100,
    height: 100,
    selectedStyle: quoteConfig.tvWall.styles[0],
    selectedInstallation: quoteConfig.general.installationOptions[0],
    userInfo: {
      name: '',
      email: '',
      phone: '',
      location: PROVINCES[0],
      observations: '',
    },
    paymentOption: quoteConfig.general.paymentOptions[0],
    termsAccepted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteForPrint, setQuoteForPrint] = useState<React.ReactNode | null>(null);
  const { formatPrice } = useCurrency();

  const wallM2 = useMemo(() => {
    return (formData.width * formData.height) / 10000;
  }, [formData.width, formData.height]);

  const subtotal = useMemo(() => {
    const stylePrice = formData.selectedStyle.price;
    const installationPrice = formData.selectedInstallation.price;
    return (wallM2 * stylePrice) + installationPrice;
  }, [wallM2, formData.selectedStyle, formData.selectedInstallation]);
  
  const itbis = useMemo(() => subtotal * 0.18, [subtotal]);
  const totalPrice = useMemo(() => subtotal + itbis, [subtotal, itbis]);

  const handleInputChange = useCallback((field: keyof typeof formData.userInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        [field]: value,
      },
    }));
  }, []);
  
  const getQuoteDetails = () => [
    { label: "Ancho de la pared", value: `${formData.width} cm` },
    { label: "Alto de la pared", value: `${formData.height} cm` },
    { label: "Metros Cuadrados", value: `${wallM2.toFixed(2)} m²` },
    { label: "Estilo seleccionado", value: formData.selectedStyle.name },
    { label: "Tipo de instalación", value: formData.selectedInstallation.label },
    { label: "Opción de pago", value: formData.paymentOption },
  ];

  const handleDownloadPDF = () => {
    if (!formData.termsAccepted) {
        alert("Por favor, acepte los términos y condiciones para continuar.");
        return;
    }
    const details = getQuoteDetails();
    setQuoteForPrint(
      <CustomQuoteTemplate 
        title="Cotización de TV Wall" 
        userInfo={formData.userInfo} 
        details={details} 
        subtotal={subtotal}
        templateConfig={quoteConfig.template}
        logoUrl="https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-01.png?alt=media&token=790f60ef-0216-4181-ac70-bf781394543a"
      />
    );
    setTimeout(() => {
        window.print();
        setQuoteForPrint(null);
    }, 100);
  };
  
  const handleSendWhatsApp = () => {
    if (!formData.termsAccepted) {
        alert("Por favor, acepte los términos y condiciones para continuar.");
        return;
    }
    let message = `*Cotización de TV Wall - Decora Group*\n\n`;
    message += `Hola, me gustaría solicitar una cotización con los siguientes detalles:\n\n`;
    message += `*Cliente:* ${formData.userInfo.name}\n`;
    message += `*Email:* ${formData.userInfo.email}\n`;
    message += `*Teléfono:* ${formData.userInfo.phone}\n\n`;
    message += `*Detalles del Proyecto:*\n`;
    getQuoteDetails().forEach(detail => {
        message += `- ${detail.label}: ${detail.value}\n`;
    });
    message += `\n*Subtotal:* ${formatPrice(subtotal)}\n`;
    if (quoteConfig.template.visibility.showTax) {
      message += `*ITBIS (18%):* ${formatPrice(itbis)}\n`;
      message += `*Total Estimado:* ${formatPrice(totalPrice)}\n\n`;
    } else {
      message += `*Total Estimado:* ${formatPrice(subtotal)}\n\n`;
    }
    message += `_Observaciones: ${formData.userInfo.observations || 'N/A'}_`;

    const whatsappUrl = `https://wa.me/18494561963?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendEmail = () => {
     if (!formData.termsAccepted) {
        alert("Por favor, acepte los términos y condiciones para continuar.");
        return;
    }
    const subject = `Nueva Cotización de TV Wall para ${formData.userInfo.name}`;
    let body = `Se ha generado una nueva solicitud de cotización de TV Wall:\n\n`;
    body += `*Cliente:* ${formData.userInfo.name}\n`;
    body += `*Email:* ${formData.userInfo.email}\n`;
    body += `*Teléfono:* ${formData.userInfo.phone}\n\n`;
    body += `*Detalles del Proyecto:*\n`;
    getQuoteDetails().forEach(detail => {
        body += `- ${detail.label}: ${detail.value}\n`;
    });
    body += `\n*Subtotal:* ${formatPrice(subtotal)}\n`;
    if (quoteConfig.template.visibility.showTax) {
      body += `*ITBIS (18%):* ${formatPrice(itbis)}\n`;
      body += `*Total Estimado:* ${formatPrice(totalPrice)}\n\n`;
    } else {
      body += `*Total Estimado:* ${formatPrice(subtotal)}\n\n`;
    }
    body += `Observaciones: ${formData.userInfo.observations || 'N/A'}`;

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
            <h1 className="text-3xl font-bold text-gray-900">Cotizador de TV Wall</h1>
            <p className="mt-2 text-gray-600">Recibe el estimado para la realización de tu proyecto de mobiliario personalizado.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
            <QuoteStep title="1.- Selecciona el tamaño de tu pared:" subtitle="¡El tamaño si importa!">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <img src="https://hom.com.do/wp-content/uploads/2024/08/tamano-de-pared.jpg" alt="Ilustración de cómo medir el alto y ancho de una pared" className="rounded-lg shadow-md w-full" />
                <div className="space-y-6">
                  <NumberInputWithControls
                    label="Ancho en cm ↕️"
                    value={formData.width}
                    onChange={(val) => setFormData(p => ({ ...p, width: val }))}
                    min={100}
                    max={700}
                    step={50}
                    unit="cm"
                  />
                   <NumberInputWithControls
                    label="Alto en cm ↔️"
                    value={formData.height}
                    onChange={(val) => setFormData(p => ({ ...p, height: val }))}
                    min={100}
                    max={400}
                    step={50}
                    unit="cm"
                  />
                  <div className="flex items-center justify-between gap-4">
                    <label className="block text-sm font-medium text-gray-700">Su pared tiene</label>
                    <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-semibold w-full max-w-[200px] text-left">
                      {wallM2.toFixed(2)} Metros Cuadrados (m²)
                    </div>
                  </div>
                </div>
              </div>
            </QuoteStep>

            <QuoteStep title="2.- Elige el estilo que buscas:">
                <StyleSelector 
                    styles={quoteConfig.tvWall.styles}
                    selectedStyle={formData.selectedStyle}
                    onSelect={(style: QuoteOption) => setFormData(p => ({ ...p, selectedStyle: style }))}
                />
            </QuoteStep>
            
            <QuoteStep title="3.- ¿Qué instalación requieres?">
                <InstallationSelector
                    options={quoteConfig.general.installationOptions}
                    selectedValue={formData.selectedInstallation}
                    onChange={(option: InstallationOption) => setFormData(p => ({ ...p, selectedInstallation: option }))}
                />
            </QuoteStep>

            <QuoteStep title="4.- Datos del usuario:">
                <UserInfoForm
                    userData={formData.userInfo}
                    onUserDataChange={handleInputChange}
                />
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

export default TvWallQuoteForm;