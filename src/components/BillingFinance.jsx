import React, { useMemo } from 'react'
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview'
import { PivotView, WebMcpPivotView } from '@syncfusion/ej2-pivotview'
import '../styles/Modules.css'
import './BillingFinance.css'

PivotView.Inject(WebMcpPivotView)

const invoices = [
  { InvoiceId: 'INV-2401', Department: 'Cardiology', Service: 'Consultation', PaymentStatus: 'Paid', Payer: 'Blue Cross', BilledAmount: 420, PaidAmount: 420, Balance: 0 },
  { InvoiceId: 'INV-2402', Department: 'Cardiology', Service: 'Diagnostic imaging', PaymentStatus: 'Partial', Payer: 'Aetna', BilledAmount: 1250, PaidAmount: 800, Balance: 450 },
  { InvoiceId: 'INV-2403', Department: 'Cardiology', Service: 'Laboratory', PaymentStatus: 'Pending', Payer: 'Medicare', BilledAmount: 360, PaidAmount: 0, Balance: 360 },
  { InvoiceId: 'INV-2404', Department: 'Orthopedics', Service: 'Consultation', PaymentStatus: 'Paid', Payer: 'UnitedHealthcare', BilledAmount: 510, PaidAmount: 510, Balance: 0 },
  { InvoiceId: 'INV-2405', Department: 'Orthopedics', Service: 'Procedure', PaymentStatus: 'Partial', Payer: 'Blue Cross', BilledAmount: 2850, PaidAmount: 1900, Balance: 950 },
  { InvoiceId: 'INV-2406', Department: 'Orthopedics', Service: 'Diagnostic imaging', PaymentStatus: 'Pending', Payer: 'Aetna', BilledAmount: 740, PaidAmount: 0, Balance: 740 },
  { InvoiceId: 'INV-2407', Department: 'Neurology', Service: 'Consultation', PaymentStatus: 'Paid', Payer: 'Medicare', BilledAmount: 390, PaidAmount: 390, Balance: 0 },
  { InvoiceId: 'INV-2408', Department: 'Neurology', Service: 'Laboratory', PaymentStatus: 'Partial', Payer: 'UnitedHealthcare', BilledAmount: 680, PaidAmount: 400, Balance: 280 },
  { InvoiceId: 'INV-2409', Department: 'Neurology', Service: 'Diagnostic imaging', PaymentStatus: 'Pending', Payer: 'Blue Cross', BilledAmount: 1420, PaidAmount: 0, Balance: 1420 },
  { InvoiceId: 'INV-2410', Department: 'Pediatrics', Service: 'Consultation', PaymentStatus: 'Paid', Payer: 'Aetna', BilledAmount: 260, PaidAmount: 260, Balance: 0 },
  { InvoiceId: 'INV-2411', Department: 'Pediatrics', Service: 'Laboratory', PaymentStatus: 'Partial', Payer: 'Medicare', BilledAmount: 430, PaidAmount: 250, Balance: 180 },
  { InvoiceId: 'INV-2412', Department: 'Pediatrics', Service: 'Procedure', PaymentStatus: 'Pending', Payer: 'UnitedHealthcare', BilledAmount: 980, PaidAmount: 0, Balance: 980 }
]

const totalBilled = invoices.reduce((total, invoice) => total + invoice.BilledAmount, 0)
const totalCollected = invoices.reduce((total, invoice) => total + invoice.PaidAmount, 0)
const outstandingBalance = invoices.reduce((total, invoice) => total + invoice.Balance, 0)

const formatCurrency = amount =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount)

const BillingFinance = () => {
  const dataSourceSettings = useMemo(() => ({
    dataSource: invoices,
    expandAll: true,
    rows: [{ name: 'Department' }, { name: 'Service' }],
    columns: [{ name: 'PaymentStatus', caption: 'Payment status' }],
    values: [
      { name: 'BilledAmount', caption: 'Billed' },
      { name: 'PaidAmount', caption: 'Collected' },
      { name: 'Balance', caption: 'Outstanding' }
    ],
    formatSettings: [
      { name: 'BilledAmount', format: 'C0' },
      { name: 'PaidAmount', format: 'C0' },
      { name: 'Balance', format: 'C0' }
    ]
  }), [])

  return (
    <div className="billing-finance">
      <section className="billing-intro" aria-labelledby="billing-heading">
        <div>
          <h2 id="billing-heading">Revenue and payment analysis</h2>
          <p>Explore sample invoice totals by department, service, payer, and payment status.</p>
        </div>
        <span className="billing-data-note">Demonstration data · 12 invoices</span>
      </section>

      <section className="billing-summary" aria-label="Billing summary">
        <article>
          <span>Total billed</span>
          <strong>{formatCurrency(totalBilled)}</strong>
        </article>
        <article>
          <span>Collected</span>
          <strong>{formatCurrency(totalCollected)}</strong>
        </article>
        <article>
          <span>Outstanding</span>
          <strong>{formatCurrency(outstandingBalance)}</strong>
        </article>
      </section>

      <section className="billing-pivot" aria-label="Invoice pivot table">
        <PivotViewComponent
          id="BillingPivotView"
          dataSourceSettings={dataSourceSettings}
          width="100%"
          height="400px"
          enableWebMcp={true}
          webMcpSettings={{
            name: 'billingPivot',
            exposedTo: [window.location.origin]
          }}
        />
      </section>
    </div>
  )
}

export default BillingFinance
