import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Filter,
  Gauge,
  MapPin,
  Navigation,
  RefreshCw,
  Search,
  Trash2,
  Truck,
  UserRound,
  XCircle,
  Route as RouteIcon,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../stores/store";

import {
  fetchTrips,
  fetchTripById,
  updateTripStatus,
  deleteTrip,
  setTripFilter,
  resetTripFilters,
  clearSelectedTrip,
  selectTrips,
  selectSelectedTrip,
  selectTripPagination,
  selectTripFilters,
  selectTripsLoading,
  selectTripDetailLoading,
  selectTripStatusLoading,
  selectTripDeleteLoading,
  selectTripError,
  type Trip,
  type TripStatus,
} from "../../features/trip/tripSlice";

import "./Trips.css";

/* =========================================================
   HELPERS
   ========================================================= */

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDuration = (seconds?: number | null) => {
  const total = Number(seconds || 0);

  if (!total) return "0m";

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

const formatNumber = (value?: number | null, decimals = 1) => {
  return Number(value || 0).toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const getStatusLabel = (status: TripStatus) => {
  switch (status) {
    case "PLANNED":
      return "Planned";

    case "IN_PROGRESS":
      return "In Progress";

    case "COMPLETED":
      return "Completed";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
};

/* =========================================================
   STATUS BADGE
   ========================================================= */

const StatusBadge = ({ status }: { status: TripStatus }) => {
  return (
    <span className={`trip-status trip-status-${status.toLowerCase()}`}>
      {status === "PLANNED" && <Clock3 size={13} />}
      {status === "IN_PROGRESS" && <Navigation size={13} />}
      {status === "COMPLETED" && <CheckCircle2 size={13} />}
      {status === "CANCELLED" && <XCircle size={13} />}

      {getStatusLabel(status)}
    </span>
  );
};

/* =========================================================
   TRIP DETAIL
   ========================================================= */

const TripDetail = ({ trip, onClose }: { trip: Trip; onClose: () => void }) => {
  return (
    <div className="trip-detail-overlay" onClick={onClose}>
      <div
        className="trip-detail-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="trip-detail-header">
          <div>
            <span className="trip-detail-eyebrow">TRIP DETAIL</span>

            <h2>{trip.trip_number || `Trip #${trip.id}`}</h2>
          </div>

          <button type="button" className="trip-icon-button" onClick={onClose}>
            <XCircle size={20} />
          </button>
        </div>

        <div className="trip-detail-status">
          <StatusBadge status={trip.status} />
        </div>

        <div className="trip-detail-grid">
          <div className="trip-detail-card">
            <span>Vehicle</span>
            <strong>
              <Truck size={16} />
              {trip.vehicle?.name || `Vehicle #${trip.vehicle_id}`}
            </strong>
          </div>

          <div className="trip-detail-card">
            <span>Driver</span>
            <strong>
              <UserRound size={16} />
              {trip.driver?.name || "-"}
            </strong>
          </div>

          <div className="trip-detail-card">
            <span>Device</span>
            <strong>{trip.device?.device_uid || "-"}</strong>
          </div>

          <div className="trip-detail-card">
            <span>Distance</span>
            <strong>
              <RouteIcon size={16} />
              {formatNumber(trip.distance_km, 2)} km
            </strong>
          </div>

          <div className="trip-detail-card">
            <span>Duration</span>
            <strong>
              <Clock3 size={16} />
              {formatDuration(trip.duration_seconds)}
            </strong>
          </div>

          <div className="trip-detail-card">
            <span>Average Speed</span>
            <strong>
              <Gauge size={16} />
              {formatNumber(trip.avg_speed_kmh, 1)} km/h
            </strong>
          </div>

          <div className="trip-detail-card">
            <span>Maximum Speed</span>
            <strong>
              <Gauge size={16} />
              {formatNumber(trip.max_speed_kmh, 1)} km/h
            </strong>
          </div>

          <div className="trip-detail-card">
            <span>Stops</span>
            <strong>{trip.stop_count}</strong>
          </div>

          <div className="trip-detail-card">
            <span>Idle</span>
            <strong>{formatDuration(trip.idle_seconds)}</strong>
          </div>

          <div className="trip-detail-card">
            <span>Alerts</span>
            <strong>{trip.alert_count}</strong>
          </div>
        </div>

        <div className="trip-detail-section">
          <h3>Trip Timeline</h3>

          <div className="trip-timeline">
            <div className="trip-timeline-item">
              <div className="trip-timeline-dot start" />

              <div>
                <span>STARTED</span>

                <strong>{formatDateTime(trip.started_at)}</strong>

                <p>
                  <MapPin size={14} />

                  {trip.start_address ||
                    `${trip.start_latitude ?? "-"}, ${
                      trip.start_longitude ?? "-"
                    }`}
                </p>
              </div>
            </div>

            <div className="trip-timeline-line" />

            <div className="trip-timeline-item">
              <div className="trip-timeline-dot end" />

              <div>
                <span>ENDED</span>

                <strong>{formatDateTime(trip.ended_at)}</strong>

                <p>
                  <MapPin size={14} />

                  {trip.end_address ||
                    `${trip.end_latitude ?? "-"}, ${trip.end_longitude ?? "-"}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN PAGE
   ========================================================= */

const Trips = () => {
  const dispatch = useDispatch<AppDispatch>();

  const trips = useSelector((state: RootState) => selectTrips(state));

  const selectedTrip = useSelector((state: RootState) =>
    selectSelectedTrip(state),
  );

  const pagination = useSelector((state: RootState) =>
    selectTripPagination(state),
  );

  const filters = useSelector((state: RootState) => selectTripFilters(state));

  const loading = useSelector((state: RootState) => selectTripsLoading(state));

  const detailLoading = useSelector((state: RootState) =>
    selectTripDetailLoading(state),
  );

  const statusLoading = useSelector((state: RootState) =>
    selectTripStatusLoading(state),
  );

  const deleteLoading = useSelector((state: RootState) =>
    selectTripDeleteLoading(state),
  );

  const error = useSelector((state: RootState) => selectTripError(state));

  const [searchInput, setSearchInput] = useState(filters.search);

  const [showFilters, setShowFilters] = useState(false);

  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {
    dispatch(fetchTrips(filters));
  }, [
    dispatch,
    filters.page,
    filters.limit,
    filters.vehicle_id,
    filters.driver_id,
    filters.status,
    filters.date_from,
    filters.date_to,
  ]);

  /* =======================================================
     SEARCH
     ======================================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchInput !== filters.search) {
        dispatch(
          setTripFilter({
            search: searchInput,
            page: 1,
          }),
        );
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput, filters.search, dispatch]);

  /* =======================================================
     REFRESH
     ======================================================= */

  const handleRefresh = () => {
    dispatch(fetchTrips(filters));
  };

  /* =======================================================
     RESET
     ======================================================= */

  const handleResetFilters = () => {
    setSearchInput("");

    dispatch(resetTripFilters());

    dispatch(
      fetchTrips({
        page: 1,
        limit: 20,
        search: "",
        vehicle_id: "",
        driver_id: "",
        status: "",
        date_from: "",
        date_to: "",
      }),
    );
  };

  /* =======================================================
     PAGE
     ======================================================= */

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.totalPages || loading) {
      return;
    }

    dispatch(
      setTripFilter({
        page,
      }),
    );
  };

  /* =======================================================
     DETAIL
     ======================================================= */

  const handleViewTrip = (trip: Trip) => {
    dispatch(fetchTripById(trip.id));
  };

  /* =======================================================
     STATUS
     ======================================================= */

  const handleStatusChange = async (trip: Trip, status: TripStatus) => {
    if (trip.status === status) return;

    await dispatch(
      updateTripStatus({
        id: trip.id,
        status,
      }),
    );

    dispatch(fetchTrips(filters));
  };

  /* =======================================================
     DELETE
     ======================================================= */

  const handleDelete = async (trip: Trip) => {
    const confirmed = window.confirm(
      `Hapus trip ${trip.trip_number || `#${trip.id}`}?`,
    );

    if (!confirmed) return;

    await dispatch(deleteTrip(trip.id));

    dispatch(fetchTrips(filters));
  };

  /* =======================================================
     SUMMARY
     ======================================================= */

  const runningCount = trips.filter(
    (trip: Trip) => trip.status === "IN_PROGRESS",
  ).length;

  const completedCount = trips.filter(
    (trip: Trip) => trip.status === "COMPLETED",
  ).length;

  const plannedCount = trips.filter(
    (trip: Trip) => trip.status === "PLANNED",
  ).length;

  const totalDistance = trips.reduce(
    (sum: number, trip: Trip) => sum + Number(trip.distance_km || 0),
    0,
  );

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="trips-page">
      {/* ===================================================
          HEADER
         =================================================== */}

      <div className="trips-header">
        <div>
          <div className="trips-title-row">
            <RouteIcon size={25} />

            <h1>Trips</h1>
          </div>

          <p>Monitor perjalanan kendaraan ABN Fleet.</p>
        </div>

        <button
          type="button"
          className="trips-refresh-button"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw size={17} className={loading ? "spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ===================================================
          SUMMARY
         =================================================== */}

      <div className="trips-summary-grid">
        <div className="trip-summary-card">
          <div className="trip-summary-icon total">
            <RouteIcon size={19} />
          </div>

          <div>
            <span>Total Trips</span>
            <strong>{pagination.total}</strong>
          </div>
        </div>

        <div className="trip-summary-card">
          <div className="trip-summary-icon running">
            <Navigation size={19} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{runningCount}</strong>
          </div>
        </div>

        <div className="trip-summary-card">
          <div className="trip-summary-icon completed">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>

        <div className="trip-summary-card">
          <div className="trip-summary-icon distance">
            <MapPin size={19} />
          </div>

          <div>
            <span>Distance Loaded</span>
            <strong>{formatNumber(totalDistance, 1)} km</strong>
          </div>
        </div>

        <div className="trip-summary-card">
          <div className="trip-summary-icon planned">
            <Calendar size={19} />
          </div>

          <div>
            <span>Planned</span>
            <strong>{plannedCount}</strong>
          </div>
        </div>
      </div>

      {/* ===================================================
          TOOLBAR
         =================================================== */}

      <div className="trips-toolbar">
        <div className="trips-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search trip, address..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />

          {searchInput && (
            <button type="button" onClick={() => setSearchInput("")}>
              <XCircle size={16} />
            </button>
          )}
        </div>

        <button
          type="button"
          className={`trips-filter-button ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters((value) => !value)}
        >
          <Filter size={17} />
          Filters
        </button>
      </div>

      {/* ===================================================
          FILTER PANEL
         =================================================== */}

      {showFilters && (
        <div className="trips-filter-panel">
          <div className="trip-filter-field">
            <label>Vehicle ID</label>

            <input
              type="text"
              placeholder="Vehicle ID"
              value={filters.vehicle_id}
              onChange={(event) =>
                dispatch(
                  setTripFilter({
                    vehicle_id: event.target.value,
                    page: 1,
                  }),
                )
              }
            />
          </div>

          <div className="trip-filter-field">
            <label>Driver ID</label>

            <input
              type="text"
              placeholder="Driver ID"
              value={filters.driver_id}
              onChange={(event) =>
                dispatch(
                  setTripFilter({
                    driver_id: event.target.value,
                    page: 1,
                  }),
                )
              }
            />
          </div>

          <div className="trip-filter-field">
            <label>Status</label>

            <select
              value={filters.status}
              onChange={(event) =>
                dispatch(
                  setTripFilter({
                    status: event.target.value,
                    page: 1,
                  }),
                )
              }
            >
              <option value="">All Status</option>
              <option value="PLANNED">Planned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="trip-filter-field">
            <label>Date From</label>

            <input
              type="date"
              value={filters.date_from}
              onChange={(event) =>
                dispatch(
                  setTripFilter({
                    date_from: event.target.value,
                    page: 1,
                  }),
                )
              }
            />
          </div>

          <div className="trip-filter-field">
            <label>Date To</label>

            <input
              type="date"
              value={filters.date_to}
              onChange={(event) =>
                dispatch(
                  setTripFilter({
                    date_to: event.target.value,
                    page: 1,
                  }),
                )
              }
            />
          </div>

          <button
            type="button"
            className="trip-reset-button"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      )}

      {/* ===================================================
          ERROR
         =================================================== */}

      {error && (
        <div className="trips-error">
          <XCircle size={17} />

          <span>{error}</span>

          <button type="button" onClick={handleRefresh}>
            Retry
          </button>
        </div>
      )}

      {/* ===================================================
          TABLE
         =================================================== */}

      <div className="trips-table-card">
        <div className="trips-table-wrapper">
          <table className="trips-table">
            <thead>
              <tr>
                <th>Trip</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Started</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Speed</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="trips-loading-cell">
                    <RefreshCw size={23} className="spin" />

                    <span>Loading trips...</span>
                  </td>
                </tr>
              ) : trips.length === 0 ? (
                <tr>
                  <td colSpan={9} className="trips-empty-cell">
                    <RouteIcon size={32} />

                    <strong>No trips found</strong>

                    <span>Belum ada data perjalanan sesuai filter.</span>
                  </td>
                </tr>
              ) : (
                trips.map((trip) => (
                  <tr key={trip.id}>
                    <td>
                      <div className="trip-number">
                        <span>{trip.trip_number || `TRIP-${trip.id}`}</span>

                        <small>#{trip.id}</small>
                      </div>
                    </td>

                    <td>
                      <div className="trip-vehicle">
                        <Truck size={16} />

                        <div>
                          <strong>
                            {trip.vehicle?.name ||
                              `Vehicle #${trip.vehicle_id}`}
                          </strong>

                          <small>ID {trip.vehicle_id}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="trip-driver">
                        <UserRound size={15} />

                        {trip.driver?.name || "-"}
                      </div>
                    </td>

                    <td>
                      <div className="trip-date">
                        <strong>{formatDateTime(trip.started_at)}</strong>

                        {trip.ended_at && (
                          <small>→ {formatDateTime(trip.ended_at)}</small>
                        )}
                      </div>
                    </td>

                    <td>
                      <strong>{formatNumber(trip.distance_km, 2)} km</strong>
                    </td>

                    <td>{formatDuration(trip.duration_seconds)}</td>

                    <td>
                      <div className="trip-speed">
                        <strong>{formatNumber(trip.avg_speed_kmh, 1)}</strong>

                        <small>max {formatNumber(trip.max_speed_kmh, 1)}</small>
                      </div>
                    </td>

                    <td>
                      <StatusBadge status={trip.status} />
                    </td>

                    <td>
                      <div className="trip-actions">
                        <button
                          type="button"
                          title="View trip"
                          onClick={() => handleViewTrip(trip)}
                        >
                          <Eye size={16} />
                        </button>

                        {trip.status === "IN_PROGRESS" && (
                          <button
                            type="button"
                            title="Complete trip"
                            disabled={statusLoading}
                            onClick={() =>
                              handleStatusChange(trip, "COMPLETED")
                            }
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}

                        <button
                          type="button"
                          className="danger"
                          title="Delete trip"
                          disabled={deleteLoading}
                          onClick={() => handleDelete(trip)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
           ================================================= */}

        <div className="trips-pagination">
          <div>
            Showing <strong>{trips.length}</strong> of{" "}
            <strong>{pagination.total}</strong> trips
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              disabled={pagination.page <= 1 || loading}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              <ChevronLeft size={17} />
            </button>

            <span>
              Page <strong>{pagination.page}</strong> /{" "}
              <strong>{pagination.totalPages || 1}</strong>
            </span>

            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages || loading}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================
          DETAIL MODAL
         =================================================== */}

      {detailLoading && (
        <div className="trip-detail-loading">
          <RefreshCw size={22} className="spin" />
          Loading trip detail...
        </div>
      )}

      {selectedTrip && !detailLoading && (
        <TripDetail
          trip={selectedTrip}
          onClose={() => dispatch(clearSelectedTrip())}
        />
      )}
    </div>
  );
};

export default Trips;
