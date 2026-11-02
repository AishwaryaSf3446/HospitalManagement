import React, { useState } from 'react'
import {
  GanttComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Edit,
  Filter,
  Resize,
  Selection,
  Sort,
  Toolbar
} from '@syncfusion/ej2-react-gantt'
import { WebMcpGantt } from '@syncfusion/ej2-gantt'
import '../styles/Modules.css'
import './OperationTheatre.css'

const priorityTemplate = (task) => {
  const priority = task.Priority || 'Not set'
  return (
    <span className={`surgery-priority surgery-priority-${priority.toLowerCase()}`}>
      {priority}
    </span>
  )
}

const OperationTheatre = () => {
  const [surgeryData] = useState(() => {
    const today = new Date()
    today.setHours(8, 0, 0, 0)
    const dateFor = (dayOffset) => {
      const date = new Date(today)
      date.setDate(date.getDate() + dayOffset)
      return date
    }

    return [
      {
        TaskID: 1,
        TaskName: 'Operating Theatre 1',
        Theatre: 'OT 1',
        StartDate: dateFor(0),
        Duration: 3,
        Progress: 0,
        Subtasks: [
          {
            TaskID: 2,
            TaskName: 'Emergency appendectomy',
            Theatre: 'OT 1',
            StartDate: dateFor(0),
            Duration: 1,
            Progress: 35,
            Priority: 'Emergency',
            Surgeon: 'Dr. Maya Patel',
            Anaesthetist: 'Dr. Ethan Lee',
            NursingTeam: 'Nurse Ava Brooks, Nurse Liam Fox',
            Equipment: 'Laparoscopy set',
            EquipmentStatus: 'Ready'
          },
          {
            TaskID: 3,
            TaskName: 'Knee replacement',
            Theatre: 'OT 1',
            StartDate: dateFor(2),
            Duration: 1,
            Progress: 0,
            Priority: 'Routine',
            Surgeon: 'Dr. Priya Shah',
            Anaesthetist: 'Dr. Lucas Martin',
            NursingTeam: 'Nurse Grace Hall, Nurse Owen Reed',
            Equipment: 'Orthopedic instrument set',
            EquipmentStatus: 'Ready'
          }
        ]
      },
      {
        TaskID: 4,
        TaskName: 'Operating Theatre 2',
        Theatre: 'OT 2',
        StartDate: dateFor(1),
        Duration: 2,
        Progress: 0,
        Subtasks: [
          {
            TaskID: 5,
            TaskName: 'Cardiac bypass',
            Theatre: 'OT 2',
            StartDate: dateFor(1),
            Duration: 2,
            Progress: 0,
            Priority: 'High',
            Surgeon: 'Dr. Sofia Chen',
            Anaesthetist: 'Dr. Noah Williams',
            NursingTeam: 'Nurse Isla Kim, Nurse Mateo Diaz',
            Equipment: 'Heart-lung machine',
            EquipmentStatus: 'Reserved'
          }
        ]
      },
      {
        TaskID: 6,
        TaskName: 'Operating Theatre 3',
        Theatre: 'OT 3',
        StartDate: dateFor(4),
        Duration: 2,
        Progress: 0,
        Subtasks: [
          {
            TaskID: 7,
            TaskName: 'Tumor resection',
            Theatre: 'OT 3',
            StartDate: dateFor(4),
            Duration: 2,
            Progress: 0,
            Priority: 'High',
            Surgeon: 'Dr. Maya Patel',
            Anaesthetist: 'Dr. Noah Williams',
            NursingTeam: 'Nurse Zara Patel, Nurse Eli Scott',
            Equipment: 'Neurosurgery navigation system',
            EquipmentStatus: 'Maintenance check'
          }
        ]
      }
    ]
  })

  const taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    child: 'Subtasks'
  }
  const surgeryTasks = surgeryData.flatMap((theatre) => theatre.Subtasks)

  return (
    <div className="operation-theatre">
      <section className="theatre-intro" aria-labelledby="theatre-heading">
        <div>
          <h2 id="theatre-heading">Operation Theatre Schedule</h2>
          <p>
            Plan surgeries across theatres, track duration and progress, and coordinate
            surgeons, anaesthetists, nursing teams, and equipment availability.
          </p>
        </div>
        <div className="theatre-summary" aria-label="Schedule summary">
          <div>
            <strong>{surgeryTasks.length}</strong>
            <span>Scheduled cases</span>
          </div>
          <div>
            <strong>{surgeryTasks.filter((task) => task.Priority === 'Emergency').length}</strong>
            <span>Emergency priority</span>
          </div>
          <div>
            <strong>{surgeryTasks.filter((task) => task.EquipmentStatus === 'Ready').length}</strong>
            <span>Equipment ready</span>
          </div>
        </div>
      </section>

      <section className="theatre-schedule" aria-label="Interactive surgery Gantt chart">
        <GanttComponent
          dataSource={surgeryData}
          enableWebMcp={true}
          webMcpSettings={{
            name: 'operationTheatreGantt',
            exposedTo: [window.location.origin]
          }}
          taskFields={taskFields}
          height="400px"
          rowHeight={42}
          taskbarHeight={24}
          treeColumnIndex={1}
          allowSelection={true}
          allowSorting={true}
          allowFiltering={true}
          allowResizing={true}
          editSettings={{
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            mode: 'Dialog'
          }}
          toolbar={[
            'Add',
            'Edit',
            'Update',
            'Delete',
            'Cancel',
            'Search',
            'ExpandAll',
            'CollapseAll',
            'ZoomIn',
            'ZoomOut',
            'ZoomToFit'
          ]}
        >
          <ColumnsDirective>
            <ColumnDirective field="TaskID" headerText="ID" width="70" />
            <ColumnDirective field="TaskName" headerText="Surgery / Theatre" width="210" />
            <ColumnDirective field="Theatre" headerText="Theatre" width="90" />
            <ColumnDirective field="Surgeon" headerText="Surgeon" width="145" />
            <ColumnDirective field="Anaesthetist" headerText="Anaesthetist" width="155" />
            <ColumnDirective field="NursingTeam" headerText="Nursing team" width="190" />
            <ColumnDirective
              field="Priority"
              headerText="Priority"
              width="110"
              template={priorityTemplate}
            />
            <ColumnDirective field="Equipment" headerText="Equipment" width="200" />
            <ColumnDirective field="EquipmentStatus" headerText="Equipment status" width="155" />
            <ColumnDirective field="StartDate" headerText="Start date" width="130" format="MMM d, y" />
            <ColumnDirective field="Duration" headerText="Duration (days)" width="130" />
            <ColumnDirective field="Progress" headerText="Progress (%)" width="120" />
          </ColumnsDirective>
          <Inject services={[Edit, Filter, Resize, Selection, Sort, Toolbar, WebMcpGantt]} />
        </GanttComponent>
      </section>
    </div>
  )
}

export default OperationTheatre
