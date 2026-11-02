import React, { useCallback, useRef } from 'react'
import {
  Agenda,
  Day,
  Inject,
  Month,
  ScheduleComponent,
  Week,
  WorkWeek
} from '@syncfusion/ej2-react-schedule'
import { WebMcpScheduler } from '@syncfusion/ej2-schedule'
import '../styles/Modules.css'
import './DoctorScheduling.css'

const doctors = [
  { Id: 1, Text: 'Dr. Maya Chen · Cardiology', Color: '#0f766e' },
  { Id: 2, Text: 'Dr. Daniel Brooks · Neurology', Color: '#2563eb' },
  { Id: 3, Text: 'Dr. Priya Patel · Pediatrics', Color: '#c2410c' }
]

const scheduleWeekStart = new Date()
scheduleWeekStart.setDate(
  scheduleWeekStart.getDate() - ((scheduleWeekStart.getDay() + 6) % 7)
)
scheduleWeekStart.setHours(0, 0, 0, 0)

const getAppointmentTime = (dayOffset, hour, minute = 0) => {
  const date = new Date(scheduleWeekStart)
  date.setDate(date.getDate() + dayOffset)
  date.setHours(hour, minute, 0, 0)
  return date
}

const appointments = [
  {
    Id: 1,
    Subject: 'Cardiology follow-up · Jordan Taylor',
    StartTime: getAppointmentTime(0, 9),
    EndTime: getAppointmentTime(0, 9, 45),
    DoctorId: 1
  },
  {
    Id: 2,
    Subject: 'ECG review · Morgan Lee',
    StartTime: getAppointmentTime(0, 11),
    EndTime: getAppointmentTime(0, 11, 30),
    DoctorId: 1
  },
  {
    Id: 3,
    Subject: 'Neurology consultation · Alex Rivera',
    StartTime: getAppointmentTime(0, 10),
    EndTime: getAppointmentTime(0, 11),
    DoctorId: 2
  },
  {
    Id: 4,
    Subject: 'Pediatric wellness visit · Sam Wilson',
    StartTime: getAppointmentTime(1, 9, 30),
    EndTime: getAppointmentTime(1, 10, 15),
    DoctorId: 3
  },
  {
    Id: 5,
    Subject: 'Care plan review · Jamie Park',
    StartTime: getAppointmentTime(2, 14),
    EndTime: getAppointmentTime(2, 14, 45),
    DoctorId: 2
  },
  {
    Id: 6,
    Subject: 'Cardiology consultation · Avery Johnson',
    StartTime: getAppointmentTime(3, 13),
    EndTime: getAppointmentTime(3, 14),
    DoctorId: 1
  }
]

const DoctorScheduling = () => {
  const scheduleRef = useRef(null)
  const setScheduleRef = useCallback(instance => {
    if (instance) {
      scheduleRef.current = instance
    }
  }, [])

  const handleScheduleDestroyed = () => {
    const moduleLoader = scheduleRef.current?.moduleLoader
    if (moduleLoader?.loadedModules) {
      // Schedule destroys this adapter before the generic module loader cleans its entries.
      moduleLoader.loadedModules = moduleLoader.loadedModules.filter(
        module => module.member !== 'webMcpSchedulerModule'
      )
    }
  }

  return (
    <div className="doctor-scheduling">
      <section className="schedule-overview" aria-labelledby="schedule-heading">
        <div>
          <h2 id="schedule-heading">Doctor appointments</h2>
          <p>Review and manage availability across the care team.</p>
        </div>
        <div className="schedule-overview-stats">
          <span><strong>{doctors.length}</strong> doctors</span>
          <span><strong>{appointments.length}</strong> scheduled appointments</span>
        </div>
      </section>

      <section className="doctor-calendar" aria-label="Doctor appointment calendar">
        <ScheduleComponent
          ref={setScheduleRef}
          width="100%"
          enableWebMcp={true}
          webMcpSettings={{
            name: 'doctorSchedule',
            exposedTo: [window.location.origin]
          }}
          destroyed={handleScheduleDestroyed}
          selectedDate={scheduleWeekStart}
          currentView="WorkWeek"
          workHours={{ start: '08:00', end: '18:00' }}
          timeScale={{ enable: true, interval: 60, slotCount: 2 }}
          showWeekend={false}
          allowDragAndDrop={true}
          allowResizing={true}
          height={500}
          allowMultiCellSelection={true}
          group={{ resources: ['Doctors'] }}
          eventSettings={{ dataSource: appointments }}
          resources={[
            {
              field: 'DoctorId',
              title: 'Care team',
              name: 'Doctors',
              allowMultiple: false,
              dataSource: doctors,
              textField: 'Text',
              idField: 'Id',
              colorField: 'Color'
            }
          ]}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda, WebMcpScheduler]} />
        </ScheduleComponent>
      </section>
    </div>
  )
}

export default DoctorScheduling
