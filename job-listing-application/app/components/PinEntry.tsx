import { useState, createRef, ChangeEvent, KeyboardEvent } from 'react';

const PinEntry = ({values, handleSetValues}: {values: string[], handleSetValues: (newvalue: string[]) => void}) => {
  const inputRefs = Array.from({ length: 4 }, () => createRef<HTMLInputElement>());

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      handleSetValues(newValues);

      // Move focus to the next input if the value is not empty
      if (value && index < values.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
        if (index < values.length - 1) {
          inputRefs[index + 1].current?.focus();
        }
        break;
      case 'ArrowLeft':
        if (index > 0) {
          inputRefs[index - 1].current?.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-around items-center gap-2">
      {values.map((value, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="border h-12 w-12 text-center text-2xl border-purple-tag rounded-md bg-bluish-grey"
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default PinEntry;
