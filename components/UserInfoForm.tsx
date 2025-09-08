import React from 'react';
import { PROVINCES } from '../constants';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  observations: string;
}

interface UserInfoFormProps {
  userData: UserInfo;
  onUserDataChange: (field: keyof UserInfo, value: string) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ userData, onUserDataChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUserDataChange(name as keyof UserInfo, value);
  };
  
  const inputClasses = "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#621330] focus:border-[#621330] sm:text-sm p-3 bg-white text-gray-900";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo*</label>
        <input type="text" name="name" id="name" required value={userData.name} onChange={handleInputChange} className={inputClasses} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
        <input type="email" name="email" id="email" required value={userData.email} onChange={handleInputChange} className={inputClasses} />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono*</label>
        <input type="tel" name="phone" id="phone" required value={userData.phone} onChange={handleInputChange} className={inputClasses} />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lugar de Instalación</label>
        <select id="location" name="location" value={userData.location} onChange={handleInputChange} className={inputClasses}>
          {PROVINCES.map(province => <option key={province}>{province}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="observations" className="block text-sm font-medium text-gray-700">Observaciones</label>
        <textarea name="observations" id="observations" rows={4} value={userData.observations} onChange={handleInputChange} className={inputClasses}></textarea>
      </div>
    </div>
  );
};

export default UserInfoForm;
