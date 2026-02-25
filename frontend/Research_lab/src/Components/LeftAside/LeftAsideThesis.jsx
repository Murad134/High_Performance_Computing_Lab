function LeftAsideThesis({ activeTab, setActiveTab }) {
  return (
    <div className="flex divide-x border text-sm font-semibold rounded-lg overflow-hidden">
      <button
        onClick={() => setActiveTab('current')}
        className={`flex-1 py-3 ${
          activeTab === 'current'
            ? 'bg-blue-200'
            : 'hover:bg-blue-100'
        }`}
      >
        Current Thesis
      </button>

      <button
        onClick={() => setActiveTab('completed')}
        className={`flex-1 py-3 ${
          activeTab === 'completed'
            ? 'bg-purple-200'
            : 'hover:bg-purple-100'
        }`}
      >
        Completed Thesis
      </button>
    </div>
  );
}

export default LeftAsideThesis;