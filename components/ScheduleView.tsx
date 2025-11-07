
import React from 'react';
import type { ScheduleItem } from '../types';
import { BURMESE_STAGE_NAMES } from '../constants';

interface ScheduleViewProps {
  schedule: ScheduleItem[];
  startDate: Date | null;
  completedDays: Set<string>;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule, startDate, completedDays }) => {

  const endDate = new Date(startDate!);
  endDate.setDate(startDate!.getDate() + schedule.length - 1);

  const formatter = new Intl.DateTimeFormat('my');

  return (
    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-amber-300">ပုတီးစိပ်ရန် အစီအစဉ် (ရက်ပေါင်း ၈၁ ရက်)</h2>
        {startDate && <p className="text-gray-400 mt-2">{formatter.format(startDate)} မှ {formatter.format(endDate)} ထိ</p>}
      </div>
      
      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4">
        {schedule.map((item) => {
          const isVegetarianDay = item.dayNumber % 9 === 5;
          const isCompleted = completedDays.has(item.dateKey);
          return (
            <div 
              key={item.dayNumber} 
              className={`relative bg-gray-800 p-4 rounded-lg shadow-md border-l-4 transition-colors duration-300 ${isCompleted ? 'border-green-500' : isVegetarianDay ? 'border-teal-400' : 'border-amber-500'}`}
            >
              {isCompleted && (
                  <div className="absolute top-2 right-2 text-green-400" title="ပြီးပြီ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                  </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <span className={`font-bold text-lg ${isCompleted ? 'text-green-300' : isVegetarianDay ? 'text-teal-300' : 'text-amber-400'}`}>နေ့ {item.dayNumber}</span>
                <span className="text-sm text-gray-400">{item.date}</span>
              </div>
              <p className="text-xl font-semibold text-white mb-1">{item.guna}</p>
              {isVegetarianDay && <p className="text-sm text-teal-300 mb-2">သီးသန့်နေ့ (သားသတ်လွတ်)</p>}
              <div className="flex justify-between items-baseline text-gray-300">
                <span>{item.dayOfWeek}နေ့</span>
                <span className="font-bold">{item.rounds} ပတ်</span>
              </div>
               <div className="mt-2 pt-2 border-t border-gray-700">
                  <span className="text-xs text-gray-500">{BURMESE_STAGE_NAMES[item.stage - 1]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="p-4 font-semibold text-amber-300">အဆင့်</th>
              <th className="p-4 font-semibold text-amber-300">နေ့</th>
              <th className="p-4 font-semibold text-amber-300">ရက်စွဲ</th>
              <th className="p-4 font-semibold text-amber-300">နေ့ရက်</th>
              <th className="p-4 font-semibold text-amber-300">ဂုဏ်တော်</th>
              <th className="p-4 font-semibold text-amber-300 text-right">ပုတီးစိပ်ရန် (အပတ်)</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => {
              const isVegetarianDay = item.dayNumber % 9 === 5;
              const isCompleted = completedDays.has(item.dateKey);
              return (
                <tr key={item.dayNumber} className={`border-b border-gray-700 transition-colors duration-300 ${isCompleted ? 'bg-green-900/50 hover:bg-green-900/60' : isVegetarianDay ? 'bg-teal-900/40 hover:bg-teal-900/60' : (index % 2 === 0 ? 'bg-gray-800/60' : 'bg-gray-800/30')}`}>
                  <td className="p-4">{BURMESE_STAGE_NAMES[item.stage - 1]}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       {isCompleted && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" title="ပြီးပြီ">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                      )}
                      <span>{item.dayNumber}</span>
                    </div>
                  </td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">{item.dayOfWeek}</td>
                  <td className="p-4">
                    <span className="text-lg font-medium">{item.guna}</span>
                    {isVegetarianDay && <div className="text-xs text-teal-300 mt-1">သီးသန့်နေ့ (သားသတ်လွတ်)</div>}
                  </td>
                  <td className={`p-4 text-right font-bold text-xl ${isVegetarianDay ? 'text-teal-300' : 'text-amber-400'}`}>{item.rounds}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleView;