import React from 'react';
import Title from '../../components/ui/Title/Title';
import DocumentCategoryDropdown from '../../components/ui/DocumentCategoryDropdown';

const Documents: React.FC = () => {
  const documentCategories = [
    {
      name: 'Administrativos',
      documents: [
        { id: 'adm-1', name: 'Formulário de Admissão', route: '/documents/administrativos/adm-1' },
        { id: 'adm-2', name: 'Formulário de Alta', route: '/documents/administrativos/adm-2' },
        { id: 'adm-3', name: 'Prontuário', route: '/documents/administrativos/adm-3' },
      ],
    },
    {
      name: 'Atestados e Declarações',
      documents: [
        { id: 'atd-1', name: 'Atestado de Comparecimento', route: '/documents/atestados/atd-1' },
        { id: 'atd-2', name: 'Atestado Psicológico', route: '/documents/atestados/atd-2' },
        { id: 'atd-3', name: 'Declaração de Acompanhamento', route: '/documents/atestados/atd-3' },
      ],
    },
    {
      name: 'Avaliações',
      documents: [
        { id: 'ava-1', name: 'Avaliação Psicológica', route: '/documents/avaliacoes/ava-1' },
        { id: 'ava-2', name: 'Anamnese', route: '/documents/avaliacoes/ava-2' },
        { id: 'ava-3', name: 'Teste de Personalidade', route: '/documents/avaliacoes/ava-3' },
      ],
    },
    {
      name: 'Complementares',
      documents: [
        { id: 'com-1', name: 'Registro de Sessão', route: '/documents/complementares/com-1' },
        { id: 'com-2', name: 'Anotações Clínicas', route: '/documents/complementares/com-2' },
      ],
    },
    {
      name: 'Contratuais e Encaminhamentos',
      documents: [
        { id: 'con-1', name: 'Contrato de Prestação de Serviços', route: '/documents/contratuais/con-1' },
        { id: 'con-2', name: 'Encaminhamento para Especialista', route: '/documents/contratuais/con-2' },
        { id: 'con-3', name: 'Termo de Compromisso', route: '/documents/contratuais/con-3' },
      ],
    },
    {
      name: 'Técnicos',
      documents: [
        { id: 'tec-1', name: 'Parecer Técnico', route: '/documents/tecnicos/tec-1' },
        { id: 'tec-2', name: 'Informe Psicológico', route: '/documents/tecnicos/tec-2' },
        { id: 'tec-3', name: 'Laudo Psicológico', route: '/documents/tecnicos/tec-3' },
      ],
    },
  ];

  const recentDocuments = [
    { id: 'ava-1', name: 'Avaliação Psicológica', category: 'Avaliações' },
    { id: 'con-1', name: 'Contrato de Prestação de Serviços', category: 'Contratuais' },
    { id: 'atd-2', name: 'Atestado Psicológico', category: 'Atestados' },
  ];

  return (
    <>
      <Title level={1}>Documentos</Title>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Seção de Dropdowns */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-lg font-medium mb-4">Modelos de Documentos</h2>
            <p className="text-gray-600 mb-6">
              Selecione uma categoria e escolha o modelo de documento que deseja visualizar ou editar.
            </p>
            <DocumentCategoryDropdown categories={documentCategories} />
          </div>
        </div>

        {/* Seção de Documentos Recentes */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-lg font-medium mb-4">Documentos Recentes</h2>
            <div className="space-y-3">
              {recentDocuments.map(doc => (
                <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;