import React, { useState, useCallback, useEffect } from 'react';
import type { ScheduleItem } from './types';
import { BURMESE_DAYS, GUNAS, GUNA_ROUNDS, KO_NAWIN_GUNA_INDICES, TOTAL_DAYS, DAYS_PER_STAGE } from './constants';
import DateSelector from './components/DateSelector';
import AlertMessage from './components/AlertMessage';
import TodayView from './components/TodayView';
import ScheduleView from './components/ScheduleView';
import AuthForm from './components/AuthForm';
import { useAuth } from './components/AuthContext';
import { saveCompletedDays, loadCompletedDays, saveSelectedDate, loadSelectedDate } from './firestoreService';

const App: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [todayItem, setTodayItem] = useState<ScheduleItem | null | undefined>(undefined);
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const fetchedCompletedDays = await loadCompletedDays(user.uid);
        setCompletedDays(fetchedCompletedDays);

        const fetchedSelectedDate = await loadSelectedDate(user.uid);
        if (fetchedSelectedDate) {
          const date = new Date(fetchedSelectedDate);
          setStartDate(date);
          // Automatically generate schedule if a saved date exists
          if (date.getDay() === 1) { // Check if it's a Monday
            generateSchedule(date);
          } else {
            setError('ကျေးဇူးပြု၍ တနင်္လာနေ့တွင် စတင်ပါ။');
            setSchedule(null);
          }
        }
      };
      fetchData();
    } else {
      setCompletedDays(new Set()); // Clear completed days if logged out
      setStartDate(null); // Clear selected date if logged out
      setSchedule(null); // Clear schedule if logged out
      setTodayItem(undefined);
    }
  }, [user]);

  const handleMarkAsComplete = useCallback(async (dateKey: string) => {
    if (!user) return; // Should not happen if UI is protected

    setCompletedDays(prev => {
      const newCompleted = new Set(prev);
      newCompleted.add(dateKey);
      saveCompletedDays(user.uid, newCompleted); // Save to Firestore
      return newCompleted;
    });
  }, [user]);


  const generateSchedule = useCallback((mondayDate: Date) => {
    const scheduleData: ScheduleItem[] = [];
    const formatter = new Intl.DateTimeFormat('my');

    // For a Monday start, the stage sequence begins with Stage 1.
    const stageSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < TOTAL_DAYS; i++) {
      const currentDate = new Date(mondayDate);
      currentDate.setDate(mondayDate.getDate() + i);
      
      const dayOfWeekIndex = currentDate.getDay(); // 0 for Sun, 1 for Mon, etc.
      
      // Determine which 9-day period we are in (0-8)
      const periodIndex = Math.floor(i / DAYS_PER_STAGE);
      
      // Get the correct stage number for this period from the sequence
      const stageNumber = stageSequence[periodIndex];
      
      // Convert to a zero-based index for the schedule array
      const stageIndex = stageNumber - 1;

      // Determine the day's position within the current 9-day stage (0-8)
      const dayWithinStageIndex = i % DAYS_PER_STAGE;
      
      const gunaIndex = KO_NAWIN_GUNA_INDICES[stageIndex][dayWithinStageIndex];
      
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;
      
      scheduleData.push({
        dayNumber: i + 1,
        date: formatter.format(currentDate),
        dateKey: dateKey,
        dayOfWeek: BURMESE_DAYS[dayOfWeekIndex],
        stage: stageNumber,
        guna: GUNAS[gunaIndex],
        rounds: GUNA_ROUNDS[gunaIndex],
      });
    }
    setSchedule(scheduleData);

    // Find and set today's schedule item
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const foundItem = scheduleData.find(item => item.dateKey === todayKey);
    setTodayItem(foundItem || null);

  }, []);

  const handleGenerate = useCallback((date: Date) => {
    if (!user) return; // Prevent generating if not logged in
    setStartDate(date);
    setTodayItem(undefined); // Reset on new generation
    setError(null);

    if (date.getDay() !== 1) {
      setError('ကျေးဇူးပြု၍ တနင်္လာနေ့တွင် စတင်ပါ။');
      setSchedule(null);
      saveSelectedDate(user.uid, null); // Clear saved date if invalid
    } else {
      generateSchedule(date);
      saveSelectedDate(user.uid, date.toISOString().split('T')[0]); // Save valid date
    }
  }, [generateSchedule, user]);

  const handleClearDate = useCallback(() => {
    if (!user) return;
    setStartDate(null);
    setSchedule(null);
    setTodayItem(undefined);
    setError(null);
    saveSelectedDate(user.uid, null); // Clear saved date in Firestore
  }, [user]);

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center text-2xl">Loading...</div>;
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-8">
            <h1 className="text-5xl sm:text-6xl font-bold text-amber-400 leading-relaxed">ကိုးနဝင်း</h1>
            <p className="text-base sm:text-lg text-gray-300 mt-6">ဘုရားဂုဏ်တော်ကိုးပါးဖြင့် ပုတီးစိပ်ရန် နေ့ရက်များ</p>
            <button onClick={logout} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
        </header>

        <main>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 max-w-2xl mx-auto">
            <DateSelector 
              onGenerate={handleGenerate} 
              initialDate={startDate}
              onClear={handleClearDate}
            />
            {error && <AlertMessage message={error} />}
          </div>
          
          {todayItem && (
            <TodayView 
              item={todayItem} 
              isCompleted={completedDays.has(todayItem.dateKey)}
              onComplete={handleMarkAsComplete}
            />
          )}
          {todayItem === null && schedule && (
             <div className="max-w-2xl mx-auto mt-6">
                <AlertMessage message="ယနေ့အတွက် အစီအစဉ်သည် သင်ရွေးချယ်ထားသော အချိန်ကာလအတွင်း မပါဝင်ပါ။ စတင်မည့်ရက်စွဲကို စစ်ဆေးပါ။" />
            </div>
          )}

          {schedule && startDate && (
            <ScheduleView 
              schedule={schedule}
              startDate={startDate}
              completedDays={completedDays}
            />
          )}
        </main>

         <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Developed with loving kindness.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;