import { Forklift, Checklist } from '../models/checklist.model';

export const FORKLIFTS: Forklift[] = [
  { id: 'CUA-25097', name: 'ECO CUA-25097', model: 'General' },
  { id: 'CUA-29439', name: 'ECO CUA-29439', model: 'General' },
  { id: 'CUA-29440', name: 'ECO CUA-29440', model: 'General' },
  { id: 'CUA-35482', name: 'ECO CUA-35482', model: 'General' },
  { id: 'CUA-35483', name: 'ECO CUA-35483', model: 'General' },
  { id: 'CUA-35494', name: 'ECO CUA-35494', model: 'General' },
  { id: 'CUA-35526', name: 'ECO CUA-35526', model: 'General' },
  { id: 'CUA-37191', name: 'ECO CUA-37191', model: 'General' },
  { id: 'CUA-37193', name: 'ECO CUA-37193', model: 'General' },
  { id: 'CUA-37194', name: 'ECO CUA-37194', model: 'General' },
  { id: 'CUA-37195', name: 'ECO CUA-37195', model: 'General' },
  { id: 'CUA-40019', name: 'ECO CUA-40019', model: 'General' },
  { id: 'CUA-40020', name: 'ECO CUA-40020', model: 'General' },
  { id: 'CUA-40021', name: 'ECO CUA-40021', model: 'General' },
  { id: 'CUA-40057', name: 'ECO CUA-40057', model: 'General' },
  { id: 'CUA-40060', name: 'ECO CUA-40060', model: 'General' },
  { id: 'CUA-40327', name: 'ECO CUA-40327', model: 'General' },
  { id: 'CUA-40328', name: 'ECO CUA-40328', model: 'General' },
  { id: 'CUA-40338', name: 'ECO CUA-40338', model: 'General' },
  { id: 'CUA-26786', name: 'ECO CUA-26786', model: 'General' }
];

export const CREWS = [
  { name: 'CRACK\'S', color: '#f472b6' }, // pink-400
  { name: 'X-MEN', color: '#4ade80' }, // green-400
  { name: 'GLADIADORES', color: '#22d3ee' }, // cyan-400
  { name: 'ARMAGEDÓN', color: '#facc15' }, // yellow-400
];

export const AREAS = [
  'LINEAS',
  'CORTADORA',
  'BUFFER',
  'FLETEO',
  'MP',
  'JARABES'
];

const CATEGORIES = {
  MAIN: 'Revisión General',
  SECURITY: 'Dispositivos de Seguridad',
  INVENTORY: 'Inventario de Vidrio y Plástico Rígido',
};

export const CHECKLIST_TEMPLATE: Checklist = [
  // Revisión General
  { id: 'steering_wheel', label: 'Volante en buen estado. Realizar pruebas de movilidad.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'fork_levers', label: 'Palancas de control de horquillas en buen estado y funcionando correctamente. Realizar pruebas.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'pedals', label: 'Pedales de aceleración y frenado funcionan adecuadamente. Realizar prueba.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'lights', label: 'Faros de reversa, Faros Delanteros y torreta funcionando correctamente.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'tires', label: 'Llantas motrices y direccionales en buen estado, pernos bien ajustados.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'gas_tank', label: 'Tanque de gas sin golpes, sin fuga, con mangueras y manómetro funcionando.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'extinguisher', label: 'Extintor en base, con carga y registro de inspección actualizado.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'seat', label: 'Asiento en óptimas condiciones.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'mirrors', label: '2 espejos retrovisores (izquierdo y derecho) en buen estado.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'fluid_levels', label: 'Niveles de fluidos correctos (anticongelante, aceite hidráulico, motor, frenos).', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'sensors', label: 'Sensores de proximidad funcionando correctamente, sin obstrucciones.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'hoses_pulleys', label: 'Mangueras sin fugas, poleas en buen estado, conexiones sin fuga y cadenas ajustadas.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },
  { id: 'mast_forks', label: 'Mástil y horquillas en buen estado, con funcionamiento adecuado.', category: CATEGORIES.MAIN, status: 'pending', comment: '', photo: null },

  // Dispositivos de Seguridad
  { id: 'security_brakes', label: 'Frenos', category: CATEGORIES.SECURITY, status: 'pending', comment: '', photo: null },
  { id: 'security_horn', label: 'Claxon', category: CATEGORIES.SECURITY, status: 'pending', comment: '', photo: null },
  { id: 'security_reverse_alarm', label: 'Alarma de Reversa', category: CATEGORIES.SECURITY, status: 'pending', comment: '', photo: null },
  { id: 'security_seatbelt', label: 'Cinturón Seguridad', category: CATEGORIES.SECURITY, status: 'pending', comment: '', photo: null },

  // Inventario de Vidrio y Plástico Rígido
  { id: 'inventory_rear_lights', label: '3 Calaveras traseras', category: CATEGORIES.INVENTORY, status: 'pending', comment: '', photo: null },
  { id: 'inventory_reverse_light', label: '1 Faro de reversa', category: CATEGORIES.INVENTORY, status: 'pending', comment: '', photo: null },
  { id: 'inventory_front_quarters', label: '2 Cuartos delanteros', category: CATEGORIES.INVENTORY, status: 'pending', comment: '', photo: null },
  { id: 'inventory_front_lights', label: '2 Faros delanteros', category: CATEGORIES.INVENTORY, status: 'pending', comment: '', photo: null },
  { id: 'inventory_turret', label: '1 Torreta', category: CATEGORIES.INVENTORY, status: 'pending', comment: '', photo: null },
];