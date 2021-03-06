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

import { assert } from 'chai'
import fadeOut from '../../src/utils/fadeOut'
import sinon from 'sinon'

describe('src/utils/fadeOut', () => {
  let func = sinon.spy()
  const duration = 100 // 100ms for a speedy test
  it('calls func 10 times', (done) => {
    fadeOut(func, duration, () => {
      assert.strictEqual(10, func.callCount)
      done()
      func.reset()
    })
  })
})
