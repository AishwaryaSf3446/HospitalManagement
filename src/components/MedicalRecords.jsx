import React, { useCallback, useRef, useState } from 'react'
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  Count,
  RichTextEditorComponent,
  Toolbar
} from '@syncfusion/ej2-react-richtexteditor'
import { WebMcpRichTextEditor } from '@syncfusion/ej2-richtexteditor'
import '../styles/Modules.css'
import './MedicalRecords.css'

const initialClinicalNote = `
  <h2>Outpatient Clinical Note</h2>
  <p><strong>Patient:</strong> Jordan Taylor &nbsp; <strong>Record:</strong> MR-10482</p>
  <p><strong>Encounter date:</strong> October 30, 2026 &nbsp; <strong>Department:</strong> Cardiology</p>
  <hr>
  <h3>Presenting concern</h3>
  <p>Intermittent chest discomfort during exertion over the past week. No pain at rest reported.</p>
  <h3>Assessment</h3>
  <p>Patient is alert and comfortable at rest. Review observations, investigations, and relevant history before finalizing the assessment.</p>
  <h3>Plan</h3>
  <ul>
    <li>Document requested investigations and follow-up.</li>
    <li>Record medication and care instructions after clinician review.</li>
    <li>Arrange follow-up with the cardiology team.</li>
  </ul>
`

const toolbarSettings = {
  items: [
    'Undo',
    'Redo',
    '|',
    'Bold',
    'Italic',
    'Underline',
    'StrikeThrough',
    '|',
    'FontName',
    'FontSize',
    'FontColor',
    'BackgroundColor',
    '|',
    'Formats',
    'Alignments',
    'OrderedList',
    'UnorderedList',
    '|',
    'CreateLink',
    'Image',
    '|',
    'ClearFormat',
    'SourceCode',
    'FullScreen'
  ]
}

const getInitialNote = () => {
  try {
    return localStorage.getItem('hospital-clinical-note') || initialClinicalNote
  } catch (error) {
    console.error('Unable to load the saved clinical note.', error)
    return initialClinicalNote
  }
}

const MedicalRecords = () => {
  const editorRef = useRef(null)
  const [noteValue] = useState(getInitialNote)
  const [lastSaved, setLastSaved] = useState(null)
  const [saveMessage, setSaveMessage] = useState('')

  const saveNote = () => {
    const editor = editorRef.current
    if (!editor) {
      setSaveMessage('The clinical note editor is not ready yet.')
      return
    }

    try {
      localStorage.setItem('hospital-clinical-note', editor.value || '')
      setLastSaved(new Date())
      setSaveMessage('Clinical note saved in this browser.')
    } catch (error) {
      console.error('Unable to save the clinical note.', error)
      setSaveMessage('Unable to save this note. Check browser storage availability.')
    }
  }

  const handleEditorChange = useCallback(() => {
    setSaveMessage('')
  }, [])

  return (
    <div className="medical-records">
      <section className="records-intro" aria-labelledby="records-heading">
        <div>
          <h2 id="records-heading">Clinical Documentation</h2>
          <p>
            Prepare a structured patient note with rich-text formatting, links, lists,
            and images. Save a draft locally in this browser.
          </p>
        </div>
        <div className="records-patient" aria-label="Selected patient">
          <span className="records-patient-label">Selected patient</span>
          <strong>Jordan Taylor</strong>
          <span>MR-10482 · Cardiology</span>
        </div>
      </section>

      <section className="clinical-note" aria-labelledby="note-heading">
        <div className="clinical-note-header">
          <div>
            <h3 id="note-heading">Clinical note</h3>
            <p>Review and complete the note before saving.</p>
          </div>
          <button className="btn-secondary" type="button" onClick={saveNote}>
            Save draft
          </button>
        </div>

        <RichTextEditorComponent
          ref={editorRef}
          value={noteValue}
          height="300px"
          enableWebMcp={true}
          webMcpSettings={{
            name: 'clinicalNoteEditor',
            exposedTo: [window.location.origin]
          }}
          showCharCount={true}
          maxLength={10000}
          saveInterval={0}
          toolbarSettings={toolbarSettings}
          placeholder="Enter clinical notes..."
          change={handleEditorChange}
        >
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Count, WebMcpRichTextEditor]} />
        </RichTextEditorComponent>

        <div className="note-status" aria-live="polite">
          <span>
            {lastSaved
              ? `Last saved at ${lastSaved.toLocaleTimeString()}`
              : 'Draft has not been saved'}
          </span>
          {saveMessage && <span role="status">{saveMessage}</span>}
        </div>
      </section>

    </div>
  )
}

export default MedicalRecords
