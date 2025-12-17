function LeftAside({ activeTab, setActiveTab }) {
  return (
    <div className="flex divide-x border text-sm font-semibold rounded-lg overflow-hidden">
      <button
        onClick={() => setActiveTab('current')}
        className={`flex-1 py-3 ${
          activeTab === 'current'
            ? 'bg-green-200'
            : 'hover:bg-green-100'
        }`}
      >
        Current Projects
      </button>

      <button
        onClick={() => setActiveTab('completed')}
        className={`flex-1 py-3 ${
          activeTab === 'completed'
            ? 'bg-yellow-200'
            : 'hover:bg-yellow-100'
        }`}
      >
        Completed Projects
      </button>
    </div>
  );
}

export default LeftAside;
