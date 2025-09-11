import React, { useState, useEffect } from 'react';
import { User, Building, Send } from 'lucide-react';
import { PROJECT_TYPES_CONTACT, DOMINICAN_REPUBLIC_LOCATIONS } from '../constants';
import { ContactContent } from '../types';

// FIX: Added props to the component to make it dynamic and fix type errors.
interface ContactFormProps {
  content: ContactContent;
}

const ContactForm: React.FC<ContactFormProps> = ({ content }) => {
  const [personType, setPersonType] = useState<'individual' | 'company'>('individual');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  
  useEffect(() => {
    if (selectedProvince && DOMINICAN_REPUBLIC_LOCATIONS[selectedProvince as keyof typeof DOMINICAN_REPUBLIC_LOCATIONS]) {
      setMunicipalities(DOMINICAN_REPUBLIC_LOCATIONS[selectedProvince as keyof typeof DOMINICAN_REPUBLIC_LOCATIONS]);
    } else {
      setMunicipalities([]);
    }
  }, [selectedProvince]);

  const inputClasses = "mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5a1e38] focus:border-[#5a1e38] sm:text-sm";

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{content.formTitle}</h2>
        <p className="mt-1 text-sm text-gray-600">{content.formSubtitle}</p>
      </div>
      
      <form className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Soy:*</label>
          <div className="mt-2 flex items-center space-x-6">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="personType" value="individual" checked={personType === 'individual'} onChange={() => setPersonType('individual')} className="h-4 w-4 text-[#5a1e38] focus:ring-[#5a1e38] border-gray-300"/>
              <User className="h-5 w-5 mx-2 text-gray-600" />
              <span className="text-sm text-gray-700">Persona Física</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="personType" value="company" checked={personType === 'company'} onChange={() => setPersonType('company')} className="h-4 w-4 text-[#5a1e38] focus:ring-[#5a1e38] border-gray-300"/>
              <Building className="h-5 w-5 mx-2 text-gray-600" />
              <span className="text-sm text-gray-700">Empresa</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo*</label>
          <input type="text" name="name" id="name" placeholder="Tu nombre" required className={inputClasses} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
            <input type="email" name="email" id="email" placeholder="tu@email.com" required className={inputClasses} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono*</label>
            <input type="tel" name="phone" id="phone" placeholder="Tu teléfono" required className={inputClasses} />
          </div>
        </div>
        
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Tipo de proyecto</label>
          <select id="projectType" name="projectType" className={inputClasses}>
            <option>Selecciona un tipo</option>
            {PROJECT_TYPES_CONTACT.map(type => <option key={type}>{type}</option>)}
          </select>
        </div>
        
        <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
            <div className={`${inputClasses} bg-gray-100 flex items-center cursor-not-allowed`}>
                <span className="mr-2">🇩🇴</span> República Dominicana
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700">Provincia</label>
                <select id="province" name="province" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} className={inputClasses}>
                    <option value="">Selecciona una provincia</option>
                    {Object.keys(DOMINICAN_REPUBLIC_LOCATIONS).map(prov => <option key={prov} value={prov}>{prov}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">Municipio</label>
                <select id="municipality" name="municipality" disabled={!selectedProvince} className={`${inputClasses} disabled:bg-gray-100`}>
                    <option value="">Selecciona un municipio</option>
                    {municipalities.map(mun => <option key={mun} value={mun}>{mun}</option>)}
                </select>
            </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección (Opcional)</label>
          <input type="text" name="address" id="address" placeholder="Calle, número, sector..." className={inputClasses} />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
          <textarea id="message" name="message" rows={4} className={inputClasses} placeholder="Cuéntanos sobre tu proyecto..."></textarea>
        </div>
        
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5a1e38] hover:bg-[#4d182e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38] transition-colors">
            <Send className="h-4 w-4 mr-2" />
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
