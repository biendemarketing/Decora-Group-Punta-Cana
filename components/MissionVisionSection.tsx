import React from 'react';
import { Eye, Target } from 'lucide-react';

// FIX: Corrected the prop type. The content is an object with mission and vision properties, not a property on AboutUsPageContent.
interface MissionVisionSectionProps {
  content: {
    mission: { title: string; text: string; };
    vision: { title: string; text: string; };
  };
}

const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({ content }) => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
            <Target className="h-10 w-10 text-[#5a1e38]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{content.mission.title}</h2>
          <p className="mt-2 text-gray-600">
            {content.mission.text}
          </p>
        </div>
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
            <Eye className="h-10 w-10 text-[#5a1e38]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{content.vision.title}</h2>
          <p className="mt-2 text-gray-600">
            {content.vision.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
