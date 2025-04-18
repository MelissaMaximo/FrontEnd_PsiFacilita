// Tipos para pacientes
export interface Patient {
    id: string;
    name: string;
    phone: string;
    email: string;
    status: 'active' | 'inactive';
  }
  
  // Tipos para agendamentos
  export interface Appointment {
    id: string;
    patientName: string;
    time: string;
    date: string;
  }
  
  // Tipos para documentos
  export interface Document {
    id: string;
    name: string;
    category: string;
  }
  
  // Tipos para os cards do dashboard
  export interface DashboardCard {
    title: string;
    value: number;
    description: string;
  }