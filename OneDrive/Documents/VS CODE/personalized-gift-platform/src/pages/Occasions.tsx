import { useState } from 'react';
import { Calendar as CalendarIcon, Gift, Bell } from 'lucide-react';
import Calendar, { Value } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Occasions = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [occasions, setOccasions] = useState([
    { id: 1, name: "Birthday", date: "2024-02-14", person: "Mom", reminder: true },
    { id: 2, name: "Anniversary", date: "2024-03-20", person: "Parents", reminder: false },
  ]);

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  const toggleReminder = (id: number) => {
    setOccasions(occasions.map(occasion => 
      occasion.id === id 
        ? { ...occasion, reminder: !occasion.reminder }
        : occasion
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Special Occasions</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-primary-600" />
            Calendar
          </h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="w-full border-none rounded-lg"
          />
        </div>

        {/* Occasions List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Upcoming Occasions</h2>
          <div className="space-y-4">
            {occasions.map(occasion => (
              <div key={occasion.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium">{occasion.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">For: {occasion.person}</p>
                  <p className="text-sm text-gray-500">{occasion.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                    <Gift className="h-5 w-5 text-primary-600" />
                  </button>
                  <button 
                    onClick={() => toggleReminder(occasion.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <Bell className={`h-5 w-5 ${
                      occasion.reminder 
                        ? 'text-secondary-600 fill-current' 
                        : 'text-gray-400'
                    }`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Occasions;