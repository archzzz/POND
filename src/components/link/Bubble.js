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

import React from 'react'

export default class Bubble extends React.Component {
  constructor() {
    super()
    this.render = this.render.bind(this)
  }
  render() {
    if (this.props.isInLinkingMode) {
      if (this.props.isInLinkingTransition) {
        return (
          <div className='bubble' onClick={this.props.onClick}>
            Making link...
          </div>
        )
      }
      if (this.props.source.get('item') === null) {
        return (
          <div className='bubble' onClick={this.props.onClick}>
            You're in linking mode. Click on one of your source items.
          </div>
        )
      }
      return (
          <div className='bubble' onClick={this.props.onClick}>
            Click on any destination item.
          </div>
      )
    }
    if (!this.props.isOpen) {
      return null
    }
    return (
      <div className='bubble' onClick={this.props.onClick}>
        See something you like? Click it to see where it takes you.
      </div>
    )
  }
}
