import Title from '../../components/ui/Title/Title';
import Card from '../../components/ui/Card/Card';
import Chart from '../../components/ui/Chart/Chart';

const Dashboard: React.FC = () => {
  const dashboardCards = [
    {
      title: 'Pacientes Ativos',
      value: 42,
      description: '+5 desde a última semana',
    },
    {
      title: 'Pacientes Inativos',
      value: 8,
      description: '+1 desde a última semana',
    },
    {
      title: 'Consultas Agendadas',
      value: 23,
      description: '3 hoje',
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Pacientes Ativos',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#065f46',
      },
      {
        label: 'Pacientes Inativos',
        data: [2, 3, 1, 5, 2, 1],
        backgroundColor: '#047857',
      },
    ],
  };

  return (
    <>
      <Title level={1} className="text-xl md:text-3xl">Dashboard</Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {dashboardCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            description={card.description}
            className="h-full"
          />
        ))}
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <Title level={2} className="text-lg md:text-xl mb-3 md:mb-4">
          Pacientes Cadastrados
        </Title>
        <Chart data={chartData} />
      </div>
    </>
  );
};

export default Dashboard;
