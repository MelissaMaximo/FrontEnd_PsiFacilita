import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import Title from '../../components/ui/Title/Title';
import Dropdown from '../../components/ui/Dropdown'; 

const Documents: React.FC = () => {
  const documentTypes = [
    { id: '1', name: 'Avaliação Psicológica', category: 'Avaliações' },
    { id: '2', name: 'Relatório de Sessão', category: 'Relatórios' },
    { id: '3', name: 'Anamnese', category: 'Avaliações' },
    { id: '4', name: 'Termo de Consentimento', category: 'Documentos Legais' },
  ];

  const handleSelectDocument = (documentId: string) => {
    console.log('Documento selecionado:', documentId);
    // Lógica para carregar o documento selecionado
  };

  return (
    <MainLayout>
      <Title level={1}>Documentos</Title>
      
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-lg font-medium mb-4">Selecione um Documento</h2>
        <Dropdown
          options={documentTypes.map(doc => ({
            value: doc.id,
            label: `${doc.name} (${doc.category})`
          }))}
          onSelect={handleSelectDocument}
          placeholder="Selecione um documento..."
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Documentos Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentTypes.slice(0, 3).map(doc => (
            <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">{doc.name}</h3>
              <p className="text-sm text-gray-500">{doc.category}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Documents;