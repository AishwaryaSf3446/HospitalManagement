import React, { useRef, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Search, Toolbar, Selection, Edit, Sort, Filter, Resize, ExcelExport, PdfExport } from '@syncfusion/ej2-react-grids'
import { WebMcpGrid } from '@syncfusion/ej2-grids'
import '../styles/PatientManagement.css'

const generatedPatientData = (() => {
  const givenNames = ['Alex', 'Jamie', 'Morgan', 'Riley', 'Casey', 'Jordan', 'Taylor', 'Avery', 'Cameron', 'Drew']
  const familyNames = ['Adams', 'Baker', 'Clark', 'Evans', 'Foster', 'Gray', 'Hill', 'Irwin', 'Kelly', 'Lopez']
  const departments = ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'General']
  const doctors = ['Dr. Sarah Johnson', 'Dr. Michael Brown', 'Dr. Emily White', 'Dr. James Green', 'Dr. Lisa Anderson']

  return Array.from({ length: 490 }, (_, index) => {
    const recordNumber = index + 11

    return {
      PatientID: `P${String(recordNumber).padStart(3, '0')}`,
      Name: `${givenNames[index % givenNames.length]} ${familyNames[Math.floor(index / givenNames.length) % familyNames.length]}`,
      Age: 18 + (index * 7) % 73,
      Gender: index % 2 === 0 ? 'M' : 'F',
      Department: departments[index % departments.length],
      Status: index % 3 === 0 ? 'Discharged' : 'Admitted',
      AdmissionDate: new Date(Date.UTC(2024, 0, 1 + index % 366)).toISOString().slice(0, 10),
      Doctor: doctors[index % doctors.length],
      RoomNo: String(101 + index % 399),
      BillAmount: 5000 + (index * 137) % 25000
    }
  })
})()

const PatientManagement = () => {
  const gridRef = useRef(null)
  const [patientData] = useState([
    { PatientID: 'P001', Name: 'John Smith', Age: 45, Gender: 'M', Department: 'Cardiology', Status: 'Admitted', AdmissionDate: '2024-01-15', Doctor: 'Dr. Sarah Johnson', RoomNo: '301', BillAmount: 15000 },
    { PatientID: 'P002', Name: 'Mary Wilson', Age: 38, Gender: 'F', Department: 'Orthopedics', Status: 'Admitted', AdmissionDate: '2024-01-16', Doctor: 'Dr. Michael Brown', RoomNo: '205', BillAmount: 8500 },
    { PatientID: 'P003', Name: 'Robert Jones', Age: 62, Gender: 'M', Department: 'Cardiology', Status: 'Discharged', AdmissionDate: '2024-01-10', Doctor: 'Dr. Sarah Johnson', RoomNo: '310', BillAmount: 22000 },
    { PatientID: 'P004', Name: 'Jennifer Davis', Age: 29, Gender: 'F', Department: 'General', Status: 'Admitted', AdmissionDate: '2024-01-18', Doctor: 'Dr. Emily White', RoomNo: '102', BillAmount: 6500 },
    { PatientID: 'P005', Name: 'David Miller', Age: 71, Gender: 'M', Department: 'Neurology', Status: 'Admitted', AdmissionDate: '2024-01-17', Doctor: 'Dr. James Green', RoomNo: '401', BillAmount: 18000 },
    { PatientID: 'P006', Name: 'Patricia Taylor', Age: 55, Gender: 'F', Department: 'Pediatrics', Status: 'Discharged', AdmissionDate: '2024-01-12', Doctor: 'Dr. Lisa Anderson', RoomNo: '150', BillAmount: 9500 },
    { PatientID: 'P007', Name: 'Thomas Anderson', Age: 48, Gender: 'M', Department: 'General', Status: 'Admitted', AdmissionDate: '2024-01-19', Doctor: 'Dr. Emily White', RoomNo: '105', BillAmount: 7200 },
    { PatientID: 'P008', Name: 'Sandra Martinez', Age: 34, Gender: 'F', Department: 'Orthopedics', Status: 'Admitted', AdmissionDate: '2024-01-20', Doctor: 'Dr. Michael Brown', RoomNo: '210', BillAmount: 11000 },
    { PatientID: 'P009', Name: 'Charles Thompson', Age: 67, Gender: 'M', Department: 'Cardiology', Status: 'Admitted', AdmissionDate: '2024-01-21', Doctor: 'Dr. Sarah Johnson', RoomNo: '305', BillAmount: 19500 },
    { PatientID: 'P010', Name: 'Linda White', Age: 42, Gender: 'F', Department: 'General', Status: 'Discharged', AdmissionDate: '2024-01-14', Doctor: 'Dr. Emily White', RoomNo: '110', BillAmount: 8000 },
    ...generatedPatientData
  ])

  return (
    <div className="patient-management">
      <div className="section-intro">
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="stat-label">Total Records</span>
            <span className="stat-number">{patientData.length}</span>
          </div>
          <div className="quick-stat">
            <span className="stat-label">Currently Admitted</span>
            <span className="stat-number">
              {patientData.filter((p) => p.Status === "Admitted").length}
            </span>
          </div>
          <div className="quick-stat">
            <span className="stat-label">Pending Bills</span>
            <span className="stat-number">
              $
              {patientData
                .reduce((sum, p) => sum + p.BillAmount, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid-container">
        <GridComponent
          ref={gridRef}
          dataSource={patientData}
          enableWebMcp={true}
          height="300px"
          webMcpSettings={{
            name: "patientGrid",
            exposedTo: [window.location.origin],
          }}
          allowPaging={true}
          allowSorting={true}
          allowFiltering={true}
          allowExcelExport={true}
          allowPdfExport={true}
          filterSettings={{ type: "CheckBox" }}
          toolbar={["Search", "ExcelExport", "PdfExport"]}
          toolbarClick={(args) => {
            if (args.item.id === `${gridRef.current.element.id}_excelexport`) {
              gridRef.current.excelExport()
            } else if (args.item.id === `${gridRef.current.element.id}_pdfexport`) {
              gridRef.current.pdfExport({ pageSize: 'A4', pageOrientation: 'Landscape' })
            }
          }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="PatientID"
              headerText="Patient ID"
              width="100"
            />
            <ColumnDirective
              field="Name"
              headerText="Patient Name"
              width="150"
            />
            <ColumnDirective
              field="Age"
              headerText="Age"
              width="80"
              type="number"
            />
            <ColumnDirective field="Gender" headerText="Gender" width="90" />
            <ColumnDirective
              field="Department"
              headerText="Department"
              width="130"
            />
            <ColumnDirective
              field="Status"
              headerText="Status"
              width="120"
            />
            <ColumnDirective
              field="Doctor"
              headerText="Assigned Doctor"
              width="160"
            />
            <ColumnDirective field="RoomNo" headerText="Room" width="80" />
            <ColumnDirective
              field="AdmissionDate"
              headerText="Admission Date"
              width="130"
              type="date"
              format="yMd"
            />
            <ColumnDirective
              field="BillAmount"
              headerText="Bill Amount"
              width="120"
              type="number"
              format="C0"
            />
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Search,
              Toolbar,
              Selection,
              Edit,
              Sort,
              Filter,
              Resize,
              ExcelExport,
              PdfExport,
              WebMcpGrid,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
}

export default PatientManagement
