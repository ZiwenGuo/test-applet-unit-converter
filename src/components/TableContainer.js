import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import UnitMap from "../constants/UnitMap";
import { connect } from "react-redux";
import * as actionTypes from "../constants/actions";

class TableContainer extends React.Component {
  render() {
    return (
      <Table borderless>
        <thead>
          <tr>
            <th>From:</th>
            <th>To:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                id="from_input"
                type="number"
                value={this.props.input}
                onChange={(e) => {
                  this.props.onInputChange(e.target.value);
                }}
              />
            </td>
            <td>
              <Form.Control
                id="to_input"
                type="number"
                readOnly
                value={this.props.output}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Form.Control
                as="select"
                size={UnitMap[this.props.unitType].length}
                value={this.props.fromUnit}
                onChange={(e) => {
                  this.props.onFromUnitChange(e.target.value);
                }}
              >
                {UnitMap[this.props.unitType].map((unit, index) => (
                  <option value={unit} key={index}>
                    {" "}
                    {unit}{" "}
                  </option>
                ))}
              </Form.Control>
            </td>
            <td>
              <Form.Control
                as="select"
                size={UnitMap[this.props.unitType].length}
                value={this.props.toUnit}
                onChange={(e) => {
                  this.props.onToUnitChange(e.target.value);
                }}
              >
                {UnitMap[this.props.unitType].map((unit, index) => (
                  <option value={unit} key={index}>
                    {" "}
                    {unit}{" "}
                  </option>
                ))}
              </Form.Control>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    input: state.input,
    output: state.output,
    fromUnit: state.fromUnit,
    toUnit: state.toUnit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (newInput) =>
      dispatch({ type: actionTypes.INPUT_CHANGE, newInput: newInput }),
    onFromUnitChange: (newUnit) =>
      dispatch({ type: actionTypes.FROM_UNIT_CHANGE, newUnit: newUnit }),
    onToUnitChange: (newUnit) =>
      dispatch({ type: actionTypes.TO_UNIT_CHANGE, newUnit: newUnit }),
    updateUnitType: (unitType) =>
      dispatch({
        type: actionTypes.UPDATE_UNIT_TYPE,
        unitType: unitType,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
