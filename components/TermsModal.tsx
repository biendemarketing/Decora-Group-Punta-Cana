import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="terms-modal-title" className="text-lg font-bold text-gray-800">Términos y Condiciones</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-gray-600">
          <p>Bienvenido a DecoraGroup. Estos Términos de Uso (los "Términos") rigen su acceso y uso del Sitio Web. Al acceder o utilizar el Sitio Web, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con estos Términos, no acceda ni use el Sitio Web.</p>
          <h3 className="font-semibold text-gray-800 pt-2">1. Uso del Sitio Web:</h3>
          <p>El Sitio Web está destinado a ser utilizado por personas mayores de 18 años. Usted es responsable de mantener la confidencialidad de su información de cuenta y de todas las actividades que ocurran bajo su cuenta.</p>
          <h3 className="font-semibold text-gray-800 pt-2">2. Contenido del Sitio Web:</h3>
          <p>El contenido del Sitio Web, incluyendo pero no limitado a texto, imágenes, gráficos, logotipos, iconos, etc. es propiedad de Decora Group o sus licenciantes. Usted no puede reproducir, modificar, o utilizar el Contenido para ningún propósito comercial o sin el consentimiento expreso por escrito de Decora Group.</p>
          <h3 className="font-semibold text-gray-800 pt-2">3. Prohibido:</h3>
          <p>Usted no puede: Utilizar el Sitio Web para cualquier propósito ilegal, violar leyes, interferir con el funcionamiento del Sitio Web, o publicar contenido ilegal o abusivo.</p>
          <h3 className="font-semibold text-gray-800 pt-2">4. Exención de Responsabilidad:</h3>
          <p>El Sitio Web se proporciona "tal cual". Decora Group no ofrece garantías de ningún tipo y no se hace responsable de ningún daño o pérdida que resulte del uso o la imposibilidad de usar el Sitio Web.</p>
          <h3 className="font-semibold text-gray-800 pt-2">5. Ley Aplicable y Jurisdicción:</h3>
          <p>Estos Términos se regirán de acuerdo con las leyes de la República Dominicana. Cualquier controversia se resolverá en los tribunales de Santo Domingo.</p>
          <h3 className="font-semibold text-gray-800 pt-2">6. Modificaciones:</h3>
          <p>Decora Group se reserva el derecho de modificar estos Términos en cualquier momento.</p>
          <h3 className="font-semibold text-gray-800 pt-2">7. Uso del cotizador:</h3>
          <p>Esta herramienta proporciona un estimado de acuerdo a la selección hecha por el usuario. Decora Group se reserva el derecho a ajustes de precios luego de la visita y conversación sobre los requerimientos y condiciones del trabajo.</p>
          <h3 className="font-semibold text-gray-800 pt-2">8. Contacto:</h3>
          <p>Si tiene alguna pregunta, puede contactarnos a través de info@decoragroup.pc.</p>
          <p className="pt-4 text-xs text-gray-500">Fecha de última actualización: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="p-4 border-t bg-gray-50 text-right">
          <button
            onClick={onClose}
            className="bg-[#621330] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#4a0e24] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
