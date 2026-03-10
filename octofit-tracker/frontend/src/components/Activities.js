import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  const fetchActivities = async () => {
    setLoading(true);
    setError('');

    console.log('Activities endpoint:', endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Activities request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Activities fetched data:', data);

      const normalizedData = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      setActivities(normalizedData);
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to load activities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) =>
    JSON.stringify(activity).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <h2 className="h3 text-primary mb-0">Activities</h2>
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
              placeholder="Filter activities"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button type="button" className="btn btn-primary" onClick={fetchActivities}>
              Refresh
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
              Clear
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {loading && <div className="alert alert-info py-2">Loading activities...</div>}

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
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">No activities found.</td>
                </tr>
              ) : (
                filteredActivities.map((activity, index) => (
                  <tr key={activity.id || activity._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{activity.name || activity.title || 'Activity'}</td>
                    <td>{activity.description || activity.type || 'No description available.'}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedItem(activity)}
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
                  <h3 className="modal-title h5 mb-0">Activity Details</h3>
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

export default Activities;
