import React, { useState, useEffect } from 'react';

const MinerDashboard = () => {
  const [miners, setMiners] = useState([]);
  const [newMiner, setNewMiner] = useState({ model: '', duration: '' });
  const [durationFilter, setDurationFilter] = useState('all');

  const durations = [3, 6, 9, 12];

  // Function to generate random miners
  const generateRandomMiners = (count: number) => {
    const models = ['AntMiner S19', 'Whatsminer M30S', 'Avalon 1246', 'Innosilicon T3+', 'Canaan AvalonMiner 1166 Pro'];

    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      model: models[Math.floor(Math.random() * models.length)],
      duration: durations[Math.floor(Math.random() * durations.length)],
      hashrate: Math.floor(Math.random() * (100 - 50 + 1) + 50), // Random hashrate between 50-100 TH/s
    }));
  };

  useEffect(() => {
    setMiners(generateRandomMiners(10)); // Generate 10 random miners on component mount
  }, []);

  const handleCreateMiner = (e) => {
    e.preventDefault();
    if (newMiner.model && newMiner.duration) {
      const newMinerWithDetails = {
        ...newMiner,
        id: Date.now(), // Use timestamp for unique ID
        duration: parseInt(newMiner.duration),
        hashrate: Math.floor(Math.random() * (100 - 50 + 1) + 50),
      };
      setMiners((prevMiners) => [...prevMiners, newMinerWithDetails]);
      setNewMiner({ model: '', duration: '' });
      setDurationFilter(newMiner.duration); // Set filter to new miner's duration
    }
  };

  const handleDeleteMiner = (id: any) => {
    setMiners((prevMiners) => prevMiners.filter((miner) => miner.id !== id));
  };

  const filteredMiners = miners.filter((miner) => durationFilter === 'all' || miner.duration === parseInt(durationFilter));

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Miner Dashboard</h1>

      {/* Create Miner Form */}
      <form onSubmit={handleCreateMiner} className="mb-4 p-4 border rounded">
        <h2 className="text-xl font-bold mb-2">Create Miner</h2>
        <input
          type="text"
          placeholder="Miner Model"
          value={newMiner.model}
          onChange={(e) => setNewMiner({ ...newMiner, model: e.target.value })}
          className="border p-2 mr-2"
        />
        <select value={newMiner.duration} onChange={(e) => setNewMiner({ ...newMiner, duration: e.target.value })} className="border p-2 mr-2">
          <option value="">Select Duration</option>
          {durations.map((duration) => (
            <option key={duration} value={duration}>
              {duration} months
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
      </form>

      {/* Miners List with Filter */}
      <h2 className="text-xl font-bold mb-2">Miners List</h2>
      <div className="mb-4">
        <label htmlFor="duration-filter" className="mr-2">
          Filter by Duration:
        </label>
        <select id="duration-filter" value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)} className="border p-2">
          <option value="all">All Durations</option>
          {durations.map((duration) => (
            <option key={duration} value={duration}>
              {duration} months
            </option>
          ))}
        </select>
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left">Model</th>
            <th className="text-left">Duration (months)</th>
            <th className="text-left">Hashrate (TH/s)</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMiners.map((miner) => (
            <tr key={miner.id}>
              <td>{miner.model}</td>
              <td>{miner.duration}</td>
              <td>{miner.hashrate}</td>
              <td>
                <button onClick={() => handleDeleteMiner(miner.id)} className="bg-red-500 text-white p-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MinerDashboard;
