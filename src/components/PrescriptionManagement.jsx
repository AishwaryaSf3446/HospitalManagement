import React from 'react'
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet'
import { Spreadsheet, WebMcpSpreadsheet } from '@syncfusion/ej2-spreadsheet'
import '../styles/Modules.css'
import './PrescriptionManagement.css'

Spreadsheet.Inject(WebMcpSpreadsheet)

const headerStyle = {
  backgroundColor: '#f2f4f7',
  color: '#344054',
  fontWeight: 'bold',
  verticalAlign: 'middle'
}

const prescriptionRows = [
  {
    height: 34,
    cells: [
      { value: 'Prescription ID', style: headerStyle },
      { value: 'Patient ID', style: headerStyle },
      { value: 'Medication (sample)', style: headerStyle },
      { value: 'Dose (mg)', style: headerStyle },
      { value: 'Units / dose', style: headerStyle },
      { value: 'Doses / day', style: headerStyle },
      { value: 'Duration (days)', style: headerStyle },
      { value: 'Total units', style: headerStyle },
      { value: 'Refills', style: headerStyle },
      { value: 'Status', style: headerStyle }
    ]
  },
  {
    cells: [
      { value: 'RX-3101' },
      { value: 'PAT-204' },
      { value: 'Sample medication A' },
      { value: 10 },
      { value: 1 },
      { value: 2 },
      { value: 14 },
      { formula: '=E2*F2*G2', format: '0' },
      { value: 1 },
      { value: 'Active' }
    ]
  },
  {
    cells: [
      { value: 'RX-3102' },
      { value: 'PAT-318' },
      { value: 'Sample medication B' },
      { value: 25 },
      { value: 1 },
      { value: 1 },
      { value: 30 },
      { formula: '=E3*F3*G3', format: '0' },
      { value: 0 },
      { value: 'Refill due' }
    ]
  },
  {
    cells: [
      { value: 'RX-3103' },
      { value: 'PAT-426' },
      { value: 'Sample medication C' },
      { value: 5 },
      { value: 2 },
      { value: 2 },
      { value: 7 },
      { formula: '=E4*F4*G4', format: '0' },
      { value: 2 },
      { value: 'Active' }
    ]
  }
]

const PrescriptionManagement = () => (
  <div className="prescription-management">
    <section className="prescription-intro" aria-labelledby="prescription-heading">
      <div>
        <h2 id="prescription-heading">Prescription worksheet</h2>
        <p>
          Edit the sample medication schedule and use the Total units formulas
          to calculate quantities from dose frequency and duration.
        </p>
      </div>
      <span className="prescription-data-note">
        Demonstration data · Not for clinical use
      </span>
    </section>

    <section className="prescription-workbook" aria-label="Prescription spreadsheet">
      <SpreadsheetComponent
        id="PrescriptionSpreadsheet"
        height="450px"
        enableWebMcp={true}
        webMcpSettings={{
          name: 'prescriptionSpreadsheet',
          exposedTo: [window.location.origin]
        }}
        allowOpen={false}
        allowSave={false}
        showFormulaBar={true}
        showSheetTabs={true}
        sheets={[
          {
            name: 'Prescription Log',
            rowCount: 30,
            colCount: 10,
            frozenRows: 1,
            rows: prescriptionRows,
            columns: [
              { width: 130 },
              { width: 110 },
              { width: 190 },
              { width: 95 },
              { width: 105 },
              { width: 105 },
              { width: 130 },
              { width: 105 },
              { width: 80 },
              { width: 110 }
            ]
          }
        ]}
      />
    </section>
  </div>
)

export default PrescriptionManagement
