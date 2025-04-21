import React from 'react';
import Title from '../../components/ui/Title';
import PersonalDataSettings from '../../components/ui/PersonalDataSettings';
import CollaboratorManager from '../../components/ui/CollaboratorManager';
import WorkScheduleManager from '../../components/ui/WorkScheduleManager';

const Settings: React.FC = () => {
  const [userData] = React.useState({
    name: 'Dr. Psicólogo',
    email: 'psicologo@clinica.com',
    phone: '(11) 99999-9999',
    specialization: 'Psicologia Clínica'
  });

  const handlePersonalDataSave = (data: any) => {
    console.log('Dados pessoais atualizados:', data);
    // Implementar lógica para salvar os dados
  };

  const handleCollaboratorsSave = (collaborators: any[]) => {
    console.log('Colaboradores atualizados:', collaborators);
    // Implementar lógica para salvar colaboradores
  };

  const handleScheduleSave = (schedules: any[]) => {
    console.log('Horários atualizados:', schedules);
    // Implementar lógica para salvar horários
  };

  return (
    <div className="pb-10">
      <Title level={1}>Configurações</Title>
      
      <PersonalDataSettings 
        initialData={userData}
        onSave={handlePersonalDataSave}
      />
      
      <CollaboratorManager
        onSave={handleCollaboratorsSave}
      />
      
      <WorkScheduleManager
        onSave={handleScheduleSave}
      />
    </div>
  );
};

export default Settings;