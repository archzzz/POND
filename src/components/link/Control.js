/*
 * Copyright (C) 2017 Mark P. Lindsay
 * 
 * This file is part of mysteriousobjectsatnoon.
 *
 * mysteriousobjectsatnoon is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * mysteriousobjectsatnoon is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with mysteriousobjectsatnoon.  If not, see 
 * <http://www.gnu.org/licenses/>.
 */

import Bubble from './Bubble'
import Draggable from 'react-draggable'
import React from 'react'
import ReactDOM from 'react-dom'

export default class Control extends React.Component {
  constructor () {
    super()
    this.state = {
      height: 0,
      isOpen: false,
      width: 0
    }
    this._handleClick = this._handleClick.bind(this)
    this._handleDragStart = this._handleDragStart.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.render = this.render.bind(this)
  }
  _handleClick (event) {
    event.preventDefault()
    if (!this.props.user.isEmpty()) {
      this.props.planeClicked()
    }
    else {
      this.setState(previousState => {
        return { isOpen: !previousState.isOpen }
      })
    }

  }
  _handleDragStart (event) {
    event.preventDefault()
  }
  componentDidUpdate () {
    let el = ReactDOM.findDOMNode(this)
    if (el !== null && this.state.height === 0 && this.state.width === 0) {
      this.setState({
        height: el.offsetHeight,
        width: el.offsetWidth
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    // Close the bubble if a user logs in.
    if (this.props.user.isEmpty() && !nextProps.user.isEmpty()) {
      this.setState({
        isOpen: false
      })
    }
  }
  render () {
    if (this.props.windowHeight === 0 && this.props.windowWidth === 0) {
      return null
    }
    const bounds = {
      top: 0,
      right: this.props.windowWidth - this.state.width,
      bottom: this.props.windowHeight - this.state.height,
      left: 0
    }
    const defaultPosition = { 
      x: (this.props.windowWidth * 0.45),
      y: (this.props.windowHeight * 0.75) 
    }
    return (
      <Draggable bounds={bounds} defaultPosition={defaultPosition}>
        <div className='control app-control'>
          <a href='#' 
             onClick={this._handleClick}
             onDragStart={this._handleDragStart}>
            <img src='/static/plane.gif' alt='Link' />
          </a>
          <Bubble destination={this.props.destination}
                  isInLinkingMode={this.props.isInLinkingMode}
                  isInLinkingTransition={this.props.isInLinkingTransition}
                  isOpen={this.state.isOpen} 
                  onClick={this._handleClick} 
                  source={this.props.source} />
        </div>
      </Draggable>
    )
  }
}
