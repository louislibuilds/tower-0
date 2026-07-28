import tsaLetter from './uts-tsa-letter.png'
import deansList2026 from './uts-deans-list-2026.png'
import mitTestamur from './uts-mit-testamur.png'

/** 23F completion wall — left → right chronological */
export const FACTORY_WALL_CERTS = [
  { id: 'tsa', src: tsaLetter, year: '2026' },
  { id: 'deans', src: deansList2026, year: '2026' },
  { id: 'testamur', src: mitTestamur, year: '2026' },
] as const
