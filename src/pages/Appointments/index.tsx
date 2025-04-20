import React from 'react';
import Title from '../../components/ui/Title/Title';
import Button from '../../components/ui/Button/Button';
import Table from '../../components/ui/Table';


interface Appointment {
  id: string;
  patientName: string;
  time: string;
  date: string;
}

const Appointments: React.FC = () => {
  const handleView = (id: string) => {
    console.log('Visualizar agendamento:', id);
  };

  const appointments: Appointment[] = [
    { id: '1', patientName: 'João Silva', time: '14:00', date: '2023-05-15' },
    { id: '2', patientName: 'Maria Souza', time: '10:30', date: '2023-05-16' },
    { id: '3', patientName: 'Carlos Oliveira', time: '16:45', date: '2023-05-17' },
  ];

  interface TableColumn<T> {
    header: string;
    accessor: keyof T;
    Cell?: React.FC<{ value: T[keyof T] }>;
  }
  

  const columns: TableColumn<Appointment>[] = [
    {
      header: 'Nome do Paciente',
      accessor: 'patientName',
      Cell: ({ value }: { value: Appointment['patientName'] }) => <span>{value}</span>,
    },
    {
      header: 'Horário',
      accessor: 'time',
      Cell: ({ value }: { value: Appointment['time'] }) => <span>{value}</span>,
    },
    {
      header: 'Data',
      accessor: 'date',
      Cell: ({ value }: { value: Appointment['date'] }) => <span>{value}</span>,
    },
    {
      header: 'Ações',
      accessor: 'id',
      Cell: ({ value }: { value: Appointment['id'] }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleView(value)}
          aria-label={`Ver detalhes do agendamento ${value}`}
        >
          Ver
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Title level={1} className="mb-6">
        Agendamentos
      </Title>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table 
          data={appointments} 
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Appointments;