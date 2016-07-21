import { Tab, Tabs } from 'react-bootstrap';
import QueryLog from './QueryLog'
import React from 'react';

const SouthPane = React.createClass({
  render: function () {
    return (
      <Tabs>
        <Tab title="Query Log" eventKey={1}>
          <QueryLog/>
        </Tab>
        <Tab title="Templating" eventKey={2}>
          Unavaillable.
        </Tab>
      </Tabs>
    );
  }
});

export default SouthPane
