import React, { useState, useEffect } from 'react';

interface DateSelectorProps {
  onGenerate: (date: Date) => void;
  initialDate: Date | null;
  onClear: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onGenerate, initialDate, onClear }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    if (initialDate) {
      // Format date to YYYY-MM-DD for input type="date"
      setSelectedDate(initialDate.toISOString().split('T')[0]);
    } else {
      setSelectedDate('');
    }
  }, [initialDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedDate) {
      onGenerate(new Date(selectedDate));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="startDate" className="block text-gray-300 text-sm font-bold mb-2">
          စတင်မည့်ရက်စွဲ (တနင်္လာနေ့)
        </label>
        <input
          type="date"
          id="startDate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
          value={selectedDate}
          onChange={handleDateChange}
          required
        />
      </div>
      <div className="flex justify-between space-x-4">
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-grow"
        >
          အစီအစဉ်ထုတ်ရန်
        </button>
        <button
          type="button"
          onClick={onClear}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-grow"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default DateSelector;
