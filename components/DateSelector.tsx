import React, { useState } from 'react';

interface DateSelectorProps {
  onGenerate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onGenerate }) => {
  const [dateString, setDateString] = useState<string>('03/11/2025');
  const [error, setError] = useState<string>('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateString(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parts = dateString.split('/');
    if (parts.length !== 3 || parts[0].length !== 2 || parts[1].length !== 2 || parts[2].length !== 4) {
      setError('ကျေးဇူးပြု၍ ရက်/လ/နှစ် format ဖြင့် ထည့်ပါ။ ဥပမာ: 03/11/2025');
      return;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Basic validation for numbers
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        setError('ကျေးဇူးပြု၍ ရက်/လ/နှစ် format ဖြင့် ထည့်ပါ။ ဥပမာ: 03/11/2025');
        return;
    }
    
    // Check for valid date (e.g., not 31/02/2025)
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        setError('နေ့စွဲ မမှန်ပါ။ ကျေးဇူးပြု၍ ထပ်မံစစ်ဆေးပါ။');
        return;
    }

    onGenerate(date);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start gap-4">
      <div className="w-full">
        <label htmlFor="start-date" className="block text-lg font-medium text-amber-300 mb-1">စတင်မည့်နေ့ကို ထည့်ပါ</label>
        <p className="text-sm text-gray-400 mb-2">(ရက်/လ/နှစ် format ဖြင့်)</p>
        <input
          id="start-date"
          type="text"
          value={dateString}
          onChange={handleDateChange}
          placeholder="ဥပမာ: 03/11/2025"
          className={`w-full bg-gray-700 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-amber-400 focus:border-amber-400'}`}
          required
          aria-invalid={!!error}
          aria-describedby="date-error"
        />
        {error && <p id="date-error" className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto self-end sm:mt-[56px] h-[50px] bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
      >
        ကြည့်ရှုရန်
      </button>
    </form>
  );
};

export default DateSelector;
