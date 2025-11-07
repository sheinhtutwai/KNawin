export const BURMESE_DAYS: string[] = [
  'တနင်္ဂနွေ', // Sunday
  'တနင်္လာ',   // Monday
  'အင်္ဂါ',     // Tuesday
  'ဗုဒ္ဓဟူး',    // Wednesday
  'ကြာသပတေး', // Thursday
  'သောကြာ',   // Friday
  'စနေ',       // Saturday
];

export const GUNAS: string[] = [
  'အရဟံ',
  'သမ္မာသမ္ဗုဒ္ဓေါ',
  'ဝိဇ္ဇာစရဏသမ္ပန္နော',
  'သုဂတော',
  'လောကဝိဒူ',
  'အနုတ္တရောပုရိသ ဓမ္မသာရထိ',
  'သတ္ထာဒေဝမနုဿာနံ',
  'ဗုဒ္ဓေါ',
  'ဘဂဝါ',
];

// The fixed number of rounds for each corresponding Guna.
export const GUNA_ROUNDS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const TOTAL_DAYS = 81;
export const DAYS_PER_STAGE = 9;

export const BURMESE_STAGE_NAMES: string[] = [
  'ပထမအဆင့်', // First Stage
  'ဒုတိယအဆင့်', // Second Stage
  'တတိယအဆင့်', // Third Stage
  'စတုတ္ထအဆင့်', // Fourth Stage
  'ပဉ္စမအဆင့်', // Fifth Stage
  'ဆဋ္ဌမအဆင့်', // Sixth Stage
  'သတ္တမအဆင့်', // Seventh Stage
  'အဋ္ဌမအဆင့်', // Eighth Stage
  'နဝမအဆင့်', // Ninth Stage
];

// Data transcribed from a verified reference image.
// Maps [stage_index][day_within_stage_index] to the correct Guna index.
// This reflects the horizontal progression of the schedule table.
export const KO_NAWIN_GUNA_INDICES: number[][] = [
  // Stage 1 (index 0) - Corrected based on user feedback
  [1, 8, 3, 6, 4, 2, 5, 0, 7],
  // Stage 2 (index 1) - Corrected based on user feedback
  [2, 0, 4, 7, 5, 3, 6, 1, 8],
  // Stage 3 (index 2) - Corrected based on user feedback
  [3, 1, 5, 8, 6, 4, 7, 2, 0],
  // Stage 4 (index 3) - Corrected based on user feedback
  [4, 2, 6, 0, 7, 5, 8, 3, 1],
  // Stage 5 (index 4) - Corrected based on user feedback
  [5, 3, 7, 1, 8, 6, 0, 4, 2],
  // Stage 6 (index 5) - Corrected based on user feedback
  [6, 4, 8, 2, 0, 7, 1, 5, 3],
  // Stage 7 (index 6) - Corrected based on user feedback
  [7, 5, 0, 3, 1, 8, 2, 6, 4],
  // Stage 8 (index 7) - Corrected based on user feedback
  [8, 6, 1, 4, 2, 0, 3, 7, 5],
  // Stage 9 (index 8) - Corrected based on user feedback
  [0, 7, 2, 5, 3, 1, 4, 8, 6],
];
