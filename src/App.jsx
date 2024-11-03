import { useState } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Calendar } from '@/components/Calendar';
import { Modal } from '@/components/Modal';

const MAX_TASKS = 10;
const INITIAL_TASKS = [
  { title: 'task 1', startDate: '2024-01-23', endDate: '2024-01-27' },
  { title: 'task 2', startDate: '2024-02-21', endDate: '2024-03-03'},
  { title: 'task 3', startDate: '2024-01-30', endDate: '2024-03-20' },
  { title: 'task 4', startDate: '2024-03-20', endDate: '2024-04-20' },
];

function AddTaskForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target));

    onSubmit(data);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div >
        <label htmlFor="task-title" className="block mb-2 text-sm font-medium text-gray-900">Task title</label>
        <input id="task-tile" name="title" type="text"  required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className='flex gap-3 mb-6'>
        <div>
          <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-gray-900">Start date</label>
          <input id="start-date" name="startDate" type="date" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
        <div>
          <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-gray-900">End date</label>
          <input id="end-date" name="endDate" type="date" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
        Add
      </button>
  </form>
  )
}

function App() {
  const [tasks, setTasks] = useLocalStorage('SHARE_CLOUD_TASKS', INITIAL_TASKS);
  const [isAddFormVisible, setAddFormVisibility] = useState(false);

  const canAddTask = tasks.length < MAX_TASKS;

  const onAddTaskSubmit = (data) => {
    setAddFormVisibility(false);

    setTasks([...tasks, data])
  };

  return (
    <>
      <Calendar
        tasks={tasks}
        addTask={() => setAddFormVisibility(true)}
        canAddTask={canAddTask}
      />

      {isAddFormVisible && <Modal close={() => setAddFormVisibility(false)}>
        <AddTaskForm onSubmit={onAddTaskSubmit} />
      </Modal>}
    </>
  )
}

export default App
