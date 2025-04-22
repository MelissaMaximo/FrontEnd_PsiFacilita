import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../../components/ui/Title/Title';
import Button from '../../components/ui/Button/Button';


interface DocumentData {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
}

const DocumentDetail: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const [loading, setLoading] = useState(true);
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Simular carregamento de dados do documento
    const fetchDocument = async () => {
      try {
        // Aqui você faria uma chamada à API para obter os dados do documento
        // Simulando uma resposta após 500ms
        setTimeout(() => {
          setDocumentData({

            id: id || '',
            title: `Documento ${id}`,
            category: category || '',

            content: 'Conteúdo do documento...',
            createdAt: new Date().toISOString(),
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Erro ao carregar documento:', error);
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id, category]);

  const handleGoBack = () => {
    navigate('/documents');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600">Carregando documento...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Title level={1}>{documentData?.title}</Title>
        <Button variant="outline" onClick={handleGoBack}>
          Voltar
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {documentData?.category}
          </span>
          <span className="text-gray-500 text-sm">

            Criado em: {new Date(documentData?.createdAt || '').toLocaleDateString()}
            
          </span>
        </div>

        <div className="border-t pt-4">
          <p className="whitespace-pre-line">{documentData?.content}</p>


          {/* Espaço para editor de documentos */}
          <div className="mt-8 flex justify-end space-x-3">
            <Button variant="outline">Download</Button>
            <Button variant="primary">Editar</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentDetail;