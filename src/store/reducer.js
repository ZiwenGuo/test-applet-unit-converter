import * as actionTypes from "../constants/actions";
import UnitConverters from "../constants/UnitConverters";
import HubUnits from "../constants/HubUnits";
import UnitMap from "../constants/UnitMap";

const initialState = {
  input: "",
  output: "",
  fromUnit: "Meter",
  toUnit: "Kilometer",
  unitType: "length",
};

const convertUnit = (fromUnit, toUnit, input, unitType) => {
  if (input === "") {
    return "";
  }
  const hubUnit = HubUnits[unitType];
  const key1 = fromUnit + "_" + hubUnit;
  const key2 = hubUnit + "_" + toUnit;
  const temp = UnitConverters[unitType][key1](input);
  return UnitConverters[unitType][key2](temp);
};

const reducer = (state = initialState, action) => {
  let newState = null;
  switch (action.type) {
    case actionTypes.INPUT_CHANGE:
      return {
        ...state,
        input: action.newInput,
        output: convertUnit(
          state.fromUnit,
          state.toUnit,
          action.newInput,
          state.unitType
        ),
      };
    case actionTypes.FROM_UNIT_CHANGE:
      newState = {
        ...state,
        fromUnit: action.newUnit,
        output:
          action.newUnit === state.toUnit
            ? state.input
            : convertUnit(
                action.newUnit,
                state.toUnit,
                state.input,
                state.unitType
              ),
      };
      return newState;
    case actionTypes.TO_UNIT_CHANGE:
      newState = {
        ...state,
        toUnit: action.newUnit,
        output:
          action.newUnit === state.fromUnit
            ? state.input
            : convertUnit(
                state.fromUnit,
                action.newUnit,
                state.input,
                state.unitType
              ),
      };
      return newState;
    case actionTypes.UPDATE_UNIT_TYPE:
      if (action.unitType === state.unitType) {
        return state;
      }
      newState = {
        input: "",
        output: "",
        unitType: action.unitType,
        fromUnit: UnitMap[action.unitType][0],
        toUnit: UnitMap[action.unitType][1],
      };
      return newState;
    default:
      return state;
  }
};

export default reducer;
