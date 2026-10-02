import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  Cpu,
  Gauge,
  Globe2,
  Handshake,
  Headphones,
  Map,
  MapPinned,
  MessageSquare,
  MonitorSmartphone,
  Network,
  Plug,
  RadioTower,
  Route,
  Scale,
  Server,
  Settings,
  ShieldCheck,
  Smartphone,
  Target,
  TrendingDown,
  Truck,
  Users,
  Weight,
  Workflow,
  Zap,
  BrainCircuit,
  Wrench,
  Boxes,
  CircleDollarSign,
  FileBarChart,
  MessageSquareText,
} from "lucide-react";

import "./About.css";

import logo from "../../assets/logo.png";

/* =========================================================
   ABOUT
   ABN ENTERPRISE MANAGEMENT SYSTEM
   PRODUCT OVERVIEW
   ========================================================= */

function About() {
  const version = "1.2.0";

  return (
    <div className="about-page">
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-brand">
            <div className="about-brand-mark">
              <img src={logo} alt="ABN Enterprise Management System Logo" />
            </div>

            <div>
              <span className="about-eyebrow">TIGA KAWAN JAYA</span>

              <h1>ABN Enterprise Management System</h1>

              <p>Enterprise Management · Fleet · IoT · Business Integration</p>
            </div>
          </div>

          <div className="about-status">
            <span className="about-status-dot" />

            <strong>ONLINE</strong>

            <span>Version {version}</span>
          </div>
        </div>

        <div className="about-hero-description">
          <h2>
            One Platform.
            <br />
            Complete Business Visibility.
          </h2>

          <p>
            ABN Enterprise Management System adalah platform pengelolaan
            perusahaan yang mengintegrasikan manajemen operasional, fleet, GPS,
            IoT, driver, perjalanan, geofence, alarm, reporting, weighing event,
            business workflow, dan enterprise integration melalui satu sistem
            terpusat.
          </p>
        </div>

        {/* ===================================================
            HERO TRUST POINTS
            =================================================== */}

        <div className="about-hero-points">
          <span>
            <CheckCircle2 size={16} />
            Live Fleet Monitoring
          </span>

          <span>
            <CheckCircle2 size={16} />
            GPS & IoT Ready
          </span>

          <span>
            <CheckCircle2 size={16} />
            SAP Integration Ready
          </span>

          <span>
            <CheckCircle2 size={16} />
            Perhubungan / JTO / WIM Ready
          </span>
        </div>
      </section>

      {/* =====================================================
          PRODUCT OVERVIEW
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>01</span>

          <div>
            <h2>ABN Enterprise Management System</h2>

            <p>
              Platform digital untuk pengelolaan perusahaan dan operasional
              modern.
            </p>
          </div>
        </div>

        <div className="about-overview">
          <div className="about-overview-main">
            <p>
              ABN Enterprise Management System merupakan platform modular yang
              mengintegrasikan organisasi, pengguna, operasional, kendaraan,
              driver, GPS tracker, perjalanan, inventory, reporting, perangkat,
              workflow, dan integrasi eksternal dalam satu platform.
            </p>

            <p>
              Platform tidak hanya berfungsi sebagai GPS tracking, tetapi
              dikembangkan sebagai pusat informasi perusahaan yang menghubungkan
              data manajemen, operasional, fleet, IoT, dan berbagai sistem
              eksternal.
            </p>

            <p>
              Arsitektur modular memungkinkan sistem dikembangkan secara
              bertahap, mulai dari core enterprise management dan fleet hingga
              IoT telemetry, finance, inventory, HR, procurement, SAP
              integration, weighing, dan sistem eksternal lainnya.
            </p>
          </div>

          <div className="about-overview-highlight">
            <Zap size={25} />

            <strong>Integrated Enterprise Platform</strong>

            <span>
              Ringan, responsive, modular, dan siap dikembangkan untuk kebutuhan
              manajemen, operasional, maupun enterprise.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS VALUE
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>02</span>

          <div>
            <h2>Business Value</h2>

            <p>
              ABN EMS membantu perusahaan memperoleh kontrol yang lebih baik
              terhadap operasi armada.
            </p>
          </div>
        </div>

        <div className="about-value-grid">
          <Value
            title="Fleet Visibility"
            text="Perusahaan dapat melihat kondisi dan posisi armada melalui satu dashboard terpusat."
          />

          <Value
            title="Operational Control"
            text="Aktivitas kendaraan, perjalanan, driver, perangkat, dan event operasional dapat dikelola dalam satu sistem."
          />

          <Value
            title="Data Driven"
            text="Histori perjalanan, telemetry, alarm, weighing event, dan laporan dapat digunakan sebagai dasar evaluasi."
          />

          <Value
            title="Centralized Management"
            text="Informasi fleet dan data operasional dikumpulkan dalam satu platform."
          />

          <Value
            title="Enterprise Integration"
            text="ABN EMS dapat dikembangkan untuk berkomunikasi dengan SAP dan sistem eksternal lainnya."
          />

          <Value
            title="Scalable"
            text="Sistem dapat dikembangkan mengikuti pertumbuhan armada dan kebutuhan perusahaan."
          />
        </div>
      </section>

      {/* =====================================================
          CORE FEATURES
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>03</span>

          <div>
            <h2>Enterprise Management Modules</h2>

            <p>
              Modul utama yang membentuk ekosistem ABN Enterprise Management
              System.
            </p>
          </div>
        </div>

        <div className="about-feature-grid">
          <Feature
            icon={<Building2 />}
            title="Organization Management"
            description="Kelola struktur perusahaan, unit kerja, cabang, dan organisasi dalam satu platform."
          />

          <Feature
            icon={<Users />}
            title="People & User Management"
            description="Kelola employee, user, role, dan akses sesuai struktur serta tanggung jawab organisasi."
          />

          <Feature
            icon={<Workflow />}
            title="Business Workflow"
            description="Bangun alur approval dan proses bisnis sesuai kebutuhan operasional perusahaan."
          />

          <Feature
            icon={<BarChart3 />}
            title="Executive Dashboard"
            description="Sajikan KPI dan informasi penting perusahaan dalam dashboard yang ringkas dan mudah dipantau."
          />

          <Feature
            icon={<Truck />}
            title="Fleet Management"
            description="Kelola kendaraan, identitas unit, status armada, dan informasi operasional secara terpusat."
          />

          <Feature
            icon={<MapPinned />}
            title="Live Tracking"
            description="Pantau posisi kendaraan secara realtime melalui GPS tracker yang terhubung dengan sistem."
          />

          <Feature
            icon={<Route />}
            title="Trips & Routes"
            description="Monitor perjalanan kendaraan, rute, aktivitas perjalanan, dan histori operasional."
          />

          <Feature
            icon={<Map />}
            title="Geofence"
            description="Buat area virtual untuk memonitor kendaraan ketika masuk atau keluar dari wilayah tertentu."
          />

          <Feature
            icon={<AlertTriangle />}
            title="Fleet Alerts"
            description="Kelola kejadian dan peringatan operasional yang membutuhkan perhatian pengguna."
          />

          <Feature
            icon={<Activity />}
            title="Vehicle History"
            description="Lihat histori posisi dan aktivitas kendaraan untuk kebutuhan monitoring dan evaluasi."
          />

          <Feature
            icon={<BarChart3 />}
            title="Reports & Analytics"
            description="Gunakan data fleet untuk menghasilkan laporan operasional dan insight manajemen."
          />

          <Feature
            icon={<Users />}
            title="Driver Management"
            description="Kelola driver dan hubungan driver dengan kendaraan yang digunakan."
          />

          <Feature
            icon={<Cpu />}
            title="Device Management"
            description="Kelola GPS tracker dan perangkat monitoring yang terpasang pada kendaraan."
          />

          <Feature
            icon={<MessageSquare />}
            title="Helpdesk"
            description="Sediakan jalur support untuk menangani masalah sistem, kendaraan, GPS, dan perangkat."
          />

          <Feature
            icon={<ShieldCheck />}
            title="Administration"
            description="Role-based access control membantu membatasi akses berdasarkan tanggung jawab pengguna."
          />

          <Feature
            icon={<Network />}
            title="Integration Center"
            description="Pusat integrasi untuk SAP, IoT, weighing, Perhubungan, dan sistem eksternal lainnya."
          />
        </div>
      </section>
      {/* =========================================================
    INDUSTRIAL INTELLIGENCE
    ========================================================= */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>AI</span>

          <div>
            <h2>Industrial Intelligence</h2>

            <p>
              Intelligence layer yang mengubah data operasional ABN EMS menjadi
              insight, risk detection, prediction, dan rekomendasi keputusan.
            </p>
          </div>
        </div>

        <div className="about-intelligence-grid">
          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <BrainCircuit size={18} />
            </div>

            <div>
              <h3>AI Command Center</h3>

              <p>
                Executive intelligence untuk melihat kondisi bisnis, risiko,
                anomaly, KPI, dan rekomendasi dalam satu pusat.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <Activity size={18} />
            </div>

            <div>
              <h3>AI Operations</h3>

              <p>
                Menganalisis performa operasional dan menemukan perubahan atau
                anomaly yang membutuhkan perhatian.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <Truck size={18} />
            </div>

            <div>
              <h3>AI Fleet Intelligence</h3>

              <p>
                Analisis utilisasi armada, konsumsi BBM, perilaku kendaraan, dan
                risiko operasional fleet.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <Gauge size={18} />
            </div>

            <div>
              <h3>AI SCADA Intelligence</h3>

              <p>
                Membaca kondisi process, sensor, alarm, equipment, dan
                operational pattern dari sistem SCADA.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <Wrench size={18} />
            </div>

            <div>
              <h3>AI Maintenance</h3>

              <p>
                Mengidentifikasi maintenance risk, equipment degradation, dan
                membantu menentukan prioritas preventive maintenance.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <Boxes size={18} />
            </div>

            <div>
              <h3>AI Supply Chain</h3>

              <p>
                Menganalisis inventory, procurement, supplier, stock movement,
                dan potensi supply chain risk.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <CircleDollarSign size={18} />
            </div>

            <div>
              <h3>AI Finance</h3>

              <p>
                Menganalisis cashflow, receivable, expense, margin, dan peluang
                peningkatan financial performance.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <Users size={18} />
            </div>

            <div>
              <h3>AI Workforce</h3>

              <p>
                Menganalisis workforce availability, productivity, attendance,
                workload, dan skill coverage.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <FileBarChart size={18} />
            </div>

            <div>
              <h3>AI Reports</h3>

              <p>
                Mengubah data dan laporan operasional menjadi findings, trends,
                executive summary, dan business insight.
              </p>
            </div>
          </div>

          <div className="about-intelligence-card">
            <div className="about-intelligence-icon">
              <MessageSquareText size={18} />
            </div>

            <div>
              <h3>AI Copilot</h3>

              <p>
                Natural language interface untuk bertanya langsung kepada ABN
                EMS menggunakan konteks data perusahaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PERHUBUNGAN / WEIGHING
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>04</span>

          <div>
            <h2>Perhubungan / UPPKB / JTO / WIM</h2>

            <p>
              Modul monitoring dan integration layer untuk event kendaraan dan
              weighing.
            </p>
          </div>
        </div>

        <div className="about-overview">
          <div className="about-overview-main">
            <p>
              ABN EMS dapat menyediakan interface monitoring untuk event
              kendaraan yang berkaitan dengan UPPKB, JTO, WIM, vehicle
              identification, dan weight event.
            </p>

            <p>
              Data weighing yang tersedia melalui interface resmi dapat
              dikorelasikan dengan data GPS ABN EMS berdasarkan identitas
              kendaraan, waktu, dan lokasi.
            </p>

            <p>
              Dengan pendekatan tersebut, perusahaan dapat melihat hubungan
              antara perjalanan truck dan event weighing dalam satu dashboard.
            </p>
          </div>

          <div className="about-overview-highlight">
            <Scale size={25} />

            <strong>Weight Monitoring</strong>

            <span>
              Gross weight, axle weight, JBI, difference, overload status, lane,
              timestamp, dan vehicle correlation.
            </span>
          </div>
        </div>

        <div className="about-architecture">
          <ArchitectureCard
            icon={<Truck />}
            title="Vehicle"
            items={[
              "GPS Tracker",
              "Vehicle Identity",
              "Plate Number",
              "Trip / Location",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<RadioTower />}
            title="ANPR / JTO / WIM"
            items={[
              "Vehicle Detection",
              "Weight Event",
              "Axle Data",
              "Timestamp",
              "Lane",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<Network />}
            title="ABN Integration"
            items={[
              "Event Matching",
              "Vehicle Correlation",
              "Historical Data",
              "API Integration",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<MonitorSmartphone />}
            title="Fleet Dashboard"
            items={[
              "Live Event",
              "Weight History",
              "Overload Monitoring",
              "Operational Report",
            ]}
          />
        </div>
      </section>

      {/* =====================================================
          ARCHITECTURE
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>05</span>

          <div>
            <h2>System Architecture</h2>

            <p>
              Arsitektur modular untuk kebutuhan fleet, IoT, dan enterprise
              integration.
            </p>
          </div>
        </div>

        <div className="about-architecture">
          <ArchitectureCard
            icon={<MonitorSmartphone />}
            title="Client Application"
            items={[
              "Responsive Web Interface",
              "Fleet Dashboard",
              "Live Tracking",
              "Fleet Monitoring",
              "Perhubungan Monitoring",
              "Administrative Interface",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<Server />}
            title="ABN EMS Server"
            items={[
              "Authentication",
              "Fleet Data",
              "GPS Processing",
              "Realtime Communication",
              "Business Logic",
              "Access Control",
              "Integration Layer",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<Cpu />}
            title="Tracker & Devices"
            items={[
              "GPS Position",
              "Vehicle Data",
              "Device Status",
              "Realtime Telemetry",
              "Communication",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<Network />}
            title="External Systems"
            items={[
              "SAP Integration",
              "Perhubungan / JTO",
              "WIM / Weighing",
              "External APIs",
            ]}
          />
        </div>
      </section>

      {/* =====================================================
          TRACKER ECOSYSTEM
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>06</span>

          <div>
            <h2>Fleet Tracker Ecosystem</h2>

            <p>
              ABN EMS dapat menjadi pusat monitoring untuk perangkat tracker
              yang terpasang pada kendaraan.
            </p>
          </div>
        </div>

        <div className="about-security-grid">
          <SecurityItem
            icon={<Cpu />}
            title="GPS Tracker"
            text="Perangkat tracker mengirimkan informasi posisi kendaraan ke ABN EMS System."
          />

          <SecurityItem
            icon={<MapPinned />}
            title="Realtime Position"
            text="Data posisi dapat digunakan untuk monitoring kendaraan secara realtime."
          />

          <SecurityItem
            icon={<Activity />}
            title="Vehicle Telemetry"
            text="Arsitektur dapat dikembangkan untuk menerima data tambahan dari perangkat kendaraan."
          />

          <SecurityItem
            icon={<Gauge />}
            title="Operational Metrics"
            text="Parameter seperti speed, status, dan telemetry dapat digunakan untuk analisis operasional."
          />
        </div>
      </section>

      {/* =====================================================
          ENTERPRISE INTEGRATION
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>07</span>

          <div>
            <h2>Enterprise Integration</h2>

            <p>
              ABN EMS dapat menjadi bagian dari ekosistem sistem informasi
              perusahaan.
            </p>
          </div>
        </div>

        <div className="about-security-grid">
          <SecurityItem
            icon={<Server />}
            title="SAP Integration"
            text="Arsitektur disiapkan untuk integrasi data fleet dengan SAP melalui API atau integration layer."
          />

          <SecurityItem
            icon={<Network />}
            title="Integration Gateway"
            text="ABN EMS dapat menyediakan layer untuk menghubungkan berbagai sumber data operasional."
          />

          <SecurityItem
            icon={<Route />}
            title="Data Synchronization"
            text="Data kendaraan, driver, trip, delivery, dan event dapat disinkronkan sesuai kebutuhan bisnis."
          />

          <SecurityItem
            icon={<Plug />}
            title="External API"
            text="Platform dapat dikembangkan untuk terhubung dengan sistem pihak ketiga melalui interface yang tersedia."
          />
        </div>
      </section>

      {/* =====================================================
          SECURITY
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>08</span>

          <div>
            <h2>Security & Access Control</h2>

            <p>
              Sistem dirancang dengan kontrol akses berdasarkan kebutuhan dan
              tanggung jawab pengguna.
            </p>
          </div>
        </div>

        <div className="about-security-grid">
          <SecurityItem
            icon={<ShieldCheck />}
            title="Authentication"
            text="Pengguna harus melalui proses autentikasi sebelum mengakses sistem."
          />

          <SecurityItem
            icon={<Users />}
            title="Role Based Access"
            text="Akses menu dan fitur dapat disesuaikan dengan role pengguna."
          />

          <SecurityItem
            icon={<Gauge />}
            title="Controlled Operations"
            text="Operasi fleet dapat dipisahkan berdasarkan tanggung jawab dan kewenangan."
          />
        </div>
      </section>

      {/* =====================================================
          RESPONSIVE
          ===================================================== */}

      <section className="about-section">
        <div className="about-responsive-card">
          <div className="about-responsive-icon">
            <Smartphone size={28} />
          </div>

          <div>
            <span className="about-card-label">
              DESIGNED FOR MODERN OPERATIONS
            </span>

            <h2>
              Ringan di desktop.
              <br />
              Tetap nyaman di mobile.
            </h2>

            <p>
              ABN EMS dirancang dengan responsive interface sehingga sistem
              dapat digunakan pada desktop, laptop, tablet, maupun smartphone.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY ABN FLEET
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>09</span>

          <div>
            <h2>Why ABN EMS?</h2>

            <p>
              Dibangun sebagai platform enterprise yang praktis, modern, ringan,
              modular, dan siap dikembangkan.
            </p>
          </div>
        </div>

        <div className="about-value-grid">
          <Value
            title="Simple"
            text="Interface dibuat sederhana agar pengguna dapat memahami sistem dengan cepat."
          />

          <Value
            title="Fast"
            text="Arsitektur dirancang agar dashboard tetap responsif ketika digunakan dalam aktivitas operasional."
          />

          <Value
            title="Lightweight"
            text="ABN EMS mengutamakan efisiensi sehingga sistem tetap nyaman digunakan tanpa antarmuka yang berlebihan."
          />

          <Value
            title="Modular"
            text="Fleet, tracking, device, driver, reporting, helpdesk, weighing, dan integration dapat dikembangkan secara independen."
          />

          <Value
            title="Scalable"
            text="Sistem dapat mengikuti pertumbuhan jumlah kendaraan dan kebutuhan organisasi."
          />

          <Value
            title="Integration Ready"
            text="ABN EMS dapat dikembangkan untuk terhubung dengan perangkat maupun sistem enterprise lainnya."
          />
        </div>
      </section>

      {/* =====================================================
          OPERATIONAL IMPACT
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>10</span>

          <div>
            <h2>Operational Impact</h2>

            <p>
              Fokus ABN EMS bukan hanya menampilkan GPS, tetapi membantu
              perusahaan meningkatkan kontrol operasional.
            </p>
          </div>
        </div>

        <div className="about-value-grid">
          <Value
            title="Fleet Visibility"
            text="Memberikan visibilitas terhadap posisi, perjalanan, dan aktivitas kendaraan."
          />

          <Value
            title="Faster Response"
            text="Informasi realtime dan alert membantu tim operasional merespons kejadian lebih cepat."
          />

          <Value
            title="Better Utilization"
            text="Data kendaraan dan histori perjalanan dapat digunakan untuk mengevaluasi pemanfaatan armada."
          />

          <Value
            title="Weight Compliance"
            text="Event weighing dapat digunakan untuk memonitor JBI, excess, dan potensi overload."
          />

          <Value
            title="Operational Transparency"
            text="Aktivitas fleet terdokumentasi sehingga proses monitoring dan evaluasi menjadi lebih terukur."
          />

          <Value
            title="Management Insight"
            text="Dashboard dan reporting membantu manajemen memperoleh gambaran operasional tanpa proses manual yang berlebihan."
          />
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>11</span>

          <div>
            <h2>How ABN EMS Works</h2>

            <p>
              Alur sederhana dari kendaraan sampai informasi yang diterima
              pengguna.
            </p>
          </div>
        </div>

        <div className="about-architecture">
          <ArchitectureCard
            icon={<Truck />}
            title="1. Vehicle"
            items={[
              "Vehicle Unit",
              "GPS Tracker",
              "Optional Sensors",
              "Device Power",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<Globe2 />}
            title="2. Connectivity"
            items={[
              "GPS Data",
              "Mobile Network",
              "Device Communication",
              "Realtime Transmission",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<Server />}
            title="3. ABN EMS"
            items={[
              "Data Processing",
              "GPS Processing",
              "Business Logic",
              "Data Storage",
              "Alert Processing",
              "Integration",
            ]}
          />

          <div className="about-architecture-arrow">
            <Route size={20} />
          </div>

          <ArchitectureCard
            icon={<MonitorSmartphone />}
            title="4. Customer"
            items={[
              "Dashboard",
              "Live Tracking",
              "Reports",
              "Alerts",
              "Weight Events",
              "Management Insight",
            ]}
          />
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>12</span>

          <div>
            <h2>Built for Different Fleet Operations</h2>

            <p>
              ABN EMS dapat dikembangkan untuk berbagai kebutuhan operasional
              kendaraan.
            </p>
          </div>
        </div>

        <div className="about-feature-grid">
          <Feature
            icon={<Truck />}
            title="Logistics & Distribution"
            description="Monitoring kendaraan distribusi, perjalanan, rute, dan aktivitas operasional."
          />

          <Feature
            icon={<Building2 />}
            title="Construction"
            description="Monitoring kendaraan dan equipment yang bekerja di berbagai lokasi proyek."
          />

          <Feature
            icon={<Route />}
            title="Transportation"
            description="Monitoring armada transportasi, perjalanan, driver, dan histori kendaraan."
          />

          <Feature
            icon={<Cpu />}
            title="Mining & Industrial"
            description="Arsitektur dapat dikembangkan untuk monitoring kendaraan dan telemetry operasional."
          />

          <Feature
            icon={<MapPinned />}
            title="Field Operations"
            description="Pantau unit yang bekerja di area lapangan dan lokasi operasional yang tersebar."
          />

          <Feature
            icon={<Weight />}
            title="Weight Monitoring"
            description="Pantau event weighing, gross weight, axle data, dan status overload."
          />
        </div>
      </section>

      {/* =====================================================
          CUSTOMIZATION
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>13</span>

          <div>
            <h2>Flexible Deployment & Customization</h2>

            <p>
              Setiap perusahaan memiliki proses kerja yang berbeda. ABN EMS
              dirancang agar dapat disesuaikan.
            </p>
          </div>
        </div>

        <div className="about-security-grid">
          <SecurityItem
            icon={<Settings />}
            title="Custom Workflow"
            text="Workflow operasional dapat dikembangkan mengikuti proses bisnis perusahaan."
          />

          <SecurityItem
            icon={<Plug />}
            title="System Integration"
            text="API dan integration layer dapat digunakan untuk menghubungkan ABN EMS dengan sistem lain."
          />

          <SecurityItem
            icon={<Handshake />}
            title="Enterprise Partnership"
            text="Platform dapat dikembangkan bersama kebutuhan integrasi dan digitalisasi perusahaan."
          />

          <SecurityItem
            icon={<Headphones />}
            title="Support & Development"
            text="Pengembangan sistem dapat dilakukan secara bertahap sesuai kebutuhan dan prioritas bisnis."
          />
        </div>
      </section>

      {/* =====================================================
          CUSTOMER JOURNEY
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>14</span>

          <div>
            <h2>From Installation to Fleet Intelligence</h2>

            <p>
              ABN EMS dapat dikembangkan bersama kebutuhan perusahaan dari tahap
              awal sampai skala enterprise.
            </p>
          </div>
        </div>

        <div className="about-value-grid">
          <Value
            title="01 — Fleet Setup"
            text="Daftarkan perusahaan, kendaraan, driver, user, dan perangkat tracker."
          />

          <Value
            title="02 — Device Installation"
            text="Tracker dipasang pada kendaraan dan dikonfigurasi untuk terhubung ke platform."
          />

          <Value
            title="03 — Live Monitoring"
            text="Tim operasional mulai memonitor posisi dan aktivitas kendaraan melalui dashboard."
          />

          <Value
            title="04 — Data Collection"
            text="Histori perjalanan, alert, device status, telemetry, dan event weighing mulai terkumpul."
          />

          <Value
            title="05 — Reporting"
            text="Data fleet dapat digunakan untuk reporting, evaluasi, dan analisis operasional."
          />

          <Value
            title="06 — Business Expansion"
            text="Sistem dapat dikembangkan dengan sensor, telemetry, SAP, Perhubungan, dan integrasi lainnya."
          />
        </div>
      </section>

      {/* =====================================================
          CUSTOMER EXPERIENCE
          ===================================================== */}

      <section className="about-section">
        <div className="about-section-heading">
          <span>15</span>

          <div>
            <h2>Designed Around Your Operation</h2>

            <p>
              Platform bukan sekadar dashboard GPS. Sistem dibangun untuk
              menjadi bagian dari proses operasional perusahaan.
            </p>
          </div>
        </div>

        <div className="about-responsive-card">
          <div className="about-responsive-icon">
            <Workflow size={28} />
          </div>

          <div>
            <span className="about-card-label">FLEXIBLE FLEET PLATFORM</span>

            <h2>
              Start simple.
              <br />
              Grow with your fleet.
            </h2>

            <p>
              Perusahaan dapat memulai dari kebutuhan dasar seperti fleet
              management dan GPS tracking, kemudian mengembangkan sistem menuju
              reporting, telemetry, weighing, integration, automation, dan
              enterprise workflow sesuai kebutuhan bisnis.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT POSITIONING
          ===================================================== */}

      <section className="about-section">
        <div className="about-responsive-card">
          <div className="about-responsive-icon">
            <Target size={28} />
          </div>

          <div>
            <span className="about-card-label">
              ABN FLEET MANAGEMENT PLATFORM
            </span>

            <h2>
              Built for Fleet Operations.
              <br />
              Ready for Business Growth.
            </h2>

            <p>
              ABN EMS System dikembangkan sebagai platform Fleet Management yang
              dapat digunakan sebagai pusat monitoring dan pengelolaan armada
              perusahaan. Platform dapat diperluas dari GPS tracking menuju IoT,
              weighing, SAP integration, Perhubungan integration, analytics, dan
              kebutuhan enterprise lainnya.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="about-section">
        <div className="about-cta">
          <div className="about-cta-icon">
            <TrendingDown size={30} />
          </div>

          <div className="about-cta-content">
            <span className="about-card-label">
              READY TO MODERNIZE YOUR BUSINESS?
            </span>

            <h2>
              Turn Fleet Data
              <br />
              Into Operational Control.
            </h2>

            <p>
              Bangun platform pengelolaan perusahaan yang sesuai dengan
              kebutuhan bisnis. Mulai dari core management dan fleet hingga IoT,
              analytics, workflow, dan enterprise integration.
            </p>

            <div className="about-cta-points">
              <span>
                <CheckCircle2 size={15} />
                Fleet Monitoring
              </span>

              <span>
                <CheckCircle2 size={15} />
                GPS Tracking
              </span>

              <span>
                <CheckCircle2 size={15} />
                SAP Integration
              </span>

              <span>
                <CheckCircle2 size={15} />
                JTO / WIM
              </span>
            </div>

            <div className="about-cta-note">
              <Clock3 size={15} />

              <span>
                Deployment dan pengembangan dapat disesuaikan dengan kebutuhan
                perusahaan.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   FEATURE
   ========================================================= */

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <article className="about-feature-card">
      <div className="about-feature-icon">{icon}</div>

      <div>
        <h3>{title}</h3>

        <p>{description}</p>
      </div>
    </article>
  );
}

/* =========================================================
   ARCHITECTURE CARD
   ========================================================= */

interface ArchitectureCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

function ArchitectureCard({ icon, title, items }: ArchitectureCardProps) {
  return (
    <div className="about-architecture-card">
      <div className="about-architecture-icon">{icon}</div>

      <h3>{title}</h3>

      <div className="about-architecture-items">
        {items.map((item) => (
          <span key={item}>
            <CheckCircle2 size={13} />

            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SECURITY ITEM
   ========================================================= */

interface SecurityItemProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function SecurityItem({ icon, title, text }: SecurityItemProps) {
  return (
    <article className="about-security-card">
      <div className="about-security-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </article>
  );
}

/* =========================================================
   VALUE
   ========================================================= */

interface ValueProps {
  title: string;
  text: string;
}

function Value({ title, text }: ValueProps) {
  return (
    <article className="about-value-card">
      <span className="about-value-dot" />

      <h3>{title}</h3>

      <p>{text}</p>
    </article>
  );
}

export default About;
