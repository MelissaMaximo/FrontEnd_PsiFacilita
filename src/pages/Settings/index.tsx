import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import Title from '../../components/ui/Title/Title';
import Input from '../../components/ui/Form/Input';
import Label from '../../components/ui/Form/Label';
import Button from '../../components/ui/Button/Button';

const Settings: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: 'Dr. Psicólogo',
    email: 'psicologo@clinica.com',
    workingHours: '09:00 - 18:00',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar configurações
    alert('Configurações salvas com sucesso!');
  };

  return (
    <MainLayout>
      <Title level={1}>Configurações</Title>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mt-6 max-w-2xl">
        <div className="mb-4">
          <Label htmlFor="name">Nome do Profissional</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="workingHours">Horário de Atendimento</Label>
          <Input
            id="workingHours"
            name="workingHours"
            value={formData.workingHours}
            onChange={handleChange}
            placeholder="Ex: 09:00 - 18:00"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Salvar Configurações
          </Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default Settings;