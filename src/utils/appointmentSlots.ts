export type ClinicName = 'Livasa Hospital' | 'Aggarwal Clinic';

export interface AppointmentSlot {
  time: string;
  clinic: ClinicName;
}

export const LIVASA_SLOTS: AppointmentSlot[] = [
  { time: '10:00 AM', clinic: 'Livasa Hospital' },
  { time: '10:15 AM', clinic: 'Livasa Hospital' },
  { time: '10:30 AM', clinic: 'Livasa Hospital' },
  { time: '10:45 AM', clinic: 'Livasa Hospital' },
  { time: '11:00 AM', clinic: 'Livasa Hospital' },
  { time: '11:15 AM', clinic: 'Livasa Hospital' },
  { time: '11:30 AM', clinic: 'Livasa Hospital' },
  { time: '11:45 AM', clinic: 'Livasa Hospital' },
  { time: '12:00 PM', clinic: 'Livasa Hospital' },
  { time: '12:15 PM', clinic: 'Livasa Hospital' },
  { time: '12:30 PM', clinic: 'Livasa Hospital' },
  { time: '12:45 PM', clinic: 'Livasa Hospital' },
  { time: '01:00 PM', clinic: 'Livasa Hospital' },
  { time: '01:15 PM', clinic: 'Livasa Hospital' },
  { time: '01:30 PM', clinic: 'Livasa Hospital' },
  { time: '01:45 PM', clinic: 'Livasa Hospital' },
  { time: '02:00 PM', clinic: 'Livasa Hospital' },
  { time: '02:15 PM', clinic: 'Livasa Hospital' },
  { time: '02:30 PM', clinic: 'Livasa Hospital' },
  { time: '02:45 PM', clinic: 'Livasa Hospital' },
  { time: '03:00 PM', clinic: 'Livasa Hospital' },
  { time: '03:15 PM', clinic: 'Livasa Hospital' },
  { time: '03:30 PM', clinic: 'Livasa Hospital' },
  { time: '03:45 PM', clinic: 'Livasa Hospital' },
  { time: '04:00 PM', clinic: 'Livasa Hospital' },
  { time: '04:15 PM', clinic: 'Livasa Hospital' },
  { time: '04:30 PM', clinic: 'Livasa Hospital' },
  { time: '04:45 PM', clinic: 'Livasa Hospital' }
];

export const AGGARWAL_SLOTS: AppointmentSlot[] = [
  { time: '05:00 PM', clinic: 'Aggarwal Clinic' },
  { time: '05:15 PM', clinic: 'Aggarwal Clinic' },
  { time: '05:30 PM', clinic: 'Aggarwal Clinic' },
  { time: '05:45 PM', clinic: 'Aggarwal Clinic' },
  { time: '06:00 PM', clinic: 'Aggarwal Clinic' },
  { time: '06:15 PM', clinic: 'Aggarwal Clinic' },
  { time: '06:30 PM', clinic: 'Aggarwal Clinic' },
  { time: '06:45 PM', clinic: 'Aggarwal Clinic' }
];

export const APPOINTMENT_SLOTS: AppointmentSlot[] = [
  ...LIVASA_SLOTS,
  ...AGGARWAL_SLOTS
];

const SLOT_MAP = new Map<string, ClinicName>(
  APPOINTMENT_SLOTS.map((s) => [s.time, s.clinic])
);

/**
 * Returns canonical clinic for a valid appointment time, or null if invalid.
 */
export function getClinicForAppointmentTime(time: string | null | undefined): ClinicName | null {
  if (!time) return null;
  const trimmed = time.trim();
  return SLOT_MAP.get(trimmed) || null;
}

/**
 * Validates if the given time string matches one of the canonical 15-minute slots.
 */
export function isValidAppointmentTime(time: string | null | undefined): boolean {
  if (!time) return false;
  return SLOT_MAP.has(time.trim());
}
