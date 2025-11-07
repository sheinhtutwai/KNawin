import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const getUserDocRef = (userId: string) => {
  return doc(db, "users", userId);
};

export const saveCompletedDays = async (userId: string, completedDays: Set<string>) => {
  if (!userId) return;
  const userDocRef = getUserDocRef(userId);
  await setDoc(userDocRef, { completedDays: Array.from(completedDays) }, { merge: true });
};

export const loadCompletedDays = async (userId: string): Promise<Set<string>> => {
  if (!userId) return new Set();
  const userDocRef = getUserDocRef(userId);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data && data.completedDays) {
      return new Set<string>(data.completedDays);
    }
  }
  return new Set();
};

export const saveSelectedDate = async (userId: string, date: string | null) => {
  if (!userId) return;
  const userDocRef = getUserDocRef(userId);
  await setDoc(userDocRef, { selectedDate: date }, { merge: true });
};

export const loadSelectedDate = async (userId: string): Promise<string | null> => {
  if (!userId) return null;
  const userDocRef = getUserDocRef(userId);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data && data.selectedDate) {
      return data.selectedDate;
    }
  }
  return null;
};
