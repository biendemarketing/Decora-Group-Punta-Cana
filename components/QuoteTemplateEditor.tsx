import React from 'react';
import { QuoteTemplateConfig } from '../types';
import ToggleSwitch from './ToggleSwitch';
import { Building, Tag, Eye, Palette } from 'lucide-react';

interface QuoteTemplateEditorProps {
  templateConfig: QuoteTemplateConfig;
  onTemplateChange: (newConfig: QuoteTemplateConfig) => void;
}

const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="p-4 border rounded-md bg-gray-50/50 space-y-4">
    <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2 text-[#5a1e38]">
      <Icon className="h-5 w-5" />
      {title}
    </h4>
    <div className="space-y-3 pl-8">{children}</div>
  </div>
);

const LabeledInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input type="text" value={value} onChange={onChange} className="w-full text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm focus:ring-[#5a1e38] focus:border-[#5a1e38]" />
  </div>
);

const QuoteTemplateEditor: React.FC<QuoteTemplateEditorProps> = ({ templateConfig, onTemplateChange }) => {
  
  const handleCompanyChange = (field: keyof QuoteTemplateConfig['companyInfo'], value: string) => {
    onTemplateChange({ ...templateConfig, companyInfo: { ...templateConfig.companyInfo, [field]: value } });
  };
  
  const handleLabelChange = (field: keyof QuoteTemplateConfig['labels'], value: string) => {
    onTemplateChange({ ...templateConfig, labels: { ...templateConfig.labels, [field]: value } });
  };

  const handleVisibilityChange = (field: keyof QuoteTemplateConfig['visibility'], value: boolean) => {
    onTemplateChange({ ...templateConfig, visibility: { ...templateConfig.visibility, [field]: value } });
  };
  
  const handleStyleChange = (field: keyof QuoteTemplateConfig['style'], value: string) => {
    onTemplateChange({ ...templateConfig, style: { ...templateConfig.style, [field]: value } });
  };

  const { companyInfo, labels, visibility, style } = templateConfig;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Editor de Plantilla de Cotización</h3>
      
      <Section title="Información de la Empresa" icon={Building}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInput label="Nombre de la Empresa" value={companyInfo.name} onChange={e => handleCompanyChange('name', e.target.value)} />
            <LabeledInput label="Línea de Dirección 1" value={companyInfo.addressLine1} onChange={e => handleCompanyChange('addressLine1', e.target.value)} />
            <LabeledInput label="Línea de Dirección 2" value={companyInfo.addressLine2} onChange={e => handleCompanyChange('addressLine2', e.target.value)} />
            <LabeledInput label="RNC" value={companyInfo.rnc} onChange={e => handleCompanyChange('rnc', e.target.value)} />
            <LabeledInput label="Email de Contacto" value={companyInfo.email} onChange={e => handleCompanyChange('email', e.target.value)} />
            <LabeledInput label="Teléfono de Contacto" value={companyInfo.phone} onChange={e => handleCompanyChange('phone', e.target.value)} />
        </div>
      </Section>
      
      <Section title="Etiquetas y Títulos" icon={Tag}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInput label="Título Principal" value={labels.mainTitle} onChange={e => handleLabelChange('mainTitle', e.target.value)} />
            <LabeledInput label="Etiqueta 'Número de Cotización'" value={labels.quoteNumberLabel} onChange={e => handleLabelChange('quoteNumberLabel', e.target.value)} />
            <LabeledInput label="Etiqueta 'Fecha'" value={labels.dateLabel} onChange={e => handleLabelChange('dateLabel', e.target.value)} />
            <LabeledInput label="Etiqueta 'De:'" value={labels.fromLabel} onChange={e => handleLabelChange('fromLabel', e.target.value)} />
            <LabeledInput label="Etiqueta 'Para:'" value={labels.toLabel} onChange={e => handleLabelChange('toLabel', e.target.value)} />
            <LabeledInput label="Cabecera 'Descripción'" value={labels.itemDescriptionHeader} onChange={e => handleLabelChange('itemDescriptionHeader', e.target.value)} />
            <LabeledInput label="Cabecera 'Cantidad'" value={labels.itemQuantityHeader} onChange={e => handleLabelChange('itemQuantityHeader', e.target.value)} />
            <LabeledInput label="Cabecera 'Precio Unit.'" value={labels.itemUnitPriceHeader} onChange={e => handleLabelChange('itemUnitPriceHeader', e.target.value)} />
            <LabeledInput label="Cabecera 'Total'" value={labels.itemTotalHeader} onChange={e => handleLabelChange('itemTotalHeader', e.target.value)} />
            <LabeledInput label="Etiqueta 'Subtotal'" value={labels.subtotalLabel} onChange={e => handleLabelChange('subtotalLabel', e.target.value)} />
            <LabeledInput label="Etiqueta 'Impuesto (ITBIS)'" value={labels.taxLabel} onChange={e => handleLabelChange('taxLabel', e.target.value)} />
            <LabeledInput label="Etiqueta 'Total'" value={labels.totalLabel} onChange={e => handleLabelChange('totalLabel', e.target.value)} />
            <LabeledInput label="Texto de Pie de Página 1" value={labels.footerTextLine1} onChange={e => handleLabelChange('footerTextLine1', e.target.value)} />
            <LabeledInput label="Texto de Pie de Página 2" value={labels.footerTextLine2} onChange={e => handleLabelChange('footerTextLine2', e.target.value)} />
        </div>
      </Section>

       <Section title="Visibilidad de Elementos" icon={Eye}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ToggleSwitch label="Mostrar Logo" checked={visibility.showLogo} onChange={e => handleVisibilityChange('showLogo', e.target.checked)} />
                <ToggleSwitch label="Mostrar Número de Cotización" checked={visibility.showQuoteNumber} onChange={e => handleVisibilityChange('showQuoteNumber', e.target.checked)} />
                <ToggleSwitch label="Mostrar Fecha" checked={visibility.showDate} onChange={e => handleVisibilityChange('showDate', e.target.checked)} />
                <ToggleSwitch label="Mostrar RNC" checked={visibility.showRnc} onChange={e => handleVisibilityChange('showRnc', e.target.checked)} />
                <ToggleSwitch label="Mostrar ITBIS" checked={visibility.showTax} onChange={e => handleVisibilityChange('showTax', e.target.checked)} />
            </div>
       </Section>

       <Section title="Estilo" icon={Palette}>
            <div className="flex items-center gap-4">
                <label className="block text-sm font-medium text-gray-700">Color de Acento</label>
                <input type="color" value={style.accentColor} onChange={e => handleStyleChange('accentColor', e.target.value)} className="h-10 w-10 p-1 border rounded" />
                <input type="text" value={style.accentColor} onChange={e => handleStyleChange('accentColor', e.target.value)} className="w-32 text-sm p-2 border border-gray-300 rounded bg-white text-gray-900 shadow-sm" />
            </div>
       </Section>

    </div>
  );
};

export default QuoteTemplateEditor;