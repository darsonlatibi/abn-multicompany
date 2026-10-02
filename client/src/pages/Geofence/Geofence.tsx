import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Circle,
  Save,
  X,
} from "lucide-react";

import type { AppDispatch, RootState } from "../../stores/store";

import {
  fetchGeofences,
  createGeofence,
  updateGeofence,
  deleteGeofence,
  setSelectedGeofence,
  clearSelectedGeofence,
  resetGeofenceStatus,
  type Geofence,
  type GeofencePayload,
} from "../../features/geofence/geofenceSlice";

import "./Geofence.css";

/* =========================================================
   ABN FLEET SYSTEM
   GEOFENCE PAGE
   ========================================================= */

const GeofencePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    geofences,
    selectedGeofence,
    loading,
    creating,
    updating,
    deleting,
    error,
    success,
    message,
  } = useSelector((state: RootState) => state.geofence);

  /* =======================================================
     FORM STATE
     ======================================================= */

  const [form, setForm] = useState<GeofencePayload>({
    name: "",
    description: "",
    type: "CIRCLE",
    latitude: undefined,
    longitude: undefined,
    radius: 500,
    status: "ACTIVE",
  });

  const [editingId, setEditingId] = useState<string | number | null>(null);

  /* =======================================================
     LOAD DATA
     ======================================================= */

  useEffect(() => {
    dispatch(fetchGeofences());
  }, [dispatch]);

  /* =======================================================
     RESET MESSAGE
     ======================================================= */

  useEffect(() => {
    if (!success && !message) return;

    const timer = window.setTimeout(() => {
      dispatch(resetGeofenceStatus());
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [success, message, dispatch]);

  /* =======================================================
     FORM CHANGE
     ======================================================= */

  const handleChange = (field: keyof GeofencePayload, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        field === "latitude" || field === "longitude" || field === "radius"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
  };

  /* =======================================================
     RESET FORM
     ======================================================= */

  const resetForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      description: "",
      type: "CIRCLE",
      latitude: undefined,
      longitude: undefined,
      radius: 500,
      status: "ACTIVE",
    });

    dispatch(clearSelectedGeofence());
  };

  /* =======================================================
     EDIT
     ======================================================= */

  const handleEdit = (geofence: Geofence) => {
    setEditingId(geofence.id);

    setForm({
      name: geofence.name || "",
      description: geofence.description || "",
      type: geofence.type || "CIRCLE",
      latitude: geofence.latitude ?? undefined,
      longitude: geofence.longitude ?? undefined,
      radius: geofence.radius ?? 500,
      coordinates: geofence.coordinates,
      status: geofence.status || "ACTIVE",
    });

    dispatch(setSelectedGeofence(geofence));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     SUBMIT
     ======================================================= */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    if (form.latitude === undefined || form.longitude === undefined) {
      return;
    }

    if (editingId !== null) {
      await dispatch(
        updateGeofence({
          id: editingId,
          data: form,
        }),
      ).unwrap();
    } else {
      await dispatch(createGeofence(form)).unwrap();
    }

    resetForm();

    dispatch(fetchGeofences());
  };

  /* =======================================================
     DELETE
     ======================================================= */

  const handleDelete = async (geofence: Geofence) => {
    const confirmed = window.confirm(`Hapus geofence "${geofence.name}"?`);

    if (!confirmed) return;

    await dispatch(deleteGeofence(geofence.id)).unwrap();
  };

  /* =======================================================
     SELECT
     ======================================================= */

  const handleSelect = (geofence: Geofence) => {
    dispatch(setSelectedGeofence(geofence));
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="geofence-page">
      {/* ===================================================
          HEADER
          =================================================== */}

      <div className="geofence-header">
        <div>
          <div className="geofence-title-row">
            <div className="geofence-title-icon">
              <MapPin size={21} />
            </div>

            <div>
              <h1>Geofence</h1>

              <p>Kelola area monitoring armada ABN</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="geofence-refresh"
          onClick={() => dispatch(fetchGeofences())}
          disabled={loading}
        >
          <RefreshCw size={15} className={loading ? "geofence-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ===================================================
          STATUS
          =================================================== */}

      {error && (
        <div className="geofence-alert error">
          <strong>Error</strong>
          <span>{error}</span>
        </div>
      )}

      {success && message && (
        <div className="geofence-alert success">
          <strong>Berhasil</strong>
          <span>{message}</span>
        </div>
      )}

      {/* ===================================================
          MAIN
          =================================================== */}

      <div className="geofence-content">
        {/* =================================================
            FORM
            ================================================= */}

        <section className="geofence-form-card">
          <div className="geofence-card-header">
            <div>
              <strong>
                {editingId !== null ? "Edit Geofence" : "Tambah Geofence"}
              </strong>

              <span>Tentukan area yang akan dipantau</span>
            </div>

            {editingId !== null && (
              <button
                type="button"
                className="geofence-close"
                onClick={resetForm}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {/* NAME */}

            <div className="geofence-field">
              <label>Nama Geofence</label>

              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Contoh: Pool ABN"
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div className="geofence-field">
              <label>Deskripsi</label>

              <textarea
                value={form.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Keterangan area..."
                rows={3}
              />
            </div>

            {/* TYPE */}

            <div className="geofence-field">
              <label>Tipe</label>

              <select
                value={form.type || "CIRCLE"}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <option value="CIRCLE">Circle</option>

                <option value="POLYGON">Polygon</option>
              </select>
            </div>

            {/* LATITUDE */}

            <div className="geofence-form-row">
              <div className="geofence-field">
                <label>Latitude</label>

                <input
                  type="number"
                  step="any"
                  value={form.latitude ?? ""}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                  placeholder="-7.1677999"
                  required
                />
              </div>

              <div className="geofence-field">
                <label>Longitude</label>

                <input
                  type="number"
                  step="any"
                  value={form.longitude ?? ""}
                  onChange={(e) => handleChange("longitude", e.target.value)}
                  placeholder="112.7828522"
                  required
                />
              </div>
            </div>

            {/* RADIUS */}

            <div className="geofence-field">
              <label>Radius (meter)</label>

              <div className="geofence-input-unit">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={form.radius ?? ""}
                  onChange={(e) => handleChange("radius", e.target.value)}
                  required
                />

                <span>m</span>
              </div>
            </div>

            {/* STATUS */}

            <div className="geofence-field">
              <label>Status</label>

              <select
                value={form.status || "ACTIVE"}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="ACTIVE">Active</option>

                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            {/* ACTION */}

            <div className="geofence-form-actions">
              <button
                type="submit"
                className="geofence-save"
                disabled={creating || updating}
              >
                {creating || updating ? (
                  <RefreshCw size={15} className="geofence-spin" />
                ) : editingId !== null ? (
                  <Save size={15} />
                ) : (
                  <Plus size={15} />
                )}

                {editingId !== null ? "Simpan Perubahan" : "Tambah Geofence"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="geofence-cancel"
                  onClick={resetForm}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </section>

        {/* =================================================
            LIST
            ================================================= */}

        <section className="geofence-list-card">
          <div className="geofence-card-header">
            <div>
              <strong>Daftar Geofence</strong>

              <span>Area monitoring armada</span>
            </div>

            <span className="geofence-count">{geofences.length}</span>
          </div>

          <div className="geofence-list">
            {loading && geofences.length === 0 && (
              <div className="geofence-empty">
                <RefreshCw size={20} className="geofence-spin" />

                <span>Memuat geofence...</span>
              </div>
            )}

            {!loading && geofences.length === 0 && (
              <div className="geofence-empty">
                <MapPin size={28} />

                <strong>Belum ada geofence</strong>

                <span>Tambahkan area monitoring pertama.</span>
              </div>
            )}

            {geofences.map((geofence) => {
              const selected =
                String(selectedGeofence?.id) === String(geofence.id);

              return (
                <div
                  key={geofence.id}
                  className={`geofence-item ${selected ? "selected" : ""}`}
                  onClick={() => handleSelect(geofence)}
                >
                  {/* ICON */}

                  <div className="geofence-item-icon">
                    <Circle size={18} />
                  </div>

                  {/* INFO */}

                  <div className="geofence-item-info">
                    <strong>{geofence.name}</strong>

                    <span>{geofence.description || "Tidak ada deskripsi"}</span>

                    <div className="geofence-item-meta">
                      <span>
                        {geofence.latitude ?? "-"}, {geofence.longitude ?? "-"}
                      </span>

                      <span>Radius {geofence.radius ?? 0}m</span>
                    </div>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`geofence-status ${
                      String(geofence.status).toLowerCase() === "active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {geofence.status || "ACTIVE"}
                  </span>

                  {/* ACTION */}

                  <div className="geofence-item-actions">
                    <button
                      type="button"
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation();

                        handleEdit(geofence);
                      }}
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      type="button"
                      title="Delete"
                      className="danger"
                      disabled={deleting}
                      onClick={(e) => {
                        e.stopPropagation();

                        handleDelete(geofence);
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ===================================================
          SELECTED DETAIL
          =================================================== */}

      {selectedGeofence && (
        <section className="geofence-detail">
          <div className="geofence-detail-title">
            <MapPin size={18} />

            <div>
              <strong>{selectedGeofence.name}</strong>

              <span>Detail area monitoring</span>
            </div>
          </div>

          <div className="geofence-detail-grid">
            <div>
              <span>Latitude</span>

              <strong>{selectedGeofence.latitude ?? "-"}</strong>
            </div>

            <div>
              <span>Longitude</span>

              <strong>{selectedGeofence.longitude ?? "-"}</strong>
            </div>

            <div>
              <span>Radius</span>

              <strong>{selectedGeofence.radius ?? "-"} m</strong>
            </div>

            <div>
              <span>Type</span>

              <strong>{selectedGeofence.type || "CIRCLE"}</strong>
            </div>

            <div>
              <span>Status</span>

              <strong
                className={
                  String(selectedGeofence.status).toLowerCase() === "active"
                    ? "active"
                    : "inactive"
                }
              >
                {selectedGeofence.status || "ACTIVE"}
              </strong>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GeofencePage;
