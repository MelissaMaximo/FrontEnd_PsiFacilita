import React from 'react';
import Title from '../../components/ui/Title/Title';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button/Button';

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

const Patients: React.FC = () => {
  const patients: Patient[] = [
    { id: '1', name: 'João Silva', phone: '(11) 99999-9999', email: 'joao@email.com', status: 'active' },
    { id: '2', name: 'Maria Souza', phone: '(11) 88888-8888', email: 'maria@email.com', status: 'active' },
    { id: '3', name: 'Carlos Oliveira', phone: '(11) 77777-7777', email: 'carlos@email.com', status: 'inactive' },
  ];

  const handleViewPatient = (id: string) => {
    console.log('Visualizar paciente:', id);
    // Lógica para visualizar o paciente
  };

  const columns = [
    { header: 'Nome do Paciente', accessor: 'name' as const },
    { header: 'Telefone', accessor: 'phone' as const },
    { header: 'Email', accessor: 'email' as const },
    { 
      header: 'Status', 
      accessor: 'status' as const,
      Cell: ({ value }: { value: string }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      )
    },
    {
      header: 'Ações',
      accessor: 'id' as const,
      Cell: ({ value }: { value: string }) => (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleViewPatient(value)}
        >
          Ver
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Title level={1}>Pacientes</Title>
        <Button variant="primary">
          Adicionar Paciente
        </Button>
      </div>
      <Table<Patient> data={patients} columns={columns} />
    </>
  );
};

export default Patients;