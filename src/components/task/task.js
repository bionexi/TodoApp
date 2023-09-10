import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ru from 'date-fns/locale/en-AU'

import EditForm from './edit-form/edit-form'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editForm: false,
      editedText: this.props.label,
    }
  }
  handleEditSave = (editedText) => {
    this.props.onEdit(editedText)
    this.setState({ editForm: false })
  }
  render() {
    const { label, date, onDeleted, onToggleDone, completed } = this.props
    let classNames = ''
    const { editedText } = this.state
    if (completed) {
      classNames += 'completed'
    }
    if (this.state.editForm) {
      classNames += 'editing'
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone} />
          <label>
            <span className="description" onClick={onToggleDone}>
              {label}{' '}
            </span>
            <span className="created">
              {' '}
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: ru,
                addSuffix: true,
              })}`}
            </span>
          </label>

          <button
            className="icon icon-edit"
            onClick={() => this.setState(({ editForm }) => ({ editForm: !editForm }))}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {this.state.editForm && <EditForm onSave={this.handleEditSave} initialValue={editedText} />}
      </li>
    )
  }
}
