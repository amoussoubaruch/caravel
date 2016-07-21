import React from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SqlEditor from './SqlEditor'
import shortid from 'shortid'
import Link from './Link'

var queryCount = 1;

const QueryEditors = React.createClass({
  getInitialState: function() {
    return {tabkey: 0};
  },
  newQueryEditor: function () {
    queryCount++;
    var dbId = (this.props.workspaceDatabase) ? this.props.workspaceDatabase.id : null;
    var qe = {
      id: shortid.generate(),
      title: `Query ${queryCount}`,
      dbId: dbId,
      autorun: false,
      sql: 'SELECT ...'
    };
    this.props.actions.addQueryEditor(qe);
  },
  handleSelect(key) {
    this.setState({tabkey: key});
  },
  render: function () {
    var that = this;
    var editors = this.props.queryEditors.map(function (qe, i) {
      var latestQuery = null;
      that.props.queries.forEach((q) => {
        if (q.id == qe.latestQueryId) {
          latestQuery = q;
        }
      });
      var circle = null;
      if (latestQuery) {
        circle = <div className={"circle " + latestQuery.state} />;
      }
      var tabTitle = (
        <div>
          {qe.title} {circle} 
          <Link
              onClick={that.props.actions.removeQueryEditor.bind(that, qe)}
              className="fa fa-close"
              href="#"
              tooltip="Close tab"/>
        </div>
      );
      return (
        <Tab
          key={qe.id}
          title={tabTitle}
          eventKey={i}>
            <SqlEditor
              name={qe.id}
              queryEditor={qe}
              latestQuery={latestQuery}
              callback={that.render.bind(that)}/>
        </Tab>);
    });
    return (
      <Tabs activeKey={this.state.tabkey} onSelect={this.handleSelect}>
        {editors}
        <Tab title="+" eventKey={this.props.queryEditors.length}>
          <Button onClick={this.newQueryEditor}>
            Add Tab
          </Button>
        </Tab>
      </Tabs>
    );
  }
});

function mapStateToProps(state) {
  return {
    queryEditors: state.queryEditors,
    queries: state.queries,
    workspaceDatabase: state.workspaceDatabase
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryEditors)
