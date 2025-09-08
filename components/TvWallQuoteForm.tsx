import React, { useState, useMemo, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { TV_WALL_STYLES, INSTALLATION_OPTIONS, PAYMENT_OPTIONS, PROVINCES } from '../constants';
import QuoteStep from './QuoteStep';
import NumberInputWithControls from './NumberInputWithControls';
import StyleSelector from './StyleSelector';
import InstallationSelector from './InstallationSelector';
import UserInfoForm from './UserInfoForm';
import PaymentAndTerms from './PaymentAndTerms';
import StickyTotalBar from './StickyTotalBar';
import TermsModal from './TermsModal';

interface TvWallQuoteFormProps {
  onBack: () => void;
}

const TvWallQuoteForm: React.FC<TvWallQuoteFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    width: 100,
    height: 100,
    selectedStyle: TV_WALL_STYLES[0],
    selectedInstallation: INSTALLATION_OPTIONS[0],
    userInfo: {
      name: '',
      email: '',
      phone: '',
      location: PROVINCES[0],
      observations: '',
    },
    paymentOption: PAYMENT_OPTIONS[0],
    termsAccepted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const wallM2 = useMemo(() => {
    return (formData.width * formData.height) / 10000;
  }, [formData.width, formData.height]);

  const totalPrice = useMemo(() => {
    const stylePrice = formData.selectedStyle.price;
    const installationPrice = formData.selectedInstallation.price;
    return (wallM2 * stylePrice) + installationPrice;
  }, [wallM2, formData.selectedStyle, formData.selectedInstallation]);

  const handleInputChange = useCallback((field: keyof typeof formData.userInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        [field]: value,
      },
    }));
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
        alert("Por favor, acepte los términos y condiciones.");
        return;
    }
    // Handle form submission logic, e.g., sending data to a server
    console.log("Form submitted:", { ...formData, wallM2, totalPrice });
    alert(`¡Cotización enviada! El total estimado es $${totalPrice.toFixed(2)} USD.`);
  };

  return (
    <main className="bg-gray-50 pb-28"> {/* Padding bottom to avoid overlap with sticky bar */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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

          <form onSubmit={handleSubmit} className="space-y-12">
            <QuoteStep title="1.- Selecciona el tamaño de tu pared:" subtitle="¡El tamaño si importa!">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <img src="https://hom.com.do/wp-content/uploads/2024/08/tamano-de-pared.jpg" alt="Medición de pared" className="rounded-lg shadow-md w-full" />
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
                    styles={TV_WALL_STYLES}
                    selectedStyle={formData.selectedStyle}
                    onSelect={(style) => setFormData(p => ({ ...p, selectedStyle: style }))}
                />
            </QuoteStep>
            
            <QuoteStep title="3.- ¿Qué instalación requieres?">
                <InstallationSelector
                    options={INSTALLATION_OPTIONS}
                    selectedValue={formData.selectedInstallation}
                    onChange={(option) => setFormData(p => ({ ...p, selectedInstallation: option }))}
                />
            </QuoteStep>

            <QuoteStep title="4.- Datos del usuario:">
                <UserInfoForm
                    userData={formData.userInfo}
                    onUserDataChange={handleInputChange}
                />
            </QuoteStep>
            
            <PaymentAndTerms
                paymentOptions={PAYMENT_OPTIONS}
                selectedOption={formData.paymentOption}
                onPaymentChange={(option) => setFormData(p => ({ ...p, paymentOption: option }))}
                termsAccepted={formData.termsAccepted}
                onTermsChange={(accepted) => setFormData(p => ({ ...p, termsAccepted: accepted }))}
                onShowTerms={() => setIsModalOpen(true)}
                onSubmit={()=>{}}
            />
          </form>
        </div>
      </div>
      <StickyTotalBar total={totalPrice} />
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default TvWallQuoteForm;
