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

export default function fadeIn (func, duration, cb) {
  let incrementer
  let v = 0.00
  const increment = () => {
    if (v < 1.00) {
      v = Math.round((v + 0.1) * 1e12) / 1e12
      func(v)
    }
    else {
      clearInterval(incrementer)
      if (cb !== undefined) {
        cb()
      }
    }
  }
  const d = duration * 0.1
  incrementer = setInterval(increment, d)
}
