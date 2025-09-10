import React, { useState, useMemo, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { 
    KITCHEN_SIZES, 
    KITCHEN_STYLES, 
    KITCHEN_COUNTERTOPS, 
    KITCHEN_SINKS,
    KITCHEN_FAUCETS,
    KITCHEN_ACCESSORIES,
    INSTALLATION_OPTIONS, 
    PAYMENT_OPTIONS, 
    PROVINCES 
} from '../constants';
import QuoteStep from './QuoteStep';
import UserInfoForm from './UserInfoForm';
import PaymentAndTerms from './PaymentAndTerms';
import StickyTotalBar from './StickyTotalBar';
import TermsModal from './TermsModal';
import InstallationSelector from './InstallationSelector';
import { useCurrency } from '../App';

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
}

const KitchenQuoteForm: React.FC<KitchenQuoteFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    kitchenSize: KITCHEN_SIZES[0],
    kitchenStyle: KITCHEN_STYLES[0],
    kitchenCountertop: KITCHEN_COUNTERTOPS[0],
    selectedSink: KITCHEN_SINKS[0],
    selectedFaucet: KITCHEN_FAUCETS[0],
    selectedAccessories: [],
    installation: INSTALLATION_OPTIONS[3], // Default to "Sin instalación"
    userInfo: {
      name: '', email: '', phone: '', location: PROVINCES[0], observations: '',
    },
    paymentOption: PAYMENT_OPTIONS[0],
    termsAccepted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = useMemo(() => {
    const { kitchenSize, kitchenStyle, kitchenCountertop, installation, selectedSink, selectedFaucet, selectedAccessories } = formData;
    
    const baseTotal = (kitchenSize.price * kitchenStyle.multiplier) + 
                      (kitchenSize.price * kitchenCountertop.multiplier) + 
                      (kitchenSize.price * installation.multiplier);
                      
    const accessoriesTotal = selectedAccessories.reduce((sum: number, acc: { price: number }) => sum + acc.price, 0);

    const sinkPrice = selectedSink.price;
    const faucetPrice = selectedFaucet.price;

    return baseTotal + sinkPrice + faucetPrice + accessoriesTotal;
  }, [formData]);


  const handleUserInfoChange = useCallback((field: keyof typeof formData.userInfo, value: string) => {
    setFormData(prev => ({ ...prev, userInfo: { ...prev.userInfo, [field]: value } }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
        alert("Por favor, acepte los términos y condiciones.");
        return;
    }
    console.log("Kitchen Form Submitted:", { ...formData, totalPrice });
    alert(`¡Cotización de cocina enviada! El total estimado es $${totalPrice.toFixed(2)} USD.`);
  };

  return (
    <main className="bg-gray-50 pb-28">
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

          <form onSubmit={handleSubmit} className="space-y-12">
            <QuoteStep title="1.- Selecciona la cantidad de módulos:" subtitle="¡El tamaño si importa!">
              <ImageSelector options={KITCHEN_SIZES} selectedOption={formData.kitchenSize} onSelect={(val: any) => setFormData(p => ({...p, kitchenSize: val}))} />
            </QuoteStep>

            <QuoteStep title="2.- ¿Qué estilo buscas?">
               <ImageSelector options={KITCHEN_STYLES} selectedOption={formData.kitchenStyle} onSelect={(val: any) => setFormData(p => ({...p, kitchenStyle: val}))} gridCols="grid-cols-2 lg:grid-cols-4 gap-4" />
            </QuoteStep>
            
            <QuoteStep title="3.- ¿Qué tope prefieres?">
               <ImageSelector options={KITCHEN_COUNTERTOPS} selectedOption={formData.kitchenCountertop} onSelect={(val: any) => setFormData(p => ({...p, kitchenCountertop: val}))} gridCols="grid-cols-2 lg:grid-cols-4 gap-4" />
            </QuoteStep>

            <QuoteStep title="4.- ¿Qué tipo de fregadero te gustaría?">
                <ImageSelector options={KITCHEN_SINKS} selectedOption={formData.selectedSink} onSelect={(val: any) => setFormData(p => ({...p, selectedSink: val}))} />
            </QuoteStep>
            
            <QuoteStep title="5.- Cuéntanos de la mezcladora:">
                <ImageSelector options={KITCHEN_FAUCETS} selectedOption={formData.selectedFaucet} onSelect={(val: any) => setFormData(p => ({...p, selectedFaucet: val}))} gridCols="grid-cols-2 sm:grid-cols-3 gap-4" />
            </QuoteStep>

            <QuoteStep title="6.- Optimización y Accesorios:">
                <AccessorySelector options={KITCHEN_ACCESSORIES} selectedOptions={formData.selectedAccessories} onSelectionChange={(val: any) => setFormData(p => ({...p, selectedAccessories: val}))} />
            </QuoteStep>
            
            <QuoteStep title="7.- ¿Qué instalación requieres?">
                 <InstallationSelector options={INSTALLATION_OPTIONS} selectedValue={formData.installation} onChange={(option) => setFormData(p => ({...p, installation: option}))} />
            </QuoteStep>

            <QuoteStep title="8.- Datos del usuario:">
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

export default KitchenQuoteForm;
