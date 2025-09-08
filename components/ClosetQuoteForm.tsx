import React, { useState, useMemo, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CLOSET_TYPES, CLOSET_MODULES, CLOSET_ACCESSORIES, INSTALLATION_OPTIONS, PAYMENT_OPTIONS, PROVINCES } from '../constants';
import QuoteStep from './QuoteStep';
import NumberInputWithControls from './NumberInputWithControls';
import ClosetTypeSelector from './ClosetTypeSelector';
import ModuleSelector from './ModuleSelector';
import InstallationSelector from './InstallationSelector';
import UserInfoForm from './UserInfoForm';
import PaymentAndTerms from './PaymentAndTerms';
import StickyTotalBar from './StickyTotalBar';
import TermsModal from './TermsModal';

interface ClosetQuoteFormProps {
  onBack: () => void;
}

const ClosetQuoteForm: React.FC<ClosetQuoteFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    closetType: CLOSET_TYPES[0],
    wallA: 100,
    wallB: 100,
    selectedModules: [],
    selectedAccessories: [],
    installation: INSTALLATION_OPTIONS.find(o => o.label.includes('vacío')) || INSTALLATION_OPTIONS[0],
    userInfo: {
      name: '', email: '', phone: '', location: PROVINCES[0], observations: '',
    },
    paymentOption: PAYMENT_OPTIONS[0],
    termsAccepted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closetM2 = useMemo(() => (formData.wallA * formData.wallB) / 10000, [formData.wallA, formData.wallB]);
  const moduleCapacity = useMemo(() => formData.closetType.value, [formData.closetType]);

  const totalPrice = useMemo(() => {
    const modulesValue = formData.selectedModules.reduce((sum, module) => sum + module.price, 0);
    const accessoriesValue = formData.selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
    const installationMultiplier = formData.installation.multiplier;

    // Formula: (((modules_sum * closet_sqm) / 4) + (closet_capacity * installation_multiplier) + accessories_sum)
    const total = ((modulesValue * closetM2) / 4) + (moduleCapacity * installationMultiplier) + accessoriesValue;
    return total;
  }, [formData, closetM2, moduleCapacity]);

  const handleUserInfoChange = useCallback((field: keyof typeof formData.userInfo, value: string) => {
    setFormData(prev => ({ ...prev, userInfo: { ...prev.userInfo, [field]: value } }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Por favor, acepte los términos y condiciones.");
      return;
    }
    if (formData.selectedModules.length > moduleCapacity) {
      alert(`Ha seleccionado más módulos (${formData.selectedModules.length}) de los permitidos para este tipo de closet (${moduleCapacity}).`);
      return;
    }
    console.log("Closet form submitted:", { ...formData, closetM2, totalPrice });
    alert(`¡Cotización de closet enviada! El total estimado es $${totalPrice.toFixed(2)} USD.`);
  };

  return (
    <main className="bg-gray-50 pb-28">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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

          <form onSubmit={handleSubmit} className="space-y-12">
            <QuoteStep title="1.- Selecciona tu tipo de closet:">
              <ClosetTypeSelector
                types={CLOSET_TYPES}
                selectedType={formData.closetType}
                onSelect={(type) => setFormData(p => ({ ...p, closetType: type, selectedModules: [] }))} // Reset modules on type change
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
                                {closetM2.toFixed(2)} Metros Cuadrados (m²)
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
                options={CLOSET_MODULES}
                selectedOptions={formData.selectedModules}
                onSelectionChange={(selection) => setFormData(p => ({...p, selectedModules: selection}))}
                selectionLimit={moduleCapacity}
            />

            <ModuleSelector
                title="5.- Accesorios del closet:"
                options={CLOSET_ACCESSORIES}
                selectedOptions={formData.selectedAccessories}
                onSelectionChange={(selection) => setFormData(p => ({...p, selectedAccessories: selection}))}
            />

            <QuoteStep title="6.- ¿Qué instalación requieres?">
                <InstallationSelector options={INSTALLATION_OPTIONS} selectedValue={formData.installation} onChange={(option) => setFormData(p => ({...p, installation: option}))} />
            </QuoteStep>
            
            <QuoteStep title="7.- Datos del usuario:">
                <UserInfoForm userData={formData.userInfo} onUserDataChange={handleUserInfoChange} />
            </QuoteStep>

            <PaymentAndTerms
                paymentOptions={PAYMENT_OPTIONS}
                selectedOption={formData.paymentOption}
                onPaymentChange={(option) => setFormData(p => ({ ...p, paymentOption: option }))}
                termsAccepted={formData.termsAccepted}
                onTermsChange={(accepted) => setFormData(p => ({ ...p, termsAccepted: accepted }))}
                onShowTerms={() => setIsModalOpen(true)}
                onSubmit={() => {}}
            />
          </form>
        </div>
      </div>
      <StickyTotalBar total={totalPrice} />
      <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default ClosetQuoteForm;