import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  const id = React.useId();
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer select-none">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            padding: 0,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: '0',
          }}
          checked={checked}
          onChange={onChange}
        />
        <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        ></div>
      </div>
      <div className="ml-3 text-sm font-medium text-gray-700">{label}</div>
    </label>
  );
};

export default ToggleSwitch;