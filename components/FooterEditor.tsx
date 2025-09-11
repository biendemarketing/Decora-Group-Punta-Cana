import React from 'react';
import { FooterContent, FooterLinkColumn, SocialLink } from '../types';

interface FooterEditorProps {
  footerContent: FooterContent;
  onFooterChange: (newContent: FooterContent) => void;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ footerContent, onFooterChange }) => {

    const handleFieldChange = (field: keyof FooterContent, value: any) => {
        onFooterChange({ ...footerContent, [field]: value });
    };

    const handleContactChange = (field: keyof FooterContent['contactInfo'], value: string) => {
        const newContactInfo = { ...footerContent.contactInfo, [field]: value };
        handleFieldChange('contactInfo', newContactInfo);
    };

    const handleSocialChange = (id: string, field: 'url' | 'platform', value: string) => {
        const newSocials = footerContent.socialLinks.map(link => 
            link.id === id ? { ...link, [field]: value } : link
        );
        handleFieldChange('socialLinks', newSocials);
    };

    const handleColumnTitleChange = (id: string, newTitle: string) => {
        const newColumns = footerContent.linkColumns.map(col =>
            col.id === id ? { ...col, title: newTitle } : col
        );
        handleFieldChange('linkColumns', newColumns);
    };

    const handleLinkChange = (colId: string, linkId: string, field: 'text' | 'url', value: string) => {
        const newColumns = footerContent.linkColumns.map(col => {
            if (col.id === colId) {
                const newLinks = col.links.map(link => 
                    link.id === linkId ? { ...link, [field]: value } : link
                );
                return { ...col, links: newLinks };
            }
            return col;
        });
        handleFieldChange('linkColumns', newColumns);
    };

    const inputClass = "w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-blue-500 focus:border-blue-500";

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Editor de Pie de Página</h3>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Descripción Corta</label>
                <textarea value={footerContent.description} onChange={e => handleFieldChange('description', e.target.value)} rows={3} className={inputClass} />
            </div>
            
            <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">Información de Contacto</h4>
                <div className="space-y-2 p-3 border rounded-md bg-gray-50">
                    <input type="text" placeholder="Dirección" value={footerContent.contactInfo.address} onChange={e => handleContactChange('address', e.target.value)} className={inputClass} />
                    <input type="text" placeholder="Teléfono" value={footerContent.contactInfo.phone} onChange={e => handleContactChange('phone', e.target.value)} className={inputClass} />
                    <input type="email" placeholder="Email" value={footerContent.contactInfo.email} onChange={e => handleContactChange('email', e.target.value)} className={inputClass} />
                </div>
            </div>

            <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">Redes Sociales</h4>
                <div className="space-y-2 p-3 border rounded-md bg-gray-50">
                    {footerContent.socialLinks.map(link => (
                        <div key={link.id} className="grid grid-cols-3 gap-2 items-center">
                            <span className="font-semibold text-sm">{link.platform}</span>
                            <input type="text" placeholder="URL del perfil" value={link.url} onChange={e => handleSocialChange(link.id, 'url', e.target.value)} className={`col-span-2 ${inputClass}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                 <h4 className="text-md font-semibold text-gray-700 mb-2">Columnas de Enlaces</h4>
                 <div className="space-y-4">
                    {footerContent.linkColumns.map(col => (
                        <div key={col.id} className="p-3 border rounded-md bg-gray-50">
                            <input type="text" value={col.title} onChange={e => handleColumnTitleChange(col.id, e.target.value)} className={`font-bold mb-2 ${inputClass}`} />
                            <div className="space-y-2 mt-2">
                                {col.links.map(link => (
                                    <div key={link.id} className="grid grid-cols-2 gap-2">
                                        <input type="text" placeholder="Texto" value={link.text} onChange={e => handleLinkChange(col.id, link.id, 'text', e.target.value)} className={inputClass} />
                                        <input type="text" placeholder="URL" value={link.url} onChange={e => handleLinkChange(col.id, link.id, 'url', e.target.value)} className={inputClass} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

        </div>
    );
};

export default FooterEditor;