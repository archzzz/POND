/*
 * Copyright (C) 2016 Mark P. Lindsay
 * 
 * This file is part of mysteriousobjectsatnoon.
 *
 * mysteriousobjectsatnoon is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * mysteriousobjectsatnoon is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with mysteriousobjectsatnoon.  If not, see <http://www.gnu.org/licenses/>.
 */

import { createSelector } from 'reselect'

export default createSelector(
  state => state.getIn(['filter', 'isInFilterMode']),
  state => state.getIn(['page', 'items']),
  state => state.getIn(['filter', 'filteredItems']),
  state => state.getIn(['page', 'width']),
  
  (isInFilterMode, items, filteredItems, width) => {
    const padding = width / 2
    let leftmostItem = items.minBy(item => item.get('x'))
    if (isInFilterMode) {
      leftmostItem = filteredItems.minBy(item => item.get('x'))
    }
    if (leftmostItem === undefined) {
      return 0
    }
    const x = leftmostItem.get('x')
    if (x > 0) {
      return padding - x
    }
    return Math.abs(x) + padding
  }
)