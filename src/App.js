import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TableContainer from "./components/TableContainer";
import { connect } from "react-redux";
import * as actionTypes from "./constants/actions";
import Button from "react-bootstrap/Button";

class App extends React.Component {
  handleUnitChange(unit) {
    this.props.onSelectUnit(unit);
  }

  render() {
    return (
      <div className="App">
        <h1> Unit Converter </h1>
        <Tabs
          className="nav"
          defaultActiveKey="length"
          onSelect={(unit) => this.handleUnitChange(unit)}
        >
          <Tab eventKey="length" title="Length">
            <TableContainer unitType="length" />
          </Tab>
          <Tab eventKey="temperature" title="Temperature">
            <TableContainer unitType="temperature" />
          </Tab>
          <Tab eventKey="weight" title="Weight">
            <TableContainer unitType="weight" />
          </Tab>
          <Tab eventKey="time" title="Time">
            <TableContainer unitType="time" />
          </Tab>
        </Tabs>
        <Button> Download App </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectUnit: (newUnit) =>
      dispatch({ type: actionTypes.UPDATE_UNIT_TYPE, unitType: newUnit }),
  };
};

export default connect(null, mapDispatchToProps)(App);
