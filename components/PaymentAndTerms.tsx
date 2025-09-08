import React from 'react';

interface PaymentAndTermsProps {
    paymentOptions: string[];
    selectedOption: string;
    onPaymentChange: (option: string) => void;
    termsAccepted: boolean;
    onTermsChange: (accepted: boolean) => void;
    onShowTerms: () => void;
    onSubmit: () => void;
}

const PaymentAndTerms: React.FC<PaymentAndTermsProps> = ({
    paymentOptions,
    selectedOption,
    onPaymentChange,
    termsAccepted,
    onTermsChange,
    onShowTerms,
    onSubmit
}) => {
  return (
    <div className="border-t border-gray-200 pt-8 space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Opciones de Pago*</h3>
        <div className="mt-4 space-y-3">
            {paymentOptions.map((option) => (
                <label key={option} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:bg-red-50 has-[:checked]:border-red-300">
                    <input
                        type="radio"
                        name="payment-option"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => onPaymentChange(option)}
                        className="h-4 w-4 text-[#621330] focus:ring-red-400 border-gray-300"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">{option}</span>
                </label>
            ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 space-y-4">
        <button type="button" onClick={onShowTerms} className="text-sm font-medium text-[#621330] hover:underline">
          Ver términos y condiciones
        </button>
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => onTermsChange(e.target.checked)}
                    className="focus:ring-[#621330] h-4 w-4 text-[#621330] border-gray-300 rounded"
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                    He revisado y leído los términos y condiciones de uso de este servicio y estoy de acuerdo.*
                </label>
            </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6">
        <button
          type="submit"
          className="bg-[#621330] text-white font-bold py-3 px-10 rounded-lg shadow-md hover:bg-[#4a0e24] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!termsAccepted}
        >
          Cotizar
        </button>
      </div>
    </div>
  );
};

export default PaymentAndTerms;
