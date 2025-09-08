import React from 'react';
import { Lightbulb, GlassWater, Globe, Pointer, Share2, ThumbsUp } from 'lucide-react';

interface AdditionalInfoProps {
  info: {
    icon: string;
    text: string;
    details?: string;
  }[];
}

const iconMap: { [key: string]: React.ElementType } = {
  Led: Lightbulb,
  Glass: GlassWater,
  Europe: Globe,
  Push: Pointer,
  Universal: Share2,
  Recommend: ThumbsUp,
};

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ info }) => {
  const midPoint = Math.ceil(info.length / 2);
  const firstHalf = info.slice(0, midPoint);
  const secondHalf = info.slice(midPoint);

  const renderColumn = (items: typeof info) => (
    <div className="space-y-4">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon];
        return (
          <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
            {Icon && <Icon className="h-6 w-6 mr-4 text-gray-500 flex-shrink-0" />}
            <span className="text-sm font-medium text-gray-800">{item.text}</span>
          </div>
        );
      })}
    </div>
  );
  
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>{renderColumn(firstHalf)}</div>
      <div>{renderColumn(secondHalf)}</div>
    </div>
  );
};

export default AdditionalInfo;