import React, { useMemo, useState } from "react";
import {
  Archive,
  ArrowDownToLine,
  ArrowUpToLine,
  Boxes,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Edit3,
  Eye,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldAlert,
  Tags,
  // Trash2,
  Warehouse,
} from "lucide-react";
import "./Products.css";

type StockStatus = "IN STOCK" | "LOW STOCK" | "OUT OF STOCK";
type ProductStatus = "ACTIVE" | "INACTIVE";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  unit: string;
  stock: number;
  minStock: number;
  price: number;
  value: number;
  status: ProductStatus;
  lastUpdated: string;
}

const products: Product[] = [
  {
    id: "PRD-001",
    sku: "RM-CEM-001",
    name: "Cement Portland Type I",
    category: "Raw Material",
    warehouse: "Warehouse A",
    unit: "Ton",
    stock: 1240,
    minStock: 500,
    price: 980000,
    value: 1215200000,
    status: "ACTIVE",
    lastUpdated: "14 Sep 2026 10:42",
  },
  {
    id: "PRD-002",
    sku: "RM-CLY-001",
    name: "Clay / Tanah Liat",
    category: "Raw Material",
    warehouse: "Raw Material Yard",
    unit: "Ton",
    stock: 680,
    minStock: 300,
    price: 420000,
    value: 285600000,
    status: "ACTIVE",
    lastUpdated: "14 Sep 2026 10:21",
  },
  {
    id: "PRD-003",
    sku: "SP-BRG-001",
    name: "Bearing SKF 6312",
    category: "Spare Parts",
    warehouse: "Maintenance Store",
    unit: "Pcs",
    stock: 24,
    minStock: 20,
    price: 2850000,
    value: 68400000,
    status: "ACTIVE",
    lastUpdated: "14 Sep 2026 09:55",
  },
  {
    id: "PRD-004",
    sku: "SP-MTR-024",
    name: "Motor Electric 75 kW",
    category: "Spare Parts",
    warehouse: "Maintenance Store",
    unit: "Pcs",
    stock: 6,
    minStock: 8,
    price: 18500000,
    value: 111000000,
    status: "ACTIVE",
    lastUpdated: "14 Sep 2026 09:41",
  },
  {
    id: "PRD-005",
    sku: "PK-BAG-001",
    name: "Cement Bag 40 kg",
    category: "Packaging",
    warehouse: "Finished Goods",
    unit: "Pcs",
    stock: 18500,
    minStock: 5000,
    price: 1850,
    value: 34225000,
    status: "ACTIVE",
    lastUpdated: "14 Sep 2026 09:22",
  },
  {
    id: "PRD-006",
    sku: "PK-BAG-002",
    name: "Cement Bag 50 kg",
    category: "Packaging",
    warehouse: "Finished Goods",
    unit: "Pcs",
    stock: 12600,
    minStock: 5000,
    price: 2150,
    value: 27090000,
    status: "ACTIVE",
    lastUpdated: "14 Sep 2026 08:54",
  },
  {
    id: "PRD-007",
    sku: "CHEM-ADM-001",
    name: "Grinding Aid Chemical",
    category: "Chemical",
    warehouse: "Chemical Store",
    unit: "Drum",
    stock: 42,
    minStock: 15,
    price: 4250000,
    value: 178500000,
    status: "ACTIVE",
    lastUpdated: "14 Sep 2026 08:35",
  },
  {
    id: "PRD-008",
    sku: "LUB-OIL-001",
    name: "Industrial Gear Oil",
    category: "Lubricant",
    warehouse: "Lubricant Store",
    unit: "Drum",
    stock: 9,
    minStock: 12,
    price: 3150000,
    value: 28350000,
    status: "ACTIVE",
    lastUpdated: "14 Sep 2026 08:12",
  },
  {
    id: "PRD-009",
    sku: "ELEC-CBL-001",
    name: "Power Cable NYY 4 x 16 mm",
    category: "Electrical",
    warehouse: "Electrical Store",
    unit: "Meter",
    stock: 3200,
    minStock: 1000,
    price: 42500,
    value: 136000000,
    status: "ACTIVE",
    lastUpdated: "13 Sep 2026 17:45",
  },
  {
    id: "PRD-010",
    sku: "SAF-HELM-001",
    name: "Safety Helmet",
    category: "Safety",
    warehouse: "General Store",
    unit: "Pcs",
    stock: 780,
    minStock: 200,
    price: 85000,
    value: 66300000,
    status: "ACTIVE",
    lastUpdated: "13 Sep 2026 16:32",
  },
  {
    id: "PRD-011",
    sku: "SP-VLV-011",
    name: "Butterfly Valve DN200",
    category: "Mechanical",
    warehouse: "Maintenance Store",
    unit: "Pcs",
    stock: 3,
    minStock: 5,
    price: 7250000,
    value: 21750000,
    status: "ACTIVE",
    lastUpdated: "13 Sep 2026 15:48",
  },
  {
    id: "PRD-012",
    sku: "ELEC-SEN-007",
    name: "Temperature Sensor PT100",
    category: "Instrumentation",
    warehouse: "Electrical Store",
    unit: "Pcs",
    stock: 0,
    minStock: 10,
    price: 1250000,
    value: 0,
    status: "ACTIVE",
    lastUpdated: "13 Sep 2026 14:21",
  },
];

const getStockStatus = (product: Product): StockStatus => {
  if (product.stock <= 0) return "OUT OF STOCK";
  if (product.stock <= product.minStock) return "LOW STOCK";
  return "IN STOCK";
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const statusClass = (status: StockStatus) => {
  switch (status) {
    case "IN STOCK":
      return "product-stock-ok";
    case "LOW STOCK":
      return "product-stock-low";
    case "OUT OF STOCK":
      return "product-stock-out";
    default:
      return "";
  }
};

const Products: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [warehouse, setWarehouse] = useState("ALL");
  const [stockStatus, setStockStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const pageSize = 8;

  const categories = useMemo(
    () => [
      "ALL",
      ...Array.from(new Set(products.map((item) => item.category))),
    ],
    [],
  );

  const warehouses = useMemo(
    () => [
      "ALL",
      ...Array.from(new Set(products.map((item) => item.warehouse))),
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "ALL" || product.category === category;

      const matchesWarehouse =
        warehouse === "ALL" || product.warehouse === warehouse;

      const matchesStock =
        stockStatus === "ALL" || getStockStatus(product) === stockStatus;

      return (
        matchesSearch && matchesCategory && matchesWarehouse && matchesStock
      );
    });
  }, [search, category, warehouse, stockStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const currentPage = Math.min(page, totalPages);

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalProducts = products.length;

  const totalStockValue = products.reduce(
    (sum, product) => sum + product.value,
    0,
  );

  const lowStockProducts = products.filter(
    (product) => getStockStatus(product) === "LOW STOCK",
  ).length;

  const outOfStockProducts = products.filter(
    (product) => getStockStatus(product) === "OUT OF STOCK",
  ).length;

  const activeProducts = products.filter(
    (product) => product.status === "ACTIVE",
  ).length;

  const resetFilters = () => {
    setSearch("");
    setCategory("ALL");
    setWarehouse("ALL");
    setStockStatus("ALL");
    setPage(1);
  };

  return (
    <div className="products-page">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="products-header">
        <div>
          <div className="products-eyebrow">
            <Boxes size={15} />
            INVENTORY & WAREHOUSE
          </div>

          <h1>Products</h1>

          <p>
            Manage product master data, stock availability, warehouse
            allocation, and inventory valuation.
          </p>
        </div>

        <div className="products-header-actions">
          <button className="products-btn products-btn-light">
            <RefreshCw size={17} />
            Refresh
          </button>

          <button className="products-btn products-btn-primary">
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* =====================================================
          KPI
      ===================================================== */}
      <div className="products-kpi-grid">
        <div className="products-kpi-card">
          <div className="products-kpi-icon products-icon-blue">
            <Package size={22} />
          </div>

          <div className="products-kpi-content">
            <span>Total Products</span>
            <strong>{formatNumber(totalProducts)}</strong>
            <small>
              <CheckCircle2 size={13} />
              {activeProducts} active products
            </small>
          </div>
        </div>

        <div className="products-kpi-card">
          <div className="products-kpi-icon products-icon-green">
            <CircleDollarSign size={22} />
          </div>

          <div className="products-kpi-content">
            <span>Inventory Value</span>
            <strong>{formatCurrency(totalStockValue)}</strong>
            <small>Current stock valuation</small>
          </div>
        </div>

        <div className="products-kpi-card">
          <div className="products-kpi-icon products-icon-orange">
            <ShieldAlert size={22} />
          </div>

          <div className="products-kpi-content">
            <span>Low Stock</span>
            <strong>{lowStockProducts}</strong>
            <small>Items below minimum stock</small>
          </div>
        </div>

        <div className="products-kpi-card">
          <div className="products-kpi-icon products-icon-red">
            <Archive size={22} />
          </div>

          <div className="products-kpi-content">
            <span>Out of Stock</span>
            <strong>{outOfStockProducts}</strong>
            <small>Immediate replenishment required</small>
          </div>
        </div>
      </div>

      {/* =====================================================
          CATEGORY SUMMARY
      ===================================================== */}
      <div className="products-category-card">
        <div className="products-section-heading">
          <div>
            <span className="products-section-label">PRODUCT MASTER</span>
            <h2>Category Overview</h2>
          </div>

          <button className="products-link-btn">
            View Categories
            <ChevronDown size={15} />
          </button>
        </div>

        <div className="products-category-grid">
          {categories
            .filter((item) => item !== "ALL")
            .slice(0, 6)
            .map((item) => {
              const count = products.filter(
                (product) => product.category === item,
              ).length;

              const value = products
                .filter((product) => product.category === item)
                .reduce((sum, product) => sum + product.value, 0);

              return (
                <div className="products-category-item" key={item}>
                  <div className="products-category-icon">
                    <Tags size={17} />
                  </div>

                  <div className="products-category-info">
                    <strong>{item}</strong>
                    <span>
                      {count} product{count > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="products-category-value">
                    {formatCurrency(value)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}
      <div className="products-table-card">
        <div className="products-table-toolbar">
          <div className="products-toolbar-title">
            <div className="products-toolbar-icon">
              <Warehouse size={19} />
            </div>

            <div>
              <h2>Product Inventory</h2>
              <span>{filteredProducts.length} products displayed</span>
            </div>
          </div>

          <div className="products-toolbar-actions">
            <div className="products-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search SKU, product, category..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            <button
              className={`products-filter-btn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters((value) => !value)}
            >
              <Filter size={17} />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="products-filter-panel">
            <div className="products-filter-group">
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

            <div className="products-filter-group">
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

            <div className="products-filter-group">
              <label>Stock Status</label>

              <select
                value={stockStatus}
                onChange={(event) => {
                  setStockStatus(event.target.value);
                  setPage(1);
                }}
              >
                <option value="ALL">ALL</option>
                <option value="IN STOCK">IN STOCK</option>
                <option value="LOW STOCK">LOW STOCK</option>
                <option value="OUT OF STOCK">OUT OF STOCK</option>
              </select>
            </div>

            <button className="products-reset-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>WAREHOUSE</th>
                <th>STOCK</th>
                <th>UNIT PRICE</th>
                <th>STOCK VALUE</th>
                <th>STATUS</th>
                <th className="products-action-col">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.length > 0 ? (
                visibleProducts.map((product) => {
                  const stockStatus = getStockStatus(product);

                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="products-name-cell">
                          <div className="products-avatar">
                            <Package size={17} />
                          </div>

                          <div>
                            <strong>{product.name}</strong>

                            <span>
                              {product.sku} · Updated {product.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="products-category-badge">
                          {product.category}
                        </span>
                      </td>

                      <td>
                        <div className="products-warehouse">
                          <Warehouse size={15} />
                          {product.warehouse}
                        </div>
                      </td>

                      <td>
                        <div className="products-stock-cell">
                          <strong>{formatNumber(product.stock)}</strong>

                          <span>{product.unit}</span>

                          <div className="products-stock-bar">
                            <div
                              className={`products-stock-progress ${statusClass(
                                stockStatus,
                              )}`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(
                                    4,
                                    (product.stock /
                                      Math.max(
                                        product.minStock * 2,
                                        product.stock,
                                      )) *
                                      100,
                                  ),
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        <strong className="products-price">
                          {formatCurrency(product.price)}
                        </strong>
                        <span className="products-unit-label">
                          / {product.unit}
                        </span>
                      </td>

                      <td>
                        <strong className="products-value">
                          {formatCurrency(product.value)}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`products-status ${statusClass(
                            stockStatus,
                          )}`}
                        >
                          {stockStatus === "IN STOCK" && (
                            <CheckCircle2 size={14} />
                          )}

                          {stockStatus === "LOW STOCK" && (
                            <ShieldAlert size={14} />
                          )}

                          {stockStatus === "OUT OF STOCK" && (
                            <Archive size={14} />
                          )}

                          {stockStatus}
                        </span>
                      </td>

                      <td>
                        <div className="products-actions">
                          <button
                            title="View Product"
                            className="products-icon-btn"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            title="Edit Product"
                            className="products-icon-btn"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button title="More" className="products-icon-btn">
                            <MoreHorizontal size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8}>
                    <div className="products-empty">
                      <Package size={34} />
                      <strong>No products found</strong>
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
        <div className="products-pagination">
          <div>
            Showing{" "}
            <strong>
              {filteredProducts.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(currentPage * pageSize, filteredProducts.length)}
            </strong>{" "}
            of <strong>{filteredProducts.length}</strong> products
          </div>

          <div className="products-page-buttons">
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
          INVENTORY QUICK ACTION
      ===================================================== */}
      <div className="products-quick-actions">
        <div>
          <span className="products-section-label">INVENTORY OPERATIONS</span>
          <h3>Quick Inventory Actions</h3>
          <p>
            Perform common warehouse transactions directly from the product
            master.
          </p>
        </div>

        <div className="products-quick-buttons">
          <button>
            <ArrowDownToLine size={17} />
            Stock In
          </button>

          <button>
            <ArrowUpToLine size={17} />
            Stock Out
          </button>

          <button>
            <Settings2 size={17} />
            Stock Adjustment
          </button>

          <button>
            <Warehouse size={17} />
            Transfer Stock
          </button>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <div className="products-footer">
        <span>Inventory & Warehouse Management</span>
        <strong>Designed by ABN</strong>
      </div>
    </div>
  );
};

export default Products;
