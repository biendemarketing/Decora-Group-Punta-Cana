import React, { useState, useRef } from 'react';
import { ArrowLeft, User, Mail, Phone, FileText, Send } from 'lucide-react';

interface JobApplicationPageProps {
    jobTitle: string;
    onBack: () => void;
}

const JobApplicationPage: React.FC<JobApplicationPageProps> = ({ jobTitle, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCvFile(e.target.files[0]);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const email = 'decoraempleo@gmail.com';
        const subject = `Aplicación para: ${jobTitle}`;
        let body = `Hola Decora Group,\n\nEstoy aplicando para la posición de "${jobTitle}".\n\nMis datos son:\n`;
        body += `Nombre: ${formData.name}\n`;
        body += `Email: ${formData.email}\n`;
        body += `Teléfono: ${formData.phone}\n\n`;
        body += `Mensaje:\n${formData.message}\n\n`;
        
        if (cvFile) {
            body += `He adjuntado mi CV (${cvFile.name}) a este correo.\n\n`;
            alert("Serás redirigido a tu cliente de correo. Por favor, asegúrate de adjuntar tu CV antes de enviar.");
        } else {
             body += `No se adjuntó un CV a través del formulario.\n\n`;
        }
        
        body += 'Gracias,\n';
        
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const inputClasses = "mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#5a1e38] focus:border-[#5a1e38] sm:text-sm";

    return (
        <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                </button>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Formulario de Aplicación</h1>
                        <p className="mt-2 text-gray-600">Aplicando para la vacante de: <span className="font-semibold text-[#5a1e38]">{jobTitle}</span></p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo*</label>
                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className={inputClasses} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className={inputClasses} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono*</label>
                                <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleInputChange} className={inputClasses} />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Adjuntar Currículum (PDF, DOC, DOCX)</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="cv-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#5a1e38] hover:text-[#4d182e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#5a1e38]">
                                            <span>Sube un archivo</span>
                                            <input id="cv-upload" name="cv-upload" type="file" className="sr-only" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                        </label>
                                        <p className="pl-1">o arrástralo aquí</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{cvFile ? cvFile.name : 'Hasta 10MB'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje Adicional</label>
                            <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleInputChange} className={inputClasses}></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5a1e38] hover:bg-[#4d182e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a1e38] transition-colors">
                                <Send className="h-4 w-4 mr-2" />
                                Enviar Aplicación
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                            Al enviar, serás redirigido a tu cliente de correo para completar el envío. Si adjuntaste un archivo, por favor asegúrate de que esté incluido en el correo antes de enviarlo.
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default JobApplicationPage;