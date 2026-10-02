/* =========================================================
   ABN FLEET
   ALERTS PAGE
   ========================================================= */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAlerts,
  fetchAlertById,
  fetchAlertSummary,
  acknowledgeAlert,
  resolveAlert,
  deleteAlert,
  setAlertFilter,
  setSelectedAlert,
  selectAlerts,
  selectAlertSummary,
  selectAlertFilters,
  selectAlertLoading,
  selectAlertSummaryLoading,
  selectAlertActionLoading,
  selectAlertError,
  selectAlertActionError,
  selectSelectedAlert,
} from "../../features/alert/alertSlice";

import type { AppDispatch } from "../../stores/store";

import "./Alerts.css";
/* =========================================================
   HELPERS
   ========================================================= */

const formatDate = (value: string | null | undefined) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

/* =========================================================
   SEVERITY BADGE
   ========================================================= */

const severityClass = (severity: string) => {
  switch (severity) {
    case "CRITICAL":
      return "alert-badge alert-critical";

    case "WARNING":
      return "alert-badge alert-warning";

    case "INFO":
      return "alert-badge alert-info";

    default:
      return "alert-badge";
  }
};

/* =========================================================
   STATUS BADGE
   ========================================================= */

const statusClass = (status: string) => {
  switch (status) {
    case "NEW":
      return "alert-status alert-status-new";

    case "ACKNOWLEDGED":
      return "alert-status alert-status-ack";

    case "RESOLVED":
      return "alert-status alert-status-resolved";

    default:
      return "alert-status";
  }
};

/* =========================================================
   COMPONENT
   ========================================================= */

