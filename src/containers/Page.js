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

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import VideoItem from '../components/video/VideoItem'
import actions from '../actions'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import TextItem from '../components/text/TextItem'

class Page extends React.Component {
  constructor() {
    super()
    this._compensateForPadding = this._compensateForPadding.bind(this)
    this._getClassName = this._getClassName.bind(this)
    this._getStyle = this._getStyle.bind(this)
    this._handleClick = this._handleClick.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.render = this.render.bind(this)
  }
  _compensateForPadding(scrollAdjustment) {
    this.scrollerNode.scrollLeft -= scrollAdjustment
  }
  _getClassName() {
    let className = 'page'
    if (this.props.params.timingOrUsername === undefined) {
      className += ' homepage'
    }
    if (this.props.initiallyScrolled) {
      className += ' initially-scrolled'
    }
    return className
  }
  _getStyle() {
    let style = {
      paddingLeft: this.props.paddingLeft + 'px',
      paddingRight: this.props.paddingRight + 'px'
    }
    return style
  }
  _handleClick(event) {
    if (event.target === this.refs.page) {
      if (this.props.isShowingMetadata) {
        this.props.hideMetadata()
      }
      else if (event.metaKey && 
               this.props.authData !== null && 
               !this.props.authData.isEmpty()) {
        const x = event.clientX + this.props.scrollLeft - this.props.paddingLeft
        this.props.createTextItem(x, event.clientY, this.props.authData)
      }
    }
  }
  componentDidMount() {
    this.props.listenToItems(this.props.params.timingOrUsername);
    this.scrollerNode = document.getElementById('scroller')
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.params.timingOrUsername !== nextProps.params.timingOrUsername) {
      this.props.listenToItems(nextProps.params.timingOrUsername)
    }
    if(this.props.scrollAdjustment !== nextProps.scrollAdjustment) {
      this._compensateForPadding(nextProps.scrollAdjustment)
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.scrollDestination !== undefined && 
        !this.props.initiallyScrolled) {
      this.scrollerNode.scrollLeft = this.props.scrollDestination
      this.props.setPageInitiallyScrolled()
    }
  } 
  render() {
    const items = this.props.items.map((item, key) => {
      switch (item.get('type')) {
        case 'text':
          return <TextItem authData={this.props.authData}
                           id={key} 
                           isShowingMetadata={this.props.isShowingMetadata}
                           item={item} 
                           key={key} 
                           setMostRecentlyTouched={this.props.setMostRecentlyTouched}
                           setItemPosition={this.props.setItemPosition} 
                           setItemSize={this.props.setItemSize} />
        case 'video':
          return <VideoItem authData={this.props.authData}
                            editItem={this.props.editItem}
                            height={this.props.height}
                            id={key}
                            isShowingMetadata={this.props.isShowingMetadata}
                            item={item}
                            key={key}
                            setMostRecentlyTouched={this.props.setMostRecentlyTouched}
                            setItemPosition={this.props.setItemPosition}
                            setItemSize={this.props.setItemSize}
                            setVideoReadyToPlay={this.props.setVideoReadyToPlay} />
        default:
          return null
      }
    }).toArray()
    return (
      <div className={this._getClassName()} 
           id='page' 
           onClick={this._handleClick} 
           ref='page'
           style={this._getStyle()}
      >
        {items}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authData: state.getIn(['app', 'authData']),
    height: state.getIn(['page', 'height']),
    isInAddMode: state.getIn(['app', 'isInAddMode']),
    isShowingMetadata: state.getIn(['app', 'isShowingMetadata']),
    items: state.getIn(['page', 'items']),
    initiallyScrolled: state.getIn(['page', 'initiallyScrolled']),
    paddingLeft: state.getIn(['page', 'paddingLeft']),
    paddingRight: state.getIn(['page', 'paddingRight']),
    scrollAdjustment: state.getIn(['page', 'scrollAdjustment']),
    scrollDestination: state.getIn(['page', 'scrollDestination']),
    scrollLeft: state.getIn(['page', 'scrollLeft']),
    width: state.getIn(['page', 'width'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createTextItem: bindActionCreators(actions.createTextItem, dispatch),
    editItem: bindActionCreators(actions.editItem, dispatch),
    hideMetadata: bindActionCreators(actions.hideMetadata, dispatch),
    listenToItems: bindActionCreators(actions.listenToItems, dispatch),
    setPageInitiallyScrolled: bindActionCreators(actions.setPageInitiallyScrolled, dispatch),
    setVideoReadyToPlay: bindActionCreators(actions.setVideoReadyToPlay, dispatch),
    setItemPosition: bindActionCreators(actions.setItemPosition, dispatch),
    setItemSize: bindActionCreators(actions.setItemSize, dispatch),
    setMostRecentlyTouched: bindActionCreators(actions.setMostRecentlyTouched, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
