import { useState } from "react";
import {
  Building2,
  User,
  Bell,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Shield,
} from "lucide-react";

import { academySettings } from "../data/academyData";

function Settings() {
  const [settings, setSettings] = useState(academySettings);

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleToggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <main className="settings-page">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="settings-page-header">

        <div>
          <h1>Settings</h1>

          <p>
            Manage your academy information and system preferences.
          </p>
        </div>

        {saved && (
          <div className="settings-saved-message">
            <Shield size={16} />
            Settings saved successfully
          </div>
        )}

      </div>


      <form onSubmit={handleSubmit}>

        {/* =====================================
            ACADEMY INFORMATION
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-section-icon">
              <Building2 size={20} />
            </div>

            <div>
              <h2>Academy Information</h2>

              <p>
                Basic information about your football academy.
              </p>
            </div>

          </div>


          <div className="settings-form-grid">

            <div className="form-group">

              <label>Academy Name</label>

              <div className="settings-input">

                <Building2 size={17} />

                <input
                  type="text"
                  name="academyName"
                  value={settings.academyName}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Location</label>

              <div className="settings-input">

                <MapPin size={17} />

                <input
                  type="text"
                  name="location"
                  value={settings.location}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Phone</label>

              <div className="settings-input">

                <Phone size={17} />

                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Email</label>

              <div className="settings-input">

                <Mail size={17} />

                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group settings-full-width">

              <label>Website</label>

              <div className="settings-input">

                <Globe size={17} />

                <input
                  type="text"
                  name="website"
                  value={settings.website}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            ADMINISTRATOR
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-section-icon">
              <User size={20} />
            </div>

            <div>
              <h2>Administrator</h2>

              <p>
                Manage the primary administrator information.
              </p>
            </div>

          </div>


          <div className="settings-form-grid">

            <div className="form-group">

              <label>Administrator Name</label>

              <div className="settings-input">

                <User size={17} />

                <input
                  type="text"
                  name="adminName"
                  value={settings.adminName}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Administrator Email</label>

              <div className="settings-input">

                <Mail size={17} />

                <input
                  type="email"
                  name="adminEmail"
                  value={settings.adminEmail}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Role</label>

              <div className="settings-input">

                <Shield size={17} />

                <input
                  type="text"
                  name="role"
                  value={settings.role}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            TRAINING PREFERENCES
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-section-icon">
              <Building2 size={20} />
            </div>

            <div>
              <h2>Training Preferences</h2>

              <p>
                Set the default training configuration.
              </p>
            </div>

          </div>


          <div className="settings-form-grid">

            <div className="form-group">

              <label>Default Team</label>

              <select
                name="defaultTeam"
                value={settings.defaultTeam}
                onChange={handleChange}
                className="settings-select"
              >
                <option value="Senior">
                  Senior
                </option>

                <option value="U17">
                  U17
                </option>

                <option value="U15">
                  U15
                </option>

                <option value="U13">
                  U13
                </option>
              </select>

            </div>


            <div className="form-group">

              <label>Default Training Location</label>

              <select
                name="trainingLocation"
                value={settings.trainingLocation}
                onChange={handleChange}
                className="settings-select"
              >
                <option value="UNN Franco Pitch">
                  UNN Franco Pitch
                </option>

                <option value="Nsukka Township Stadium">
                  Nsukka Township Stadium
                </option>

                <option value="Academy Training Ground">
                  Academy Training Ground
                </option>
              </select>

            </div>

          </div>

        </section>


        {/* =====================================
            NOTIFICATIONS
        ====================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-section-icon">
              <Bell size={20} />
            </div>

            <div>
              <h2>Notifications</h2>

              <p>
                Choose which academy notifications you receive.
              </p>
            </div>

          </div>


          <div className="notification-settings">

            <div className="notification-setting">

              <div>

                <strong>
                  Training Reminders
                </strong>

                <span>
                  Receive reminders about upcoming training sessions.
                </span>

              </div>

              <button
                type="button"
                className={`toggle-button ${
                  settings.trainingReminders
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleToggle("trainingReminders")
                }
              >
                <span></span>
              </button>

            </div>


            <div className="notification-setting">

              <div>

                <strong>
                  Match Reminders
                </strong>

                <span>
                  Receive reminders about upcoming matches.
                </span>

              </div>

              <button
                type="button"
                className={`toggle-button ${
                  settings.matchReminders
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleToggle("matchReminders")
                }
              >
                <span></span>
              </button>

            </div>


            <div className="notification-setting">

              <div>

                <strong>
                  Attendance Alerts
                </strong>

                <span>
                  Receive alerts when attendance requires attention.
                </span>

              </div>

              <button
                type="button"
                className={`toggle-button ${
                  settings.attendanceAlerts
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleToggle("attendanceAlerts")
                }
              >
                <span></span>
              </button>

            </div>

          </div>

        </section>


        {/* =====================================
            SAVE
        ====================================== */}

        <div className="settings-footer">

          <button
            type="submit"
            className="primary-button"
          >
            <Save size={17} />
            Save Settings
          </button>

        </div>

      </form>

    </main>
  );
}

export default Settings;