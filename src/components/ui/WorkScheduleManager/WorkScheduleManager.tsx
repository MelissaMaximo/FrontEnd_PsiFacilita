import React, { useState } from 'react';
import Title from '../Title';
import Button from '../Button';
import Input from '../Form/Input';
import Label from '../Form/Label';
import Select from '../Form/Select';
import Modal from '../Modal';

interface TimeSlot {
  id: string;
  type: 'work' | 'break';
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface DailySchedule {
  date: string; // formato YYYY-MM-DD
  timeSlots: TimeSlot[];
}

interface WorkScheduleManagerProps {
  initialSchedules?: DailySchedule[];
  onSave?: (schedules: DailySchedule[]) => void;
}

const WorkScheduleManager: React.FC<WorkScheduleManagerProps> = ({
  initialSchedules = [],
  onSave
}) => {
  const [schedules, setSchedules] = useState<DailySchedule[]>(initialSchedules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentSchedule, setCurrentSchedule] = useState<DailySchedule | null>(null);
  
  // Formato da data atual YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (!selectedDate) {
      setSelectedDate(today);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    
    // Verifica se já existe agenda para esta data
    const existingSchedule = schedules.find(s => s.date === date);
    if (existingSchedule) {
      setCurrentSchedule(existingSchedule);
    } else {
      // Cria uma nova agenda vazia para a data selecionada
      setCurrentSchedule({
        date,
        timeSlots: []
      });
    }
  };

  const handleAddTimeSlot = () => {
    if (!currentSchedule) return;

    const newTimeSlot: TimeSlot = {
      id: Date.now().toString(),
      type: 'work',
      startTime: '08:00',
      endTime: '12:00',
      isActive: true
    };

    setCurrentSchedule({
      ...currentSchedule,
      timeSlots: [...currentSchedule.timeSlots, newTimeSlot]
    });
  };

  const handleTimeSlotChange = (id: string, field: keyof TimeSlot, value: any) => {
    if (!currentSchedule) return;

    const updatedTimeSlots = currentSchedule.timeSlots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    );

    setCurrentSchedule({
      ...currentSchedule,
      timeSlots: updatedTimeSlots
    });
  };

  const handleRemoveTimeSlot = (id: string) => {
    if (!currentSchedule) return;

    const updatedTimeSlots = currentSchedule.timeSlots.filter(slot => slot.id !== id);
    setCurrentSchedule({
      ...currentSchedule,
      timeSlots: updatedTimeSlots
    });
  };

  const handleSaveSchedule = () => {
    if (!currentSchedule) return;

    // Atualiza a agenda atual ou adiciona uma nova
    const scheduleIndex = schedules.findIndex(s => s.date === currentSchedule.date);
    let updatedSchedules: DailySchedule[];

    if (scheduleIndex >= 0) {
      updatedSchedules = [...schedules];
      updatedSchedules[scheduleIndex] = currentSchedule;
    } else {
      updatedSchedules = [...schedules, currentSchedule];
    }

    setSchedules(updatedSchedules);
    
    if (onSave) {
      onSave(updatedSchedules);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>Horários de Atendimento</Title>
        <Button 
          variant="primary" 
          onClick={handleOpenModal}
        >
          Gerenciar Horários
        </Button>
      </div>

      {schedules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedules.map(schedule => (
            <div key={schedule.date} className="border rounded-lg p-4">
              <h4 className="font-medium text-lg mb-2">
                {new Date(schedule.date).toLocaleDateString('pt-BR')}
              </h4>
              <ul className="space-y-2">
                {schedule.timeSlots.map(slot => (
                  <li 
                    key={slot.id}
                    className={`${!slot.isActive ? 'text-gray-400' : ''}`}
                  >
                    <div className="flex items-center">
                      <span className={`inline-block w-4 h-4 rounded-full mr-2 ${
                        slot.type === 'work' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></span>
                      <span>
                        {slot.startTime} - {slot.endTime}
                        {' '}
                        <span className="text-sm">
                          ({slot.type === 'work' ? 'Atendimento' : 'Intervalo'})
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <Button 
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setSelectedDate(schedule.date);
                  setCurrentSchedule(schedule);
                  setIsModalOpen(true);
                }}
              >
                Editar
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Nenhum horário configurado. Clique em "Gerenciar Horários" para começar.
        </div>
      )}

      {/* Modal para edição de horários */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Configurar Horários"
        size="large"
      >
        <div className="mb-4">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={today}
          />
        </div>

        {currentSchedule && (
          <>
            <div className="mt-6 mb-4 flex justify-between items-center">
              <h4 className="font-medium">Horários do dia</h4>
              <Button 
                variant="secondary"
                size="sm"
                onClick={handleAddTimeSlot}
              >
                Adicionar Horário
              </Button>
            </div>
            
            {currentSchedule.timeSlots.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {currentSchedule.timeSlots.map(slot => (
                  <div key={slot.id} className="border rounded p-4 relative">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor={`type-${slot.id}`}>Tipo</Label>
                        <Select
                          id={`type-${slot.id}`}
                          value={slot.type}
                          options={[
                            { value: 'work', label: 'Atendimento' },
                            { value: 'break', label: 'Intervalo' },
                          ]}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleTimeSlotChange(slot.id, 'type', e.target.value as 'work' | 'break')}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`startTime-${slot.id}`}>Início</Label>
                        <Input
                          id={`startTime-${slot.id}`}
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => handleTimeSlotChange(slot.id, 'startTime', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`endTime-${slot.id}`}>Fim</Label>
                        <Input
                          id={`endTime-${slot.id}`}
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => handleTimeSlotChange(slot.id, 'endTime', e.target.value)}
                        />
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={slot.isActive}
                            onChange={(e) => handleTimeSlotChange(slot.id, 'isActive', e.target.checked)}
                            className="form-checkbox h-5 w-5"
                          />
                          <span>Ativo</span>
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveTimeSlot(slot.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhum horário adicionado. Clique em "Adicionar Horário" para começar.
              </div>
            )}
          </>
        )}

        <div className="mt-6 flex justify-end space-x-2">
          <Button 
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary"
            onClick={handleSaveSchedule}
            disabled={!currentSchedule || currentSchedule.timeSlots.length === 0}
          >
            Salvar Horários
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default WorkScheduleManager;