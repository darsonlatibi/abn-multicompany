import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  RefreshCw,
  Pencil,
  Trash2,
  Truck,
  CheckCircle2,
  Wrench,
  XCircle,
} from "lucide-react";

import type { AppDispatch } from "../../stores/store";

import {
  fetchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  setSelectedVehicle,
  clearVehicleMessage,
  selectVehicles,
  selectVehicleLoading,
  selectVehicleError,
  selectVehicleSuccess,
  selectVehicleMessage,
  selectSelectedVehicle,
} from "../../features/vehicle/vehiclesSlice";

import type {
  Vehicle,
  VehicleFormData,
  VehicleStatus,
} from "../../features/vehicle/vehiclesSlice";

import "./Fleet.css";

/* =========================================================
   EMPTY FORM
   ========================================================= */

const emptyForm: VehicleFormData = {
  vehicle_code: "",
  plate_number: "",

  vehicle_name: "",
  vehicle_type: "TRUCK",

  brand: "",
  model: "",
  year: "",

  company_name: "",
  department: "",

  status: "ACTIVE",
};

const Fleet = () => {
  const dispatch = useDispatch<AppDispatch>();

  const vehicles = useSelector(selectVehicles);
  const loading = useSelector(selectVehicleLoading);
  const error = useSelector(selectVehicleError);
  const success = useSelector(selectVehicleSuccess);
  const message = useSelector(selectVehicleMessage);
  const selectedVehicle = useSelector(selectSelectedVehicle);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  /* =========================================================
     VEHICLE FORM MODAL
     ========================================================= */

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"CREATE" | "EDIT">("CREATE");

  const [form, setForm] = useState<VehicleFormData>(emptyForm);

  /* =========================================================
     FETCH
     ========================================================= */

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  /* =========================================================
     CLEAR MESSAGE
     ========================================================= */

  useEffect(() => {
    if (!success) {
      return;
    }

    const timer = window.setTimeout(() => {
      dispatch(clearVehicleMessage());
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [success, dispatch]);

  /* =========================================================
     SUMMARY
     ========================================================= */

  const summary = useMemo(() => {
    const total = vehicles.length;

    const active = vehicles.filter(
      (vehicle) => vehicle.status === "ACTIVE",
    ).length;

    const maintenance = vehicles.filter(
      (vehicle) => vehicle.status === "MAINTENANCE",
    ).length;

    const inactive = vehicles.filter(
      (vehicle) => vehicle.status === "INACTIVE",
    ).length;

    return {
      total,
      active,
      maintenance,
      inactive,
    };
  }, [vehicles]);

  /* =========================================================
     FILTER
     ========================================================= */

  const filteredVehicles = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesStatus =
        statusFilter === "ALL" || vehicle.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      return (
        vehicle.vehicle_code?.toLowerCase().includes(keyword) ||
        vehicle.plate_number?.toLowerCase().includes(keyword) ||
        vehicle.vehicle_name?.toLowerCase().includes(keyword) ||
        vehicle.vehicle_type?.toLowerCase().includes(keyword) ||
        vehicle.brand?.toLowerCase().includes(keyword) ||
        vehicle.model?.toLowerCase().includes(keyword) ||
        vehicle.company_name?.toLowerCase().includes(keyword) ||
        vehicle.department?.toLowerCase().includes(keyword)
      );
    });
  }, [vehicles, search, statusFilter]);

  /* =========================================================
     REFRESH
     ========================================================= */

  const handleRefresh = () => {
    dispatch(fetchVehicles());
  };

  /* =========================================================
     OPEN CREATE
     ========================================================= */

  const handleAdd = () => {
    dispatch(setSelectedVehicle(null));

    setFormMode("CREATE");
    setForm(emptyForm);
    setShowForm(true);
  };

  /* =========================================================
     OPEN EDIT
     ========================================================= */

  const handleEdit = (vehicle: Vehicle) => {
    dispatch(setSelectedVehicle(vehicle));

    setFormMode("EDIT");

    setForm({
      vehicle_code: vehicle.vehicle_code || "",
      plate_number: vehicle.plate_number || "",

      vehicle_name: vehicle.vehicle_name || "",
      vehicle_type: vehicle.vehicle_type || "TRUCK",

      brand: vehicle.brand || "",
      model: vehicle.model || "",
      year: vehicle.year ? String(vehicle.year) : "",

      company_name: vehicle.company_name || "",
      department: vehicle.department || "",

      status: vehicle.status || "ACTIVE",
    });

    setShowForm(true);
  };

  /* =========================================================
     CLOSE FORM
     ========================================================= */

  const handleCloseForm = () => {
    if (loading) {
      return;
    }

    setShowForm(false);

    setForm(emptyForm);

    dispatch(setSelectedVehicle(null));
  };

  /* =========================================================
     FORM CHANGE
     ========================================================= */

  const handleChange = (field: keyof VehicleFormData, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* =========================================================
     SUBMIT
     ========================================================= */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.vehicle_code.trim()) {
      return;
    }

    if (!form.plate_number.trim()) {
      return;
    }

    if (formMode === "CREATE") {
      const result = await dispatch(createVehicle(form));

      if (createVehicle.fulfilled.match(result)) {
        setShowForm(false);
        setForm(emptyForm);
      }

      return;
    }

    if (!selectedVehicle) {
      return;
    }

    const result = await dispatch(
      updateVehicle({
        id: selectedVehicle.id,
        data: form,
      }),
    );

    if (updateVehicle.fulfilled.match(result)) {
      setShowForm(false);
      setForm(emptyForm);
      dispatch(setSelectedVehicle(null));
    }
  };

  /* =========================================================
     DELETE
     ========================================================= */

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return;
    }

    const result = await dispatch(deleteVehicle(deleteTarget.id));

    if (deleteVehicle.fulfilled.match(result)) {
      setDeleteTarget(null);
    }
  };

  /* =========================================================
     STATUS
     ========================================================= */

  const renderStatus = (status: Vehicle["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="fleet-status fleet-status-active">
            <CheckCircle2 size={14} />
            Active
          </span>
        );

      case "MAINTENANCE":
        return (
          <span className="fleet-status fleet-status-maintenance">
            <Wrench size={14} />
            Maintenance
          </span>
        );

      case "INACTIVE":
        return (
          <span className="fleet-status fleet-status-inactive">
            <XCircle size={14} />
            Inactive
          </span>
        );

      default:
        return <span className="fleet-status">{status}</span>;
    }
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="fleet-page">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="fleet-header">
        <div>
          <div className="fleet-title-row">
            <Truck size={28} />

            <h1>Fleet</h1>
          </div>

          <p>Kelola kendaraan dan armada ABN Fleet System.</p>
        </div>

        <button
          type="button"
          className="fleet-btn fleet-btn-primary"
          onClick={handleAdd}
        >
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      {/* =====================================================
          ALERT
          ===================================================== */}

      {error && (
        <div className="fleet-alert fleet-alert-error">
          <XCircle size={18} />

          <span>{error}</span>
        </div>
      )}

      {success && message && (
        <div className="fleet-alert fleet-alert-success">
          <CheckCircle2 size={18} />

          <span>{message}</span>
        </div>
      )}

      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <div className="fleet-summary">
        <div className="fleet-summary-card">
          <div className="fleet-summary-icon fleet-summary-icon-total">
            <Truck size={22} />
          </div>

          <div>
            <span>Total Vehicle</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="fleet-summary-card">
          <div className="fleet-summary-icon fleet-summary-icon-active">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Active</span>
            <strong>{summary.active}</strong>
          </div>
        </div>

        <div className="fleet-summary-card">
          <div className="fleet-summary-icon fleet-summary-icon-maintenance">
            <Wrench size={22} />
          </div>

          <div>
            <span>Maintenance</span>
            <strong>{summary.maintenance}</strong>
          </div>
        </div>

        <div className="fleet-summary-card">
          <div className="fleet-summary-icon fleet-summary-icon-inactive">
            <XCircle size={22} />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{summary.inactive}</strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="fleet-card">
        {/* ===================================================
            TOOLBAR
            =================================================== */}

        <div className="fleet-toolbar">
          <div className="fleet-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search vehicle, plate, company..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="fleet-search-clear"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="fleet-toolbar-right">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="fleet-status-filter"
            >
              <option value="ALL">All Status</option>

              <option value="ACTIVE">Active</option>

              <option value="MAINTENANCE">Maintenance</option>

              <option value="INACTIVE">Inactive</option>
            </select>

            <button
              type="button"
              className="fleet-btn fleet-btn-secondary"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw size={17} className={loading ? "fleet-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* ===================================================
            TABLE
            =================================================== */}

        <div className="fleet-table-wrapper">
          <table className="fleet-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Vehicle Code</th>
                <th>Plate Number</th>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Company</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && vehicles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="fleet-table-state">
                    <RefreshCw size={24} className="fleet-spin" />

                    <span>Loading vehicles...</span>
                  </td>
                </tr>
              ) : filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="fleet-table-state">
                    <Truck size={30} />

                    <span>
                      {search || statusFilter !== "ALL"
                        ? "Tidak ada vehicle yang sesuai."
                        : "Belum ada data vehicle."}
                    </span>
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle, index) => (
                  <tr key={vehicle.id}>
                    <td>{index + 1}</td>

                    <td>
                      <strong className="fleet-code">
                        {vehicle.vehicle_code}
                      </strong>
                    </td>

                    <td>
                      <strong className="fleet-plate">
                        {vehicle.plate_number}
                      </strong>
                    </td>

                    <td>
                      <div className="fleet-vehicle-name">
                        <strong>{vehicle.vehicle_name || "-"}</strong>

                        {(vehicle.brand || vehicle.model) && (
                          <span>
                            {vehicle.brand || ""} {vehicle.model || ""}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>{vehicle.vehicle_type || "-"}</td>

                    <td>
                      <div className="fleet-company">
                        <strong>{vehicle.company_name || "-"}</strong>

                        {vehicle.department && (
                          <span>{vehicle.department}</span>
                        )}
                      </div>
                    </td>

                    <td>{renderStatus(vehicle.status)}</td>

                    <td>
                      <div className="fleet-actions">
                        <button
                          type="button"
                          className="fleet-action fleet-action-edit"
                          title="Edit vehicle"
                          onClick={() => handleEdit(vehicle)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="fleet-action fleet-action-delete"
                          title="Delete vehicle"
                          onClick={() => setDeleteTarget(vehicle)}
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

        {/* ===================================================
            FOOTER
            =================================================== */}

        <div className="fleet-footer">
          <span>
            Showing <strong>{filteredVehicles.length}</strong> of{" "}
            <strong>{vehicles.length}</strong> vehicles
          </span>
        </div>
      </div>

      {/* =====================================================
          CREATE / EDIT MODAL
          ===================================================== */}

      {showForm && (
        <div className="fleet-modal-backdrop" onClick={handleCloseForm}>
          <div
            className="fleet-modal fleet-modal-form"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="fleet-modal-header">
              <div className="fleet-modal-icon">
                {formMode === "CREATE" ? (
                  <Plus size={24} />
                ) : (
                  <Pencil size={24} />
                )}
              </div>

              <div>
                <h2>
                  {formMode === "CREATE" ? "Add Vehicle" : "Edit Vehicle"}
                </h2>

                <p>
                  {formMode === "CREATE"
                    ? "Tambahkan kendaraan baru ke armada."
                    : "Perbarui data kendaraan."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="fleet-form">
              {/* =================================================
                  BASIC
                  ================================================= */}

              <div className="fleet-form-grid">
                <div className="fleet-form-group">
                  <label>Vehicle Code *</label>

                  <input
                    type="text"
                    value={form.vehicle_code}
                    onChange={(event) =>
                      handleChange("vehicle_code", event.target.value)
                    }
                    placeholder="TRK-002"
                    required
                  />
                </div>

                <div className="fleet-form-group">
                  <label>Plate Number *</label>

                  <input
                    type="text"
                    value={form.plate_number}
                    onChange={(event) =>
                      handleChange("plate_number", event.target.value)
                    }
                    placeholder="DD 1234 XX"
                    required
                  />
                </div>

                <div className="fleet-form-group">
                  <label>Vehicle Name</label>

                  <input
                    type="text"
                    value={form.vehicle_name}
                    onChange={(event) =>
                      handleChange("vehicle_name", event.target.value)
                    }
                    placeholder="Truck Tonasa 02"
                  />
                </div>

                <div className="fleet-form-group">
                  <label>Vehicle Type</label>

                  <input
                    type="text"
                    value={form.vehicle_type}
                    onChange={(event) =>
                      handleChange("vehicle_type", event.target.value)
                    }
                    placeholder="TRUCK"
                  />
                </div>

                <div className="fleet-form-group">
                  <label>Brand</label>

                  <input
                    type="text"
                    value={form.brand}
                    onChange={(event) =>
                      handleChange("brand", event.target.value)
                    }
                    placeholder="Hino"
                  />
                </div>

                <div className="fleet-form-group">
                  <label>Model</label>

                  <input
                    type="text"
                    value={form.model}
                    onChange={(event) =>
                      handleChange("model", event.target.value)
                    }
                    placeholder="FM 280"
                  />
                </div>

                <div className="fleet-form-group">
                  <label>Year</label>

                  <input
                    type="number"
                    min="1900"
                    max="2100"
                    value={form.year}
                    onChange={(event) =>
                      handleChange("year", event.target.value)
                    }
                    placeholder="2026"
                  />
                </div>

                <div className="fleet-form-group">
                  <label>Status</label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      handleChange(
                        "status",
                        event.target.value as VehicleStatus,
                      )
                    }
                  >
                    <option value="ACTIVE">Active</option>

                    <option value="MAINTENANCE">Maintenance</option>

                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>

                <div className="fleet-form-group">
                  <label>Company</label>

                  <input
                    type="text"
                    value={form.company_name}
                    onChange={(event) =>
                      handleChange("company_name", event.target.value)
                    }
                    placeholder="PT PJK"
                  />
                </div>

                <div className="fleet-form-group">
                  <label>Department</label>

                  <input
                    type="text"
                    value={form.department}
                    onChange={(event) =>
                      handleChange("department", event.target.value)
                    }
                    placeholder="Hauling"
                  />
                </div>
              </div>

              {/* =================================================
                  ACTIONS
                  ================================================= */}

              <div className="fleet-modal-actions">
                <button
                  type="button"
                  className="fleet-btn fleet-btn-secondary"
                  onClick={handleCloseForm}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="fleet-btn fleet-btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw size={17} className="fleet-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {formMode === "CREATE" ? (
                        <Plus size={17} />
                      ) : (
                        <Pencil size={17} />
                      )}

                      {formMode === "CREATE" ? "Add Vehicle" : "Save Changes"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
          ===================================================== */}

      {deleteTarget && (
        <div
          className="fleet-modal-backdrop"
          onClick={() => (loading ? null : setDeleteTarget(null))}
        >
          <div
            className="fleet-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="fleet-modal-icon">
              <Trash2 size={24} />
            </div>

            <h2>Delete Vehicle?</h2>

            <p>
              Apakah Bro yakin ingin menghapus vehicle{" "}
              <strong>{deleteTarget.vehicle_code}</strong> dengan nomor polisi{" "}
              <strong>{deleteTarget.plate_number}</strong>?
            </p>

            <div className="fleet-modal-actions">
              <button
                type="button"
                className="fleet-btn fleet-btn-secondary"
                onClick={() => setDeleteTarget(null)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="fleet-btn fleet-btn-danger"
                onClick={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw size={17} className="fleet-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
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

export default Fleet;
