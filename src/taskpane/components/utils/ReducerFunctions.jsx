import {
  viewType,
  menuOptions,
  subsidiaryOptions,
  dimensionOptions,
  dataFunctionDimensionOptions,
  periodOptions,
  fromPeriod,
  accountTypeOptions,
  excludeAccountingBook,
  includeInactive,
  accountingBookOptions,
  genericOptions,
  includeConsolidated,
  moreInformationOptions,
} from "./constants";

export const initialState = {
  access_token: "",
  userName: "",
  password: "",
  email: "",
  activeScreen: "Sign-up",
  activeTab: "",
  selectedDimension: "",
  selectedView: "",
  fromPeriodType: "Period",
  toPeriodType: "Period",
  fieldsToDisplay: ["subsidiary", "chooseColumns", "FromPeriod", "toPeriod"],
  dataOptionFields: {
    viewType,
    menuOptions,
    subsidiaryOptions,
    dimensionOptions,
    dataFunctionDimensionOptions,
    periodOptions,
    fromPeriod,
    accountTypeOptions,
    excludeAccountingBook,
    includeInactive,
    accountingBookOptions,
    genericOptions,
    includeConsolidated,
    moreInformationOptions,
  },
};

export const excelReducerFunctions = (state, action) => {
  // console.log("=====================ppp",state, action);
  switch (action.type) {
    case "RESET":
      return initialState;
    case "CHANGE_SCREEN":
      return {
        ...state,
        activeScreen: action.screen,
        activeTab: action.activeTab || "",
      };
    case "SIGNED_IN":
      return {
        ...state,
        email: action.email,
        password: action.password,
        access_token: action.token,
        activeScreen: "Setup",
      };
    case "DIMENSION_UPDATED":
      return {
        ...state,
        selectedDimension: action.dimension,
        fieldsToDisplay: action.fieldsToDisplay,
      };
    case "VIEW_UPDATED":
      return {
        ...state,
        selectedView: action.view,
        activeTab: action.activeTab,
        sheet: action.view,
        sheet_column: action.sheet_column || "A1",
        // selectedDimension: action.selectedDimension,
      };
    case "CHANGE_PERIOD_TYPE":
      return {
        ...state,
        [action.parameter]: action.value,
      };
    default:
      return state;
  }
};
