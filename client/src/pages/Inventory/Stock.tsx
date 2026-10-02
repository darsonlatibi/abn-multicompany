import React, { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Eye,
  Filter,
  Package,
  RefreshCw,
  Search,
  Settings2,
  TrendingDown,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import "./Stock.css";

type StockStatus = "NORMAL" | "LOW" | "OUT OF STOCK";

interface StockItem {
  id: string;
  sku: string;
  product: string;
  category: string;
  warehouse: string;
  location: string;
  unit: string;
  opening: number;
  stockIn: number;
  stockOut: number;
  adjustment: number;
  current: number;
  minStock: number;
  price: number;
  updated: string;
}

const stockItems: StockItem[] = [
  {
    id: "STK-001",
    sku: "RM-CEM-001",
    product: "Cement Portland Type I",
    category: "Raw Material",
    warehouse: "Warehouse A",
    location: "A-01-01",
    unit: "Ton",
    opening: 1180,
    stockIn: 180,
    stockOut: 120,
    adjustment: 0,
    current: 1240,
    minStock: 500,
    price: 980000,
    updated: "10:42",
  },
  {
    id: "STK-002",
    sku: "RM-CLY-001",
    product: "Clay / Tanah Liat",
    category: "Raw Material",
    warehouse: "Raw Material Yard",
    location: "YARD-03",
    unit: "Ton",
    opening: 720,
    stockIn: 100,
    stockOut: 140,
    adjustment: 0,
    current: 680,
    minStock: 300,
    price: 420000,
    updated: "10:21",
  },
  {
    id: "STK-003",
    sku: "SP-BRG-001",
    product: "Bearing SKF 6312",
    category: "Spare Parts",
    warehouse: "Maintenance Store",
    location: "MS-A-02",
    unit: "Pcs",
    opening: 30,
    stockIn: 4,
    stockOut: 10,
    adjustment: 0,
    current: 24,
    minStock: 20,
    price: 2850000,
    updated: "09:55",
  },
  {
    id: "STK-004",
    sku: "SP-MTR-024",
    product: "Motor Electric 75 kW",
    category: "Spare Parts",
    warehouse: "Maintenance Store",
    location: "MS-B-01",
    unit: "Pcs",
    opening: 8,
    stockIn: 0,
    stockOut: 2,
    adjustment: 0,
    current: 6,
    minStock: 8,
    price: 18500000,
    updated: "09:41",
  },
  {
    id: "STK-005",
    sku: "PK-BAG-001",
    product: "Cement Bag 40 kg",
    category: "Packaging",
    warehouse: "Finished Goods",
    location: "FG-A-01",
    unit: "Pcs",
    opening: 16200,
    stockIn: 5000,
    stockOut: 2700,
    adjustment: 0,
    current: 18500,
    minStock: 5000,
    price: 1850,
    updated: "09:22",
  },
  {
    id: "STK-006",
    sku: "PK-BAG-002",
    product: "Cement Bag 50 kg",
    category: "Packaging",
    warehouse: "Finished Goods",
    location: "FG-A-02",
    unit: "Pcs",
    opening: 11300,
    stockIn: 2500,
    stockOut: 1200,
    adjustment: 0,
    current: 12600,
    minStock: 5000,
    price: 2150,
    updated: "08:54",
  },
  {
    id: "STK-007",
    sku: "CHEM-ADM-001",
    product: "Grinding Aid Chemical",
    category: "Chemical",
    warehouse: "Chemical Store",
    location: "CS-02-01",
    unit: "Drum",
    opening: 36,
    stockIn: 15,
    stockOut: 9,
    adjustment: 0,
    current: 42,
    minStock: 15,
    price: 4250000,
    updated: "08:35",
  },
  {
    id: "STK-008",
    sku: "LUB-OIL-001",
    product: "Industrial Gear Oil",
    category: "Lubricant",
    warehouse: "Lubricant Store",
    location: "LS-01-03",
    unit: "Drum",
    opening: 14,
    stockIn: 2,
    stockOut: 7,
    adjustment: 0,
    current: 9,
    minStock: 12,
    price: 3150000,
    updated: "08:12",
  },
  {
    id: "STK-009",
    sku: "ELEC-CBL-001",
    product: "Power Cable NYY 4 x 16 mm",
    category: "Electrical",
    warehouse: "Electrical Store",
    location: "ES-03-02",
    unit: "Meter",
    opening: 2900,
    stockIn: 1000,
    stockOut: 700,
    adjustment: 0,
    current: 3200,
    minStock: 1000,
    price: 42500,
    updated: "07:45",
  },
  {
    id: "STK-010",
    sku: "SAF-HELM-001",
    product: "Safety Helmet",
    category: "Safety",
    warehouse: "General Store",
    location: "GS-01-01",
    unit: "Pcs",
    opening: 650,
    stockIn: 250,
    stockOut: 120,
    adjustment: 0,
    current: 780,
    minStock: 200,
    price: 85000,
    updated: "07:32",
  },
  {
    id: "STK-011",
    sku: "SP-VLV-011",
    product: "Butterfly Valve DN200",
    category: "Mechanical",
    warehouse: "Maintenance Store",
    location: "MS-C-04",
    unit: "Pcs",
    opening: 5,
    stockIn: 0,
    stockOut: 2,
    adjustment: 0,
    current: 3,
    minStock: 5,
    price: 7250000,
    updated: "06:48",
  },
  {
    id: "STK-012",
    sku: "ELEC-SEN-007",
    product: "Temperature Sensor PT100",
    category: "Instrumentation",
    warehouse: "Electrical Store",
    location: "ES-05-02",
    unit: "Pcs",
    opening: 4,
    stockIn: 0,
    stockOut: 4,
    adjustment: 0,
    current: 0,
    minStock: 10,
    price: 1250000,
    updated: "06:21",
  },
];

const getStatus = (item: StockItem): StockStatus => {
  if (item.current <= 0) return "OUT OF STOCK";
  if (item.current <= item.minStock) return "LOW";
  return "NORMAL";
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const Stock: React.FC = () => {
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 8;

  const warehouses = useMemo(
    () => [
      "ALL",
      ...Array.from(new Set(stockItems.map((item) => item.warehouse))),
    ],
    [],
  );

  const categories = useMemo(
    () => [
      "ALL",
      ...Array.from(new Set(stockItems.map((item) => item.category))),
    ],
    [],
  );

  const filteredItems = useMemo(() => {
    const query = search.toLowerCase().trim();

    return stockItems.filter((item) => {
      const matchesSearch =
        !query ||
        item.product.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      const matchesWarehouse =
        warehouse === "ALL" || item.warehouse === warehouse;

      const matchesCategory = category === "ALL" || item.category === category;

      const matchesStatus = status === "ALL" || getStatus(item) === status;

      return (
        matchesSearch && matchesWarehouse && matchesCategory && matchesStatus
      );
    });
  }, [search, warehouse, category, status]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));

  const currentPage = Math.min(page, totalPages);

  const visibleItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalStockUnits = stockItems.reduce(
    (sum, item) => sum + item.current,
    0,
  );

  const totalValue = stockItems.reduce(
    (sum, item) => sum + item.current * item.price,
    0,
  );

  const totalStockIn = stockItems.reduce((sum, item) => sum + item.stockIn, 0);

  const totalStockOut = stockItems.reduce(
    (sum, item) => sum + item.stockOut,
    0,
  );

  const lowStock = stockItems.filter(
    (item) => getStatus(item) === "LOW",
  ).length;

  const outOfStock = stockItems.filter(
    (item) => getStatus(item) === "OUT OF STOCK",
  ).length;

  const resetFilters = () => {
    setSearch("");
    setWarehouse("ALL");
    setCategory("ALL");
    setStatus("ALL");
    setPage(1);
  };

  return (
    <div className="stock-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="stock-header">
        <div>
          <div className="stock-eyebrow">
            <Boxes size={15} />
            INVENTORY & WAREHOUSE
          </div>

          <h1>Stock</h1>

          <p>
            Monitor current inventory position, stock movement, warehouse
            availability, and replenishment status.
          </p>
        </div>

        <div className="stock-header-actions">
          <button className="stock-btn stock-btn-light">
            <RefreshCw size={17} />
            Refresh
          </button>

          <button className="stock-btn stock-btn-primary">
            <ClipboardList size={17} />
            Stock Adjustment
          </button>
        </div>
      </div>

      {/* =====================================================
          KPI
      ===================================================== */}

      <div className="stock-kpi-grid">
        <div className="stock-kpi-card">
          <div className="stock-kpi-icon stock-blue">
            <Boxes size={22} />
          </div>

          <div>
            <span>Total Stock</span>
            <strong>{formatNumber(totalStockUnits)}</strong>
            <small>Across all warehouses</small>
          </div>
        </div>

        <div className="stock-kpi-card">
          <div className="stock-kpi-icon stock-green">
            <Package size={22} />
          </div>

          <div>
            <span>Inventory Value</span>
            <strong>{formatCurrency(totalValue)}</strong>
            <small>Current stock valuation</small>
          </div>
        </div>

        <div className="stock-kpi-card">
          <div className="stock-kpi-icon stock-orange">
            <TrendingDown size={22} />
          </div>

          <div>
            <span>Low Stock</span>
            <strong>{lowStock}</strong>
            <small>Need replenishment</small>
          </div>
        </div>

        <div className="stock-kpi-card">
          <div className="stock-kpi-icon stock-red">
            <Settings2 size={22} />
          </div>

          <div>
            <span>Out of Stock</span>
            <strong>{outOfStock}</strong>
            <small>Immediate attention</small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOVEMENT SUMMARY
      ===================================================== */}

      <div className="stock-summary-grid">
        <div className="stock-movement-card">
          <div className="stock-card-heading">
            <div>
              <span className="stock-section-label">STOCK MOVEMENT</span>
              <h2>Today's Movement</h2>
            </div>

            <button className="stock-more-btn">
              Today
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="stock-movement-grid">
            <div className="stock-movement-item">
              <div className="stock-movement-icon stock-in">
                <ArrowDownToLine size={19} />
              </div>

              <div>
                <span>Stock In</span>
                <strong>{formatNumber(totalStockIn)}</strong>
                <small>
                  <TrendingUp size={12} />
                  Incoming
                </small>
              </div>
            </div>

            <div className="stock-movement-item">
              <div className="stock-movement-icon stock-out">
                <ArrowUpFromLine size={19} />
              </div>

              <div>
                <span>Stock Out</span>
                <strong>{formatNumber(totalStockOut)}</strong>
                <small>
                  <TrendingDown size={12} />
                  Consumption
                </small>
              </div>
            </div>
          </div>

          <div className="stock-net-row">
            <span>Net Movement</span>
            <strong>
              {totalStockIn - totalStockOut >= 0 ? "+" : ""}
              {formatNumber(totalStockIn - totalStockOut)}
            </strong>
          </div>
        </div>

        <div className="stock-warehouse-card">
          <div className="stock-card-heading">
            <div>
              <span className="stock-section-label">
                WAREHOUSE DISTRIBUTION
              </span>
              <h2>Stock by Warehouse</h2>
            </div>

            <Warehouse size={20} />
          </div>

          <div className="stock-warehouse-list">
            {warehouses
              .filter((item) => item !== "ALL")
              .slice(0, 5)
              .map((warehouseName) => {
                const warehouseItems = stockItems.filter(
                  (item) => item.warehouse === warehouseName,
                );

                const value = warehouseItems.reduce(
                  (sum, item) => sum + item.current * item.price,
                  0,
                );

                const maxValue = Math.max(
                  ...warehouses
                    .filter((item) => item !== "ALL")
                    .map((name) =>
                      stockItems
                        .filter((item) => item.warehouse === name)
                        .reduce(
                          (sum, item) => sum + item.current * item.price,
                          0,
                        ),
                    ),
                );

                return (
                  <div className="stock-warehouse-row" key={warehouseName}>
                    <div className="stock-warehouse-top">
                      <span>{warehouseName}</span>
                      <strong>{formatCurrency(value)}</strong>
                    </div>

                    <div className="stock-progress">
                      <div
                        style={{
                          width: `${Math.max(5, (value / maxValue) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* =====================================================
          STOCK TABLE
      ===================================================== */}

      <div className="stock-table-card">
        <div className="stock-toolbar">
          <div className="stock-toolbar-title">
            <div className="stock-toolbar-icon">
              <Warehouse size={19} />
            </div>

            <div>
              <h2>Current Stock Position</h2>
              <span>{filteredItems.length} inventory items</span>
            </div>
          </div>

          <div className="stock-toolbar-actions">
            <div className="stock-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search SKU, product, location..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            <button
              className={`stock-filter-btn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters((value) => !value)}
            >
              <Filter size={17} />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="stock-filter-panel">
            <div className="stock-filter-group">
              <label>Warehouse</label>

              <select
                value={warehouse}
                onChange={(event) => {
                  setWarehouse(event.target.value);
                  setPage(1);
                }}
              >
                {warehouses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="stock-filter-group">
              <label>Category</label>

              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="stock-filter-group">
              <label>Stock Status</label>

              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
              >
                <option value="ALL">ALL</option>
                <option value="NORMAL">NORMAL</option>
                <option value="LOW">LOW STOCK</option>
                <option value="OUT OF STOCK">OUT OF STOCK</option>
              </select>
            </div>

            <button className="stock-reset-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}

        <div className="stock-table-wrapper">
          <table className="stock-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>WAREHOUSE</th>
                <th>LOCATION</th>
                <th>OPENING</th>
                <th>STOCK IN</th>
                <th>STOCK OUT</th>
                <th>CURRENT STOCK</th>
                <th>VALUE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {visibleItems.length > 0 ? (
                visibleItems.map((item) => {
                  const itemStatus = getStatus(item);
                  const value = item.current * item.price;

                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="stock-product">
                          <div className="stock-product-icon">
                            <Package size={17} />
                          </div>

                          <div>
                            <strong>{item.product}</strong>
                            <span>
                              {item.sku} · {item.unit}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="stock-warehouse-name">
                          <Warehouse size={14} />
                          {item.warehouse}
                        </div>
                      </td>

                      <td>
                        <span className="stock-location">{item.location}</span>
                      </td>

                      <td>
                        <span className="stock-number">
                          {formatNumber(item.opening)}
                        </span>
                      </td>

                      <td>
                        <span className="stock-in-number">
                          +{formatNumber(item.stockIn)}
                        </span>
                      </td>

                      <td>
                        <span className="stock-out-number">
                          -{formatNumber(item.stockOut)}
                        </span>
                      </td>

                      <td>
                        <div className="stock-current">
                          <strong>{formatNumber(item.current)}</strong>

                          <span>{item.unit}</span>

                          <div className="stock-current-bar">
                            <div
                              className={
                                itemStatus === "NORMAL"
                                  ? "normal"
                                  : itemStatus === "LOW"
                                    ? "low"
                                    : "out"
                              }
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(
                                    4,
                                    (item.current /
                                      Math.max(item.minStock * 2, 1)) *
                                      100,
                                  ),
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        <strong className="stock-value">
                          {formatCurrency(value)}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`stock-status stock-status-${itemStatus
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {itemStatus === "NORMAL" && (
                            <CheckCircle2 size={13} />
                          )}

                          {itemStatus === "LOW" && <TrendingDown size={13} />}

                          {itemStatus === "OUT OF STOCK" && (
                            <Package size={13} />
                          )}

                          {itemStatus === "LOW" ? "LOW STOCK" : itemStatus}
                        </span>
                      </td>

                      <td>
                        <button
                          className="stock-view-btn"
                          title="View Stock Detail"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10}>
                    <div className="stock-empty">
                      <Boxes size={36} />
                      <strong>No stock data found</strong>
                      <span>Try changing your search or filters.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===================================================
            PAGINATION
        =================================================== */}

        <div className="stock-pagination">
          <span>
            Showing{" "}
            <strong>
              {filteredItems.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(currentPage * pageSize, filteredItems.length)}
            </strong>{" "}
            of <strong>{filteredItems.length}</strong> items
          </span>

          <div className="stock-page-buttons">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(0, 5)
              .map((number) => (
                <button
                  key={number}
                  className={currentPage === number ? "active" : ""}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          QUICK ACTION
      ===================================================== */}

      <div className="stock-quick-actions">
        <div>
          <span className="stock-section-label">WAREHOUSE OPERATIONS</span>

          <h3>Stock Transactions</h3>

          <p>
            Execute inbound, outbound, transfer, and stock adjustment
            transactions.
          </p>
        </div>

        <div className="stock-quick-buttons">
          <button className="stock-quick-in">
            <ArrowDownToLine size={17} />
            Stock In
          </button>

          <button className="stock-quick-out">
            <ArrowUpFromLine size={17} />
            Stock Out
          </button>

          <button>
            <Warehouse size={17} />
            Transfer
          </button>

          <button>
            <Settings2 size={17} />
            Adjustment
          </button>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="stock-footer">
        <span>Inventory & Warehouse Management</span>
        <strong>Designed by ABN</strong>
      </div>
    </div>
  );
};

export default Stock;
