import React, { useState } from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, AxesDirective, AxisDirective, Inject, ColumnSeries, BarSeries, LineSeries, Category, Legend, Tooltip } from '@syncfusion/ej2-react-charts'
import { WebMcpChart } from '@syncfusion/ej2-charts'
import '../styles/Dashboard.css'

const Dashboard = ({ hospitalStats }) => {
  const [chartData] = useState([
    { month: 'Jan', patients: 120, revenue: 45000, surgeries: 15 },
    { month: 'Feb', patients: 135, revenue: 52000, surgeries: 18 },
    { month: 'Mar', patients: 148, revenue: 58000, surgeries: 22 },
    { month: 'Apr', patients: 162, revenue: 65000, surgeries: 25 },
    { month: 'May', patients: 176, revenue: 72000, surgeries: 28 },
    { month: 'Jun', patients: 185, revenue: 78000, surgeries: 31 },
  ])

  const [departmentData] = useState([
    { dept: 'Cardiology', patients: 245, doctors: 12, revenue: 125000 },
    { dept: 'Orthopedics', patients: 198, doctors: 8, revenue: 98000 },
    { dept: 'Neurology', patients: 167, doctors: 10, revenue: 85000 },
    { dept: 'Pediatrics', patients: 212, doctors: 9, revenue: 95000 },
    { dept: 'General', patients: 423, doctors: 15, revenue: 165000 },
  ])

  return (
    <div className="dashboard">
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">👥</div>
          <div className="kpi-content">
            <p className="kpi-label">Total Patients</p>
            <p className="kpi-value">{hospitalStats.totalPatients}</p>
            <p className="kpi-subtext">↑ 12% this month</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">🏨</div>
          <div className="kpi-content">
            <p className="kpi-label">Currently Admitted</p>
            <p className="kpi-value">{hospitalStats.activeAdmissions}</p>
            <p className="kpi-subtext">↑ 5% occupancy</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">👨‍⚕️</div>
          <div className="kpi-content">
            <p className="kpi-label">Doctors Available</p>
            <p className="kpi-value">{hospitalStats.doctorsAvailable}</p>
            <p className="kpi-subtext">32 consultants, 2 interns</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">💰</div>
          <div className="kpi-content">
            <p className="kpi-label">Revenue This Month</p>
            <p className="kpi-value">$287K</p>
            <p className="kpi-subtext">↑ 8% vs last month</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">📅</div>
          <div className="kpi-content">
            <p className="kpi-label">Today's Appointments</p>
            <p className="kpi-value">{hospitalStats.todayAppointments}</p>
            <p className="kpi-subtext">142 completed, 14 pending</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">🏨</div>
          <div className="kpi-content">
            <p className="kpi-label">Operating Theatres</p>
            <p className="kpi-value">{hospitalStats.operatingTheatres}/8</p>
            <p className="kpi-subtext">85% utilization</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Monthly Performance</h3>
          <div className="chart-container">
            <ChartComponent
              width='100%'
              enableWebMcp={true}
              webMcpSettings={{
                name: 'monthlyPerformance',
                exposedTo: [window.location.origin]
              }}
              primaryXAxis={{ valueType: 'Category' }}
            >
              <AxesDirective>
                <AxisDirective
                  name='revenueAxis'
                  opposedPosition={true}
                  minimum={0}
                  maximum={80000}
                  interval={10000}
                  labelFormat='c0'
                />
              </AxesDirective>
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={chartData}
                  xName='month'
                  yName='patients'
                  name='Patients'
                  type='Column'
                  columnWidth={0.4}
                  cornerRadius={5}
                />
                <SeriesDirective
                  dataSource={chartData}
                  xName='month'
                  yName='revenue'
                  name='Revenue ($)'
                  type='Line'
                  yAxisName='revenueAxis'
                  marker={{ visible: true }}
                />
              </SeriesCollectionDirective>
              <Inject services={[ColumnSeries, LineSeries, Category, Legend, Tooltip, WebMcpChart]} />
            </ChartComponent>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
