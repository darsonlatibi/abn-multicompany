import type { ReactNode } from "react";

import {
  Building2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldAlert,
  Truck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Contact.css";

/* =========================================================
   COMPANY CONTACT
   ========================================================= */

const COMPANY = {
  name: "PT. AGRO BERKAH NUSANTARA",

  headOffice: {
    address: "Alamat Head Office PT AGRO BERKAH NUSANTARA",
    mapsUrl: "https://www.google.com/maps?q=-7.123456,112.654321",
  },

  officePhone: {
    display: "Nomor Office",
    href: "tel:+62811447622",
  },

  email: {
    display: "sales@abn.web.id",
    href: "mailto:sales@abn.web.id",
  },

  operationalPIC: {
    name: "Operational PIC",
    position: "Operational",
    phone: "+620000000000",
  },

  fleetPIC: {
    name: "Fleet / Dispatcher PIC",
    position: "Fleet / Dispatcher",
    phone: "+620000000000",
  },

  emergency: {
    name: "Emergency Contact",
    phone: "+620000000000",
  },
};

/* =========================================================
   WHATSAPP
   ========================================================= */

const createWhatsAppUrl = (phone: string) => {
  const normalizedPhone = phone.replace(/\D/g, "");

  const message = encodeURIComponent(
    "Halo PT. ABN,\n\n" +
      "Saya membutuhkan bantuan terkait ABN Fleet.\n\n" +
      "Informasi:\n",
  );

  return `https://wa.me/${normalizedPhone}?text=${message}`;
};

/* =========================================================
   CONTACT CARD
   ========================================================= */

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  emergency?: boolean;
  external?: boolean;
}

function ContactCard({
  icon,
  title,
  value,
  description,
  actionLabel,
  actionHref,
  emergency = false,
  external = false,
}: ContactCardProps) {
  const isInternalRoute = actionHref?.startsWith("/") && !external;

  return (
    <article
      className={`contact-card ${emergency ? "contact-card-emergency" : ""}`}
    >
      <div className="contact-card-icon">{icon}</div>

      <div className="contact-card-content">
        <span className="contact-card-label">{title}</span>

        <strong className="contact-card-value">{value}</strong>

        {description && (
          <span className="contact-card-description">{description}</span>
        )}

        {actionHref && actionLabel && (
          <>
            {isInternalRoute ? (
              <Link to={actionHref} className="contact-card-action">
                {actionLabel}

                <ChevronRight size={14} strokeWidth={2} />
              </Link>
            ) : (
              <a
                href={actionHref}
                className="contact-card-action"
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {actionLabel}

                {external ? (
                  <ExternalLink size={14} strokeWidth={2} />
                ) : (
                  <ChevronRight size={14} strokeWidth={2} />
                )}
              </a>
            )}
          </>
        )}
      </div>
    </article>
  );
}

/* =========================================================
   CONTACT PAGE
   ========================================================= */

function Contact() {
  return (
    <main className="contact-page">
      <div className="contact-back-wrapper">
        <button
          type="button"
          className="contact-back-button"
          onClick={() => {
            window.location.href = "https://ems.abn.web.id/dashboard";
          }}
        >
          ← Dashboard
        </button>
      </div>
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="contact-header">
        <div className="contact-header-content">
          <span className="contact-eyebrow">
            <Building2 size={14} strokeWidth={2} />
            COMPANY CONTACT
          </span>

          <h1>Contact</h1>

          <p>
            Informasi kontak resmi PT. AGRO BERKAH NUSANTARA dan PIC operasional
            ABN Fleet.
          </p>
        </div>
      </header>

      {/* =====================================================
          COMPANY
          ===================================================== */}

      <section className="contact-section">
        <div className="contact-section-header">
          <div>
            <span className="contact-section-kicker">COMPANY</span>

            <h2 className="contact-section-title">{COMPANY.name}</h2>

            <p className="contact-section-subtitle">
              Informasi kantor dan kontak resmi perusahaan.
            </p>
          </div>

          <Building2 size={20} strokeWidth={2} />
        </div>

        <div className="contact-grid">
          <ContactCard
            icon={<MapPin size={21} strokeWidth={2} />}
            title="Head Office"
            value={COMPANY.headOffice.address}
            description="Kantor pusat ABN"
            actionLabel="Open Google Maps"
            actionHref={COMPANY.headOffice.mapsUrl}
            external
          />

          <ContactCard
            icon={<Phone size={21} strokeWidth={2} />}
            title="Office Phone"
            value={COMPANY.officePhone.display}
            description="Hubungi kantor PT. AGRO BERKAH NUSANTARA"
            actionLabel="Call Office"
            actionHref={COMPANY.officePhone.href}
          />

          <ContactCard
            icon={<Mail size={21} strokeWidth={2} />}
            title="Company Email"
            value={COMPANY.email.display}
            description="Email resmi untuk sales dan informasi perusahaan"
            actionLabel="Send Email"
            actionHref={COMPANY.email.href}
          />
        </div>
      </section>

      {/* =====================================================
          OPERATIONS
          ===================================================== */}

      <section className="contact-section">
        <div className="contact-section-header">
          <div>
            <span className="contact-section-kicker">OPERATIONS</span>

            <h2 className="contact-section-title">Operational Contacts</h2>

            <p className="contact-section-subtitle">
              PIC untuk kebutuhan operasional dan fleet.
            </p>
          </div>

          <Truck size={20} strokeWidth={2} />
        </div>

        <div className="contact-grid">
          <ContactCard
            icon={<UserRound size={21} strokeWidth={2} />}
            title="Operational PIC"
            value={COMPANY.operationalPIC.name}
            description={COMPANY.operationalPIC.position}
            actionLabel="WhatsApp"
            actionHref={createWhatsAppUrl(COMPANY.operationalPIC.phone)}
            external
          />

          <ContactCard
            icon={<Truck size={21} strokeWidth={2} />}
            title="Fleet / Dispatcher PIC"
            value={COMPANY.fleetPIC.name}
            description={COMPANY.fleetPIC.position}
            actionLabel="WhatsApp"
            actionHref={createWhatsAppUrl(COMPANY.fleetPIC.phone)}
            external
          />

          <ContactCard
            icon={<ShieldAlert size={21} strokeWidth={2} />}
            title="Emergency Contact"
            value={COMPANY.emergency.name}
            description="Kontak untuk kondisi darurat operasional"
            actionLabel="Call Emergency"
            actionHref={`tel:${COMPANY.emergency.phone}`}
            emergency
          />
        </div>
      </section>

      {/* =====================================================
          OFFICE LOCATION
          ===================================================== */}

      <section className="contact-location-card">
        <div className="contact-location-content">
          <div className="contact-location-info">
            <div className="contact-location-icon">
              <MapPin size={21} strokeWidth={2} />
            </div>

            <div className="contact-location-text">
              <span>LOCATION</span>

              <strong>Head Office</strong>

              <p>{COMPANY.headOffice.address}</p>
            </div>
          </div>

          <a
            href={COMPANY.headOffice.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-map-button"
          >
            Open Google Maps
            <ExternalLink size={15} strokeWidth={2} />
          </a>
        </div>

        <div className="contact-map">
          <div className="contact-map-placeholder">
            <MapPin size={28} strokeWidth={2} />

            <strong>Head Office Location</strong>

            <span>Buka Google Maps untuk melihat lokasi kantor ABN.</span>

            <a
              href={COMPANY.headOffice.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-button"
            >
              View Location
              <ExternalLink size={15} strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUPPORT INFORMATION
          ===================================================== */}

      <section className="contact-footer-note">
        <Clock3 size={15} strokeWidth={2} />

        <span>
          Untuk masalah sistem ABN Fleet, GPS tracker, modem, device, dan
          monitoring fleet, gunakan menu <strong>ABN Support</strong>.
        </span>

        <MessageCircle size={15} strokeWidth={2} />
      </section>
    </main>
  );
}

export default Contact;
