import React from 'react';
import type { ScheduleItem } from '../types';
import { BURMESE_STAGE_NAMES } from '../constants';

interface TodayViewProps {
  item: ScheduleItem;
  isCompleted: boolean;
  onComplete: (dateKey: string) => void;
}

const TodayView: React.FC<TodayViewProps> = ({ item, isCompleted, onComplete }) => {
  const isVegetarianDay = item.dayNumber % 9 === 5;

  return (
    <div className="mt-8 max-w-2xl mx-auto">
        <div className={`
            bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-2xl 
            border-t-4 ${isCompleted ? 'border-green-500' : isVegetarianDay ? 'border-teal-400' : 'border-amber-500'}
            overflow-hidden transform transition-all duration-500 ease-in-out scale-100
        `}>
            <div className="p-6 text-center">
                <p className="text-lg font-semibold text-amber-300">ယနေ့အတွက် ပုတီးစိပ်ရန်</p>
                <p className="text-sm text-gray-400">{item.date} ({item.dayOfWeek}နေ့)</p>
            </div>
            
            <div className="bg-gray-900/50 px-6 py-8 text-center">
                <p className="text-sm text-gray-400 mb-2">ဂုဏ်တော်</p>
                <h2 className="text-4xl font-bold text-white leading-tight">{item.guna}</h2>
                {isVegetarianDay && (
                    <div className="mt-4 inline-flex items-center bg-teal-900/70 text-teal-200 text-sm font-medium px-3 py-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        သီးသန့်နေ့ (သားသတ်လွတ်)
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex justify-around items-center text-center">
                    <div>
                        <p className="text-sm text-gray-400">အပတ်အရေအတွက်</p>
                        <p className={`text-3xl font-bold ${isVegetarianDay ? 'text-teal-300' : 'text-amber-400'}`}>{item.rounds}</p>
                    </div>
                    <div className="border-l border-gray-700 h-10"></div>
                    <div>
                        <p className="text-sm text-gray-400">အဆင့်</p>
                        <p className="text-xl text-gray-300">{BURMESE_STAGE_NAMES[item.stage - 1]}</p>
                    </div>
                     <div className="border-l border-gray-700 h-10"></div>
                    <div>
                        <p className="text-sm text-gray-400">စဉ်</p>
                        <p className="text-xl text-gray-300">{item.dayNumber}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gray-900/20">
              {!isCompleted ? (
                  <button
                      onClick={() => onComplete(item.dateKey)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out flex items-center justify-center gap-2"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      စိပ်ပြီးကြောင်း မှတ်ရန်
                  </button>
              ) : (
                  <div className="w-full bg-gray-700 text-green-300 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      ယနေ့အတွက် စိပ်ပြီးပါပြီ
                  </div>
              )}
            </div>
        </div>
    </div>
  );
};

export default TodayView;