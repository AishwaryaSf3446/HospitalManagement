import React from 'react'
import '../styles/Navigation.css'

const Navigation = ({ modules, activeModule, onModuleChange, hospitalStats }) => {
  return (
    <div className="navigation">
      {/* Header */}
      <div className="nav-header">
        <div className="hospital-info">
          <h1>Hospital</h1>
          <p className="hospital-subtitle">Integrated Management System</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Patients</span>
          <span className="stat-value">{hospitalStats.totalPatients}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Admitted</span>
          <span className="stat-value">{hospitalStats.activeAdmissions}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Doctors</span>
          <span className="stat-value">{hospitalStats.doctorsAvailable}</span>
        </div>
        <div className="stat">
          <span className="stat-label">OTs</span>
          <span className="stat-value">{hospitalStats.operatingTheatres}</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {modules.map((module) => (
          <button
            key={module.id}
            className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
            onClick={() => onModuleChange(module.id)}
          >
            <span className="nav-icon">{module.icon}</span>
            <span className="nav-name">{module.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="nav-footer">
        <p className="footer-text">© 2024 St. Mary Hospital</p>
        <p className="footer-status">✅ System Operational</p>
      </div>
    </div>
  )
}

export default Navigation
