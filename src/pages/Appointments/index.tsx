import React from 'react';
import Title from '../../components/ui/Title/Title';
import Table from '../../components/ui/Table/Table';
import Button from '../../components/ui/Button/Button';

interface Appointment extends Record<string, unknown> {
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

  const columns = [
    {
      header: 'Nome do Paciente',
      accessor: 'patientName' as const,
      Cell: ({ value }: { value: unknown }) => <>{String(value)}</>,
    },
    {
      header: 'Horário',
      accessor: 'time' as const,
      Cell: ({ value }: { value: unknown }) => <>{String(value)}</>,
    },
    {
      header: 'Data',
      accessor: 'date' as const,
      Cell: ({ value }: { value: unknown }) => <>{String(value)}</>,
    },
    {
      header: 'Ações',
      accessor: 'id' as const,
      Cell: ({ value }: { value: unknown }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleView(String(value))}
        >
          Ver
        </Button>
      ),
    },
  ];

  return (
    <>
      <Title level={1} className="text-xl md:text-3xl mb-4">
        Agendamentos
      </Title>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md w-full">
        <Table<Appointment> data={appointments} columns={columns} />
      </div>
    </>
  );
};

export default Appointments;