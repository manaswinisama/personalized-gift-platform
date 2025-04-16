import { useState } from 'react';
import { Calendar as CalendarIcon, Bell, Plus, Trash2, Edit2, Search, X } from 'lucide-react';
import Calendar from 'react-calendar';
import type { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Occasion {
  id: number;
  name: string;
  date: string;
  person: string;
  reminder: boolean;
}

const Occasions: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [occasions, setOccasions] = useState<Occasion[]>([
    { id: 1, name: "Birthday", date: "2024-02-14", person: "Mom", reminder: true },
    { id: 2, name: "Anniversary", date: "2024-03-20", person: "Parents", reminder: false },
  ]);
  const [isAddingOccasion, setIsAddingOccasion] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editingOccasion, setEditingOccasion] = useState({
    name: '',
    date: '',
    person: '',
  });
  const [newOccasion, setNewOccasion] = useState({
    name: '',
    date: '',
    person: '',
  });

  const sortedAndFilteredOccasions = occasions
    .filter((occasion: Occasion) => {
      const matchesSearch = 
        occasion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        occasion.person.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === 'all') return matchesSearch;
      if (filter === 'upcoming') {
        return matchesSearch && new Date(occasion.date) > new Date();
      }
      if (filter === 'reminders') {
        return matchesSearch && occasion.reminder;
      }
      return matchesSearch;
    })
    .sort((a: Occasion, b: Occasion) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddOccasion = () => {
    if (newOccasion.name && newOccasion.date && newOccasion.person) {
      setOccasions([
        ...occasions,
        {
          id: occasions.length + 1,
          ...newOccasion,
          reminder: false,
        },
      ]);
      setNewOccasion({ name: '', date: '', person: '' });
      setIsAddingOccasion(false);
    }
  };

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const toggleReminder = (id: number) => {
    setOccasions(occasions.map(occasion => 
      occasion.id === id 
        ? { ...occasion, reminder: !occasion.reminder }
        : occasion
    ));
  };

  const handleDeleteOccasion = (id: number) => {
    setOccasions(occasions.filter(occasion => occasion.id !== id));
  };

  // Add getCountdown function
  const getCountdown = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days away` : 'Today!';
  };

  // Add handleEditOccasion function
  const handleEditOccasion = (id: number) => {
    const occasion = occasions.find(o => o.id === id);
    if (occasion) {
      setIsEditing(id);
      setEditingOccasion({
        name: occasion.name,
        date: occasion.date,
        person: occasion.person,
      });
    }
  };

  // Add handleSaveEdit function
  const handleSaveEdit = () => {
    if (isEditing && editingOccasion.name && editingOccasion.date && editingOccasion.person) {
      setOccasions(occasions.map(occasion =>
        occasion.id === isEditing
          ? { ...occasion, ...editingOccasion }
          : occasion
      ));
      setIsEditing(null);
      setEditingOccasion({ name: '', date: '', person: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search occasions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Occasions</option>
            <option value="upcoming">Upcoming</option>
            <option value="reminders">With Reminders</option>
          </select>
          <button
            onClick={() => setIsAddingOccasion(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Occasion
          </button>
        </div>
      </div>

      {/* Add occasion form */}
      {isAddingOccasion && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Add New Occasion</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Occasion Name"
              value={newOccasion.name}
              onChange={(e) => setNewOccasion({ ...newOccasion, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="date"
              value={newOccasion.date}
              onChange={(e) => setNewOccasion({ ...newOccasion, date: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="For whom?"
              value={newOccasion.person}
              onChange={(e) => setNewOccasion({ ...newOccasion, person: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingOccasion(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOccasion}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
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
    
        {/* Updated Occasions List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Upcoming Occasions</h2>
          <div className="space-y-4">
            {sortedAndFilteredOccasions.map(occasion => (
              <div key={occasion.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-medium">{occasion.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">For: {occasion.person}</p>
                  <p className="text-sm text-gray-500">{occasion.date}</p>
                  <p className="text-sm text-primary-600 font-medium">{getCountdown(occasion.date)}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleReminder(occasion.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <Bell className={`h-5 w-5 ${occasion.reminder ? 'text-secondary-600 fill-current' : 'text-gray-400'}`} />
                  </button>
                  <button 
                    onClick={() => handleEditOccasion(occasion.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <Edit2 className="h-5 w-5 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteOccasion(occasion.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit occasion form */}
      {isEditing && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Edit Occasion</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Occasion Name"
              value={editingOccasion.name}
              onChange={(e) => setEditingOccasion({ ...editingOccasion, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="date"
              value={editingOccasion.date}
              onChange={(e) => setEditingOccasion({ ...editingOccasion, date: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="For whom?"
              value={editingOccasion.person}
              onChange={(e) => setEditingOccasion({ ...editingOccasion, person: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Occasions;