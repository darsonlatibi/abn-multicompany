import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../stores/store";

import {
  clearDriverError,
  clearDriverMessage,
  createDriver,
  deleteDriver,
  fetchDrivers,
  setSelectedDriver,
  updateDriver,
} from "../../features/driver/driverSlice";

import type {
  Driver,
  DriverFormData,
  DriverStatus,
} from "../../features/driver/driverSlice";

import "./Drivers.css";

/* =========================================================
   COMPONENT
   ========================================================= */

export default function Drivers() {
  const dispatch = useDispatch<AppDispatch>();

  /* =======================================================
     REDUX
     ======================================================= */

  const drivers = useSelector((state: RootState) => state.drivers.drivers);

  const loading = useSelector((state: RootState) => state.drivers.loading);

  const error = useSelector((state: RootState) => state.drivers.error);

  const success = useSelector((state: RootState) => state.drivers.success);

  const message = useSelector((state: RootState) => state.drivers.message);

  const selectedDriver = useSelector(
    (state: RootState) => state.drivers.selectedDriver,
  );

  /* =======================================================
     LOCAL STATE
     ======================================================= */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<"ALL" | DriverStatus>("ALL");

  const [modalMode, setModalMode] = useState<"ADD" | "EDIT" | "VIEW" | null>(
    null,
  );

  const [formLoading, setFormLoading] = useState(false);

  const [formError, setFormError] = useState("");

  const [form, setForm] = useState<DriverFormData>({
    driver_code: "",
    full_name: "",
    employee_number: "",
    phone_number: "",
    license_number: "",
    license_type: "",
    status: "ACTIVE",
  });

  /* =======================================================
     LOAD
     ======================================================= */

  useEffect(() => {
    dispatch(fetchDrivers());

    return () => {
      dispatch(clearDriverError());
      dispatch(clearDriverMessage());
    };
  }, [dispatch]);

  /* =======================================================
     FILTER
     ======================================================= */

  const filteredDrivers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return drivers.filter((driver) => {
      const matchesSearch =
        !keyword ||
        driver.driver_code.toLowerCase().includes(keyword) ||
        driver.full_name.toLowerCase().includes(keyword) ||
        (driver.employee_number || "").toLowerCase().includes(keyword) ||
        (driver.phone_number || "").toLowerCase().includes(keyword) ||
        (driver.license_number || "").toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" || driver.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [drivers, search, statusFilter]);

  /* =======================================================
     SUMMARY
     ======================================================= */

  const totalDrivers = drivers.length;

  const activeDrivers = drivers.filter(
    (driver) => driver.status === "ACTIVE",
  ).length;

  const suspendedDrivers = drivers.filter(
    (driver) => driver.status === "SUSPENDED",
  ).length;

  const inactiveDrivers = drivers.filter(
    (driver) => driver.status === "INACTIVE",
  ).length;

  /* =======================================================
     OPEN ADD
     ======================================================= */

  const handleAdd = () => {
    dispatch(setSelectedDriver(null));

    setFormError("");

    setForm({
      driver_code: "",
      full_name: "",
      employee_number: "",
      phone_number: "",
      license_number: "",
      license_type: "",
      status: "ACTIVE",
    });

    setModalMode("ADD");
  };

  /* =======================================================
     OPEN VIEW
     ======================================================= */

  const handleView = (driver: Driver) => {
    dispatch(setSelectedDriver(driver));

    setFormError("");

    setForm({
      driver_code: driver.driver_code,
      full_name: driver.full_name,
      employee_number: driver.employee_number || "",
      phone_number: driver.phone_number || "",
      license_number: driver.license_number || "",
      license_type: driver.license_type || "",
      status: driver.status,
    });

    setModalMode("VIEW");
  };

  /* =======================================================
     OPEN EDIT
     ======================================================= */

  const handleEdit = (driver: Driver) => {
    dispatch(setSelectedDriver(driver));

    setFormError("");

    setForm({
      driver_code: driver.driver_code,
      full_name: driver.full_name,
      employee_number: driver.employee_number || "",
      phone_number: driver.phone_number || "",
      license_number: driver.license_number || "",
      license_type: driver.license_type || "",
      status: driver.status,
    });

    setModalMode("EDIT");
  };

  /* =======================================================
     CLOSE MODAL
     ======================================================= */

  const closeModal = () => {
    if (formLoading) {
      return;
    }

    setModalMode(null);
    setFormError("");

    dispatch(setSelectedDriver(null));
  };

  /* =======================================================
     FORM CHANGE
     ======================================================= */

  const handleFormChange = (field: keyof DriverFormData, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =======================================================
     SUBMIT
     ======================================================= */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (modalMode !== "ADD" && modalMode !== "EDIT") {
      return;
    }

    setFormError("");

    if (!form.driver_code.trim()) {
      setFormError("Driver code wajib diisi.");
      return;
    }

    if (!form.full_name.trim()) {
      setFormError("Nama driver wajib diisi.");
      return;
    }

    try {
      setFormLoading(true);

      if (modalMode === "ADD") {
        await dispatch(
          createDriver({
            driver_code: form.driver_code.trim(),
            full_name: form.full_name.trim(),
            employee_number: form.employee_number?.trim() || "",
            phone_number: form.phone_number?.trim() || "",
            license_number: form.license_number?.trim() || "",
            license_type: form.license_type?.trim() || "",
            status: form.status || "ACTIVE",
          }),
        ).unwrap();
      }

      if (modalMode === "EDIT" && selectedDriver) {
        await dispatch(
          updateDriver({
            id: selectedDriver.id,

            data: {
              driver_code: form.driver_code.trim(),
              full_name: form.full_name.trim(),
              employee_number: form.employee_number?.trim() || "",
              phone_number: form.phone_number?.trim() || "",
              license_number: form.license_number?.trim() || "",
              license_type: form.license_type?.trim() || "",
              status: form.status || "ACTIVE",
            },
          }),
        ).unwrap();
      }

      setModalMode(null);
      setFormError("");

      dispatch(setSelectedDriver(null));

      /*
       * Pastikan data table sinkron dengan database.
       */
      dispatch(fetchDrivers());
    } catch (err: any) {
      console.error("DRIVER SAVE ERROR:", err);

      setFormError(err || "Gagal menyimpan data driver.");
    } finally {
      setFormLoading(false);
    }
  };

  /* =======================================================
     DELETE
     ======================================================= */

  const handleDelete = async (driver: Driver) => {
    const confirmed = window.confirm(
      `Hapus driver ${driver.full_name} (${driver.driver_code})?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteDriver(driver.id)).unwrap();
    } catch (err) {
      console.error("DELETE DRIVER ERROR:", err);
    }
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="drivers-page">
      {/* ===================================================
          HEADER
         =================================================== */}

      <div className="drivers-header">
        <div>
          <h1>Drivers</h1>

          <p>Manage driver information and license data</p>
        </div>

        <button
          type="button"
          className="drivers-add-button"
          onClick={handleAdd}
        >
          <span>+</span>
          Add Driver
        </button>
      </div>

      {/* ===================================================
          MESSAGE
         =================================================== */}

      {success && message && <div className="drivers-success">{message}</div>}

      {/* ===================================================
          SUMMARY
         =================================================== */}

      <div className="drivers-summary">
        <div className="driver-summary-card">
          <div className="driver-summary-icon">👤</div>

          <div>
            <span>Total Drivers</span>
            <strong>{totalDrivers}</strong>
          </div>
        </div>

        <div className="driver-summary-card">
          <div className="driver-summary-icon">✓</div>

          <div>
            <span>Active</span>
            <strong>{activeDrivers}</strong>
          </div>
        </div>

        <div className="driver-summary-card">
          <div className="driver-summary-icon">!</div>

          <div>
            <span>Suspended</span>
            <strong>{suspendedDrivers}</strong>
          </div>
        </div>

        <div className="driver-summary-card">
          <div className="driver-summary-icon">–</div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveDrivers}</strong>
          </div>
        </div>
      </div>

      {/* ===================================================
          TOOLBAR
         =================================================== */}

      <div className="drivers-toolbar">
        <div className="drivers-search">
          <span className="drivers-search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search driver..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          className="drivers-status-filter"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as "ALL" | DriverStatus)
          }
        >
          <option value="ALL">All Status</option>

          <option value="ACTIVE">Active</option>

          <option value="INACTIVE">Inactive</option>

          <option value="SUSPENDED">Suspended</option>
        </select>

        <button
          type="button"
          className="drivers-refresh-button"
          onClick={() => dispatch(fetchDrivers())}
          disabled={loading}
        >
          ↻ {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* ===================================================
          ERROR
         =================================================== */}

      {error && (
        <div className="drivers-error">
          <strong>Failed to load drivers</strong>

          <span>{error}</span>

          <button type="button" onClick={() => dispatch(fetchDrivers())}>
            Retry
          </button>
        </div>
      )}

      {/* ===================================================
          TABLE
         =================================================== */}

      <div className="drivers-card">
        <div className="drivers-card-header">
          <div>
            <h2>Driver List</h2>

            <span>
              {filteredDrivers.length} driver
              {filteredDrivers.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="drivers-table-wrapper">
          <table className="drivers-table">
            <thead>
              <tr>
                <th>Driver Code</th>
                <th>Full Name</th>
                <th>Employee No.</th>
                <th>Phone</th>
                <th>License No.</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="drivers-empty">
                    <div className="drivers-loading">
                      <div className="drivers-spinner" />

                      <span>Loading drivers...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="drivers-empty">
                    <div className="drivers-empty-content">
                      <div className="drivers-empty-icon">👤</div>

                      <strong>No drivers found</strong>

                      <span>
                        {search || statusFilter !== "ALL"
                          ? "Try changing your search or filter."
                          : "No driver data available."}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>
                      <span className="driver-code">{driver.driver_code}</span>
                    </td>

                    <td>
                      <div className="driver-name">
                        <div className="driver-avatar">
                          {driver.full_name.charAt(0).toUpperCase()}
                        </div>

                        <strong>{driver.full_name}</strong>
                      </div>
                    </td>

                    <td>{driver.employee_number || "—"}</td>

                    <td>{driver.phone_number || "—"}</td>

                    <td>{driver.license_number || "—"}</td>

                    <td>{driver.license_type || "—"}</td>

                    <td>
                      <span
                        className={`driver-status driver-status-${driver.status.toLowerCase()}`}
                      >
                        <span className="driver-status-dot" />

                        {driver.status}
                      </span>
                    </td>

                    <td>
                      <div className="driver-actions">
                        <button
                          type="button"
                          title="View"
                          onClick={() => handleView(driver)}
                        >
                          👁
                        </button>

                        <button
                          type="button"
                          title="Edit"
                          onClick={() => handleEdit(driver)}
                        >
                          ✎
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(driver)}
                          disabled={loading}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================================================
          DRIVER MODAL
         =================================================== */}

      {modalMode && (
        <div
          className="driver-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="driver-modal">
            {/* =================================================
                MODAL HEADER
               ================================================= */}

            <div className="driver-modal-header">
              <div>
                <h2>
                  {modalMode === "ADD" && "Add Driver"}

                  {modalMode === "EDIT" && "Edit Driver"}

                  {modalMode === "VIEW" && "Driver Details"}
                </h2>

                <p>
                  {modalMode === "ADD" && "Create a new driver record."}

                  {modalMode === "EDIT" && "Update driver information."}

                  {modalMode === "VIEW" && "View driver information."}
                </p>
              </div>

              <button
                type="button"
                className="driver-modal-close"
                onClick={closeModal}
                disabled={formLoading}
              >
                ×
              </button>
            </div>

            {/* =================================================
                FORM
               ================================================= */}

            <form onSubmit={handleSubmit}>
              <div className="driver-form-grid">
                {/* DRIVER CODE */}

                <div className="driver-form-group">
                  <label>
                    Driver Code <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={form.driver_code}
                    disabled={modalMode === "VIEW" || formLoading}
                    onChange={(event) =>
                      handleFormChange("driver_code", event.target.value)
                    }
                    placeholder="DRV-002"
                  />
                </div>

                {/* FULL NAME */}

                <div className="driver-form-group">
                  <label>
                    Full Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={form.full_name}
                    disabled={modalMode === "VIEW" || formLoading}
                    onChange={(event) =>
                      handleFormChange("full_name", event.target.value)
                    }
                    placeholder="Nama lengkap"
                  />
                </div>

                {/* EMPLOYEE NUMBER */}

                <div className="driver-form-group">
                  <label>Employee Number</label>

                  <input
                    type="text"
                    value={form.employee_number || ""}
                    disabled={modalMode === "VIEW" || formLoading}
                    onChange={(event) =>
                      handleFormChange("employee_number", event.target.value)
                    }
                    placeholder="EMP-002"
                  />
                </div>

                {/* PHONE */}

                <div className="driver-form-group">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    value={form.phone_number || ""}
                    disabled={modalMode === "VIEW" || formLoading}
                    onChange={(event) =>
                      handleFormChange("phone_number", event.target.value)
                    }
                    placeholder="081234567890"
                  />
                </div>

                {/* LICENSE NUMBER */}

                <div className="driver-form-group">
                  <label>License Number</label>

                  <input
                    type="text"
                    value={form.license_number || ""}
                    disabled={modalMode === "VIEW" || formLoading}
                    onChange={(event) =>
                      handleFormChange("license_number", event.target.value)
                    }
                    placeholder="SIM-BII-002"
                  />
                </div>

                {/* LICENSE TYPE */}

                <div className="driver-form-group">
                  <label>License Type</label>

                  <select
                    value={form.license_type || ""}
                    disabled={modalMode === "VIEW" || formLoading}
                    onChange={(event) =>
                      handleFormChange("license_type", event.target.value)
                    }
                  >
                    <option value="">Select license type</option>

                    <option value="A">A</option>

                    <option value="A UMUM">A UMUM</option>

                    <option value="B1">B1</option>

                    <option value="B1 UMUM">B1 UMUM</option>

                    <option value="BII">BII</option>

                    <option value="BII UMUM">BII UMUM</option>

                    <option value="C">C</option>
                  </select>
                </div>

                {/* STATUS */}

                <div className="driver-form-group">
                  <label>Status</label>

                  <select
                    value={form.status || "ACTIVE"}
                    disabled={modalMode === "VIEW" || formLoading}
                    onChange={(event) =>
                      handleFormChange("status", event.target.value)
                    }
                  >
                    <option value="ACTIVE">ACTIVE</option>

                    <option value="INACTIVE">INACTIVE</option>

                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              {/* FORM ERROR */}

              {formError && (
                <div className="driver-form-error">{formError}</div>
              )}

              {/* FOOTER */}

              <div className="driver-modal-footer">
                <button
                  type="button"
                  className="driver-modal-cancel"
                  onClick={closeModal}
                  disabled={formLoading}
                >
                  Close
                </button>

                {modalMode !== "VIEW" && (
                  <button
                    type="submit"
                    className="driver-modal-submit"
                    disabled={formLoading}
                  >
                    {formLoading
                      ? "Saving..."
                      : modalMode === "ADD"
                        ? "Create Driver"
                        : "Save Changes"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
