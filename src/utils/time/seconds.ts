export interface ISecondsToHMS {
  hours: number;
  minutes: number;
  seconds: number;
}

export const secondsToHMS = (seconds: number): ISecondsToHMS => ({
  hours: Math.floor(((seconds / 86400) % 1) * 24),
  minutes: Math.floor(((seconds / 3600) % 1) * 60),
  seconds: Math.round(((seconds / 60) % 1) * 60),
});

export const formatSecondsToHMS = (secs: number): string => {
  const { hours, minutes, seconds } = secondsToHMS(secs);

  const newHours = hours.toString().padStart(2, '0');
  const newMinutes = minutes.toString().padStart(2, '0');
  const newSeconds = seconds.toString().padStart(2, '0');

  if (hours <= 0) {
    return `${newMinutes}:${newSeconds}`;
  }

  return `${newHours}:${newMinutes}:${newSeconds}`;
};
