import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  const fetchWorkouts = async () => {
    setLoading(true);
    setError('');

    console.log('Workouts endpoint:', endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Workouts request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Workouts fetched data:', data);

      const normalizedData = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      setWorkouts(normalizedData);
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to load workouts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) =>
    JSON.stringify(workout).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <h2 className="h3 text-primary mb-0">Workouts</h2>
          <a className="btn btn-outline-primary" href={endpoint} target="_blank" rel="noreferrer">
            API Link
          </a>
        </div>

        <form
          className="row g-2 align-items-center mb-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Filter workouts"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button type="button" className="btn btn-primary" onClick={fetchWorkouts}>
              Refresh
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
              Clear
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {loading && <div className="alert alert-info py-2">Loading workouts...</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: '70px' }}>#</th>
                <th scope="col">Name</th>
                <th scope="col">Summary</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">No workouts found.</td>
                </tr>
              ) : (
                filteredWorkouts.map((workout, index) => (
                  <tr key={workout.id || workout._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{workout.name || workout.title || `Workout ${index + 1}`}</td>
                    <td>{workout.duration || workout.level || 'No summary available.'}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedItem(workout)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal-backdrop-soft" onClick={() => setSelectedItem(null)} />
          <div className="modal show d-block" role="dialog" aria-modal="true" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Workout Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Workouts;