const Alerts = () => {
  const dispatch = useDispatch<AppDispatch>();

  /* =======================================================
     SELECTORS
     ======================================================= */

  const alerts = useSelector(selectAlerts);

  const summary = useSelector(selectAlertSummary);

  const filters = useSelector(selectAlertFilters);

  const loading = useSelector(selectAlertLoading);

  const summaryLoading = useSelector(selectAlertSummaryLoading);

  const actionLoading = useSelector(selectAlertActionLoading);

  const error = useSelector(selectAlertError);

  const actionError = useSelector(selectAlertActionError);

  const selectedAlert = useSelector(selectSelectedAlert);

  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {
    dispatch(fetchAlerts(filters));
    dispatch(fetchAlertSummary());
  }, [dispatch]);

  /* =======================================================
     FILTER CHANGE
     ======================================================= */

  const handleFilterChange = (
    key: "search" | "severity" | "status",
    value: string,
  ) => {
    const nextFilters = {
      ...filters,
      [key]: value,
      offset: 0,
    };

    dispatch(
      setAlertFilter({
        key,
        value,
      }),
    );

    dispatch(fetchAlerts(nextFilters));
  };

  /* =======================================================
     SELECT / DETAIL
     ======================================================= */

  const handleSelectAlert = (id: number) => {
    dispatch(fetchAlertById(id));
  };

  /* =======================================================
     REFRESH
     ======================================================= */

  const handleRefresh = () => {
    dispatch(fetchAlerts(filters));
    dispatch(fetchAlertSummary());

    if (selectedAlert) {
      dispatch(fetchAlertById(selectedAlert.id));
    }
  };

  /* =======================================================
     ACKNOWLEDGE
     ======================================================= */

  const handleAcknowledge = async () => {
    if (!selectedAlert) return;

    const result = await dispatch(acknowledgeAlert(selectedAlert.id));

    if (acknowledgeAlert.fulfilled.match(result)) {
      dispatch(fetchAlertSummary());
    }
  };

  /* =======================================================
     RESOLVE
     ======================================================= */

  const handleResolve = async () => {
    if (!selectedAlert) return;

    const result = await dispatch(resolveAlert(selectedAlert.id));

    if (resolveAlert.fulfilled.match(result)) {
      dispatch(fetchAlertSummary());
    }
  };

  /* =======================================================
     DELETE
     ======================================================= */

  const handleDelete = async () => {
    if (!selectedAlert) return;

    const confirmed = window.confirm(`Delete alert "${selectedAlert.title}"?`);

    if (!confirmed) return;

    const result = await dispatch(deleteAlert(selectedAlert.id));

    if (deleteAlert.fulfilled.match(result)) {
      dispatch(fetchAlertSummary());
    }
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="container-fluid abn-alerts-page">
      {/* ===================================================
        HEADER
        =================================================== */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="alerts-title">
            <i className="fas fa-bell me-2" />
            Alerts
          </h3>

          <small className="text-muted alerts-subtitle">
            ABN Fleet Alert Management
          </small>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleRefresh}
          disabled={loading || actionLoading}
        >
          <i className="fas fa-sync-alt me-1" />

          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* ===================================================
        ERROR
        =================================================== */}

      {error && (
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      {actionError && (
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-circle me-2" />
          {actionError}
        </div>
      )}

      {/* ===================================================
        SUMMARY
        =================================================== */}

      <div className="row">
        {/* TOTAL */}

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow-sm h-100 alert-summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="alert-summary-label">Total Alerts</div>

                  <h3 className="mb-0 alert-summary-value">
                    {summaryLoading ? "..." : (summary?.total ?? 0)}
                  </h3>
                </div>

                <div className="text-primary fs-3">
                  <i className="fas fa-bell" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEW */}

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow-sm h-100 alert-summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="alert-summary-label">New</div>

                  <h3 className="mb-0 alert-summary-value">
                    {summaryLoading ? "..." : (summary?.status.new ?? 0)}
                  </h3>
                </div>

                <div className="text-danger fs-3">
                  <i className="fas fa-exclamation-circle" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CRITICAL */}

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow-sm h-100 alert-summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="alert-summary-label">Critical</div>

                  <h3 className="mb-0 alert-summary-value">
                    {summaryLoading ? "..." : (summary?.severity.critical ?? 0)}
                  </h3>
                </div>

                <div className="text-danger fs-3">
                  <i className="fas fa-fire" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WARNING */}

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card shadow-sm h-100 alert-summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="alert-summary-label">Warning</div>

                  <h3 className="mb-0 alert-summary-value">
                    {summaryLoading ? "..." : (summary?.severity.warning ?? 0)}
                  </h3>
                </div>

                <div className="text-warning fs-3">
                  <i className="fas fa-exclamation-triangle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
        FILTER
        =================================================== */}

      <div className="card shadow-sm mb-3 alert-filter-card">
        <div className="card-header">
          <strong>
            <i className="fas fa-filter me-2" />
            Filter Alerts
          </strong>
        </div>

        <div className="card-body">
          <div className="row">
            {/* SEARCH */}

            <div className="col-md-5 mb-2">
              <label className="form-label">Search</label>

              <input
                type="text"
                className="form-control"
                placeholder="Search title, message, type..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            {/* SEVERITY */}

            <div className="col-md-3 mb-2">
              <label className="form-label">Severity</label>

              <select
                className="form-select"
                value={filters.severity || ""}
                onChange={(e) => handleFilterChange("severity", e.target.value)}
              >
                <option value="">All Severity</option>

                <option value="CRITICAL">Critical</option>

                <option value="WARNING">Warning</option>

                <option value="INFO">Info</option>
              </select>
            </div>

            {/* STATUS */}

            <div className="col-md-3 mb-2">
              <label className="form-label">Status</label>

              <select
                className="form-select"
                value={filters.status || ""}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Status</option>

                <option value="NEW">New</option>

                <option value="ACKNOWLEDGED">Acknowledged</option>

                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
        ALERT LIST
        =================================================== */}

      <div className="card shadow-sm alert-list-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>
            <i className="fas fa-list me-2" />
            Alert List
          </strong>

          <span className="badge bg-secondary">{alerts.length}</span>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="alert-loading">
              <div className="spinner-border text-primary" role="status" />

              <div className="alert-loading-text">Loading alerts...</div>
            </div>
          ) : alerts.length === 0 ? (
            <div className="alert-empty-state">
              <i className="fas fa-check-circle alert-empty-state-icon" />

              <div>No alerts found</div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover alert-table">
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Vehicle</th>
                    <th>Type</th>
                    <th>Alert</th>
                    <th>Status</th>
                    <th>Triggered</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id}>
                      {/* SEVERITY */}

                      <td>
                        <span className={severityClass(alert.severity)}>
                          {alert.severity}
                        </span>
                      </td>

                      {/* VEHICLE */}

                      <td>
                        <strong className="alert-vehicle-code">
                          {alert.vehicle?.vehicle_code ||
                            `Vehicle #${alert.vehicle_id}`}
                        </strong>

                        {alert.vehicle?.plate_number && (
                          <div className="alert-vehicle-plate">
                            {alert.vehicle.plate_number}
                          </div>
                        )}
                      </td>

                      {/* TYPE */}

                      <td>
                        <code className="alert-type">{alert.type}</code>
                      </td>

                      {/* ALERT */}

                      <td>
                        <strong className="alert-title">{alert.title}</strong>

                        <div className="alert-message text-truncate">
                          {alert.message}
                        </div>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span className={statusClass(alert.status)}>
                          {alert.status}
                        </span>
                      </td>

                      {/* TIME */}

                      <td>{formatDate(alert.triggered_at)}</td>

                      {/* ACTION */}

                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleSelectAlert(alert.id)}
                          disabled={actionLoading}
                        >
                          <i className="fas fa-eye me-1" />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================
        SELECTED ALERT DETAIL
        =================================================== */}

      {selectedAlert && (
        <div className="card shadow-sm mt-3 alert-detail-card">
          {/* HEADER */}

          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>
              <i className="fas fa-info-circle me-2" />
              Alert Detail
            </strong>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => dispatch(setSelectedAlert(null))}
              disabled={actionLoading}
            >
              <i className="fas fa-times me-1" />
              Close
            </button>
          </div>

          {/* BODY */}

          <div className="card-body">
            <div className="row">
              {/* LEFT */}

              <div className="col-md-6">
                <p>
                  <strong className="alert-detail-label">ID:</strong>{" "}
                  {selectedAlert.id}
                </p>

                <p>
                  <strong className="alert-detail-label">Vehicle:</strong>{" "}
                  <span className="alert-vehicle-code">
                    {selectedAlert.vehicle?.vehicle_code ||
                      `Vehicle #${selectedAlert.vehicle_id}`}
                  </span>
                  {selectedAlert.vehicle?.plate_number && (
                    <span className="alert-vehicle-plate ms-2">
                      ({selectedAlert.vehicle.plate_number})
                    </span>
                  )}
                </p>

                <p>
                  <strong className="alert-detail-label">Device:</strong>{" "}
                  {selectedAlert.device?.device_code ||
                    selectedAlert.device_id ||
                    "-"}
                </p>

                <p>
                  <strong className="alert-detail-label">Type:</strong>{" "}
                  <code className="alert-type">{selectedAlert.type}</code>
                </p>

                <p>
                  <strong className="alert-detail-label">Severity:</strong>{" "}
                  <span className={severityClass(selectedAlert.severity)}>
                    {selectedAlert.severity}
                  </span>
                </p>
              </div>

              {/* RIGHT */}

              <div className="col-md-6">
                <p>
                  <strong className="alert-detail-label">Status:</strong>{" "}
                  <span className={statusClass(selectedAlert.status)}>
                    {selectedAlert.status}
                  </span>
                </p>

                <p>
                  <strong className="alert-detail-label">Triggered:</strong>{" "}
                  {formatDate(selectedAlert.triggered_at)}
                </p>

                <p>
                  <strong className="alert-detail-label">Acknowledged:</strong>{" "}
                  {formatDate(selectedAlert.acknowledged_at)}
                </p>

                <p>
                  <strong className="alert-detail-label">Resolved:</strong>{" "}
                  {formatDate(selectedAlert.resolved_at)}
                </p>
              </div>
            </div>

            <hr />

            {/* TITLE */}

            <h5 className="alert-title">{selectedAlert.title}</h5>

            {/* MESSAGE */}

            <p className="alert-message">{selectedAlert.message}</p>

            {/* LOCATION */}

            {(selectedAlert.latitude !== null ||
              selectedAlert.longitude !== null) && (
              <div className="mt-3">
                <strong className="alert-detail-label">Location:</strong>

                <div className="mt-2">
                  <code className="alert-location">
                    {selectedAlert.latitude ?? "-"},{" "}
                    {selectedAlert.longitude ?? "-"}
                  </code>
                </div>
              </div>
            )}

            {/* METADATA */}

            {selectedAlert.metadata &&
              Object.keys(selectedAlert.metadata).length > 0 && (
                <div className="mt-3">
                  <strong className="alert-detail-label">Metadata:</strong>

                  <pre className="alert-metadata">
                    {JSON.stringify(selectedAlert.metadata, null, 2)}
                  </pre>
                </div>
              )}

            {/* =================================================
              ACTION BUTTONS
              ================================================= */}

            <div className="alert-actions">
              {/* ACKNOWLEDGE */}

              {selectedAlert.status === "NEW" && (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleAcknowledge}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check me-1" />
                      Acknowledge
                    </>
                  )}
                </button>
              )}

              {/* RESOLVE */}

              {selectedAlert.status !== "RESOLVED" && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleResolve}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check-double me-1" />
                      Resolve
                    </>
                  )}
                </button>
              )}

              {/* DELETE */}

              <button
                type="button"
                className="btn btn-outline-danger ms-auto"
                onClick={handleDelete}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <>
                    <i className="fas fa-trash me-1" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
