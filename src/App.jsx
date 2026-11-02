import React, { lazy, Suspense, useState } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import PatientManagement from './components/PatientManagement'
import './App.css'

const BillingFinance = lazy(() => import('./components/BillingFinance'))
const DoctorScheduling = lazy(() => import('./components/DoctorScheduling'))
const OperationTheatre = lazy(() => import('./components/OperationTheatre'))
const MedicalRecords = lazy(() => import('./components/MedicalRecords'))
const PrescriptionManagement = lazy(() => import('./components/PrescriptionManagement'))

const App = () => {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [hospitalStats] = useState({
    totalPatients: 1245,
    activeAdmissions: 89,
    doctorsAvailable: 34,
    operatingTheatres: 8,
    todayAppointments: 156,
    pendingBilling: '$45,320'
  })

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏥', component: Dashboard },
    { id: 'patients', name: 'Patient Management', icon: '👥', component: PatientManagement },
    { id: 'doctor-schedule', name: 'Doctor Schedule', icon: '👨‍⚕️', component: DoctorScheduling },
    { id: 'operation-theatre', name: 'Operation Theatre', icon: '🏨', component: OperationTheatre },
    { id: 'medical-records', name: 'Medical Records', icon: '📋', component: MedicalRecords },
    { id: 'billing', name: 'Billing & Finance', icon: '💰', component: BillingFinance },
    { id: 'prescriptions', name: 'Prescriptions', icon: '💊', component: PrescriptionManagement },
  ]

  const activeModuleData = modules.find(m => m.id === activeModule)
  const ActiveComponent = activeModuleData?.component

  return (
    <div className="app">
      <Navigation 
        modules={modules} 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        hospitalStats={hospitalStats}
      />
      
      <main className="main-content">
        <div className="module-header">
          <div className="header-info">
            <h1>{activeModuleData?.name}</h1>
            <p className="breadcrumb">Hospital Management System / {activeModuleData?.name}</p>
          </div>
        </div>

        <div className="module-container">
          <Suspense fallback={<div className="module-loading" role="status">Loading module...</div>}>
            {ActiveComponent && <ActiveComponent hospitalStats={hospitalStats} />}
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default App
