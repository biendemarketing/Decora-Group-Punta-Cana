import React from 'react';

interface ProductDetailsTableProps {
  specs: { [key: string]: string };
}

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({ specs }) => {
  const specEntries = Object.entries(specs);
  const midPoint = Math.ceil(specEntries.length / 2);
  const firstHalf = specEntries.slice(0, midPoint);
  const secondHalf = specEntries.slice(midPoint);

  const renderColumn = (items: [string, string][]) => (
    <dl className="space-y-px">
      {items.map(([key, value]) => (
        <div key={key} className="grid grid-cols-2 p-3 bg-gray-50/50 rounded-md text-sm">
          <dt className="font-medium text-gray-600">{key}</dt>
          <dd className="text-gray-800">{value}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
      <div>{renderColumn(firstHalf)}</div>
      <div>{renderColumn(secondHalf)}</div>
    </div>
  );
};

export default ProductDetailsTable;