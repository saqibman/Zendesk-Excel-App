import { shorthands, tokens } from "@fluentui/react-components";

export const TableFieldStyle = {
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    backgroundColor: "#f0f0f0",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "5px",
    fontWeight: "400",
  },

  ancher: {
    color: "#0f6cbd",
    // textDecoration: "none !important",
    fontWeight: "500",
  },

  icon: {
    width: "12px",
    color: "#bdbdbd",
  },
  form: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("5px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  mx: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  valueText: {
    marginLeft: "10px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#bdbdbd",
  },
  fildersSec: {
    width: "100%",
    display: "block",
  },
  selectWidthMd: {
    maxWidth: "180px",
    minWidth: "180px",
  },
  selectWidthLg: {
    maxWidth: "100%",
    width: "100%",
    marginTop: "5px",
  },
  selectWidth115: {
    width: "115px",
    maxWidth: "115px",
    minWidth: "115px",
    marginRight: "10px",
  },
  searchWidth150: {
    width: "150px !important",
    maxWidth: "150px !important",
    minWidth: "150px !important",
    height: "36px",
  },
  selectWidthSm: {
    width: "80px",
    marginLeft: "5px",

    // "&:after": {
    //   backgroundImage: "linear-gradient(0deg, #107c10 0%, #107c10 50%, transparent 50%, transparent 100%)",
    // },
  },
  addbutton: {
    padding: '8px 10px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    border: '1px solid #c6c0c0',
    color: '#59ad3b',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: '12px',
    maxWidth: 'fit-content',
  },
  selectWidthMdt: {
    maxWidth: "90px",
  },
  flexWrap: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  arrowIcon: {
    width: "16px",
  },
  headingTitle: {
    color: "#242424",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "0",
    marginBottom: "0",
  },
  hr: {
    width: "100%",
    // borderColor: "#c7c7c7",
  },
  loader: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  },
  error: {
    color: "#ff0000",
    fontSize: "12px",
    marginTop: "0",
    marginBottom: "0",
  },
};
export const BankConnectdStyle = {
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    backgroundColor: "#f0f0f0",
  },
  connectedBtn: {
    maxWidth: "150px",
    marginRight: "0px",
    borderRadius: "5px 0px 0px 5px",
    backgroundColor: "rgb(16 124 16)",
    color: "#fff",
    lineHeight: "25px",
    minHeight: "25px",
    padding: "3px 5px 5px 5px",
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "#0c5a0c",
      color: "#fff",
    },
  },
  disConnectedBtn: {
    maxWidth: "100px",
    width: "100%",
    marginLeft: "0px",
    borderRadius: "0px 5px 5px 0px",
    marginTop: "0px",
    marginBottom: "10px",
    lineHeight: "25px",
    minHeight: "25px",
    backgroundColor: "#dc3545",
    padding: "3px 5px 5px 5px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b61222",
      color: "#fff",
    },
  },
  flexWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  error: {
    color: "#ff0000",
    fontSize: "12px",
    marginTop: "0",
    marginBottom: "0",
  },
};
export const BankSelectionStyle = {
  titles: {
    fontSize: "14px",
    marginBottom: "8px",
  },
  backArrow: {
    marginBottom: "10px",
    width: "fit-content",
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    backgroundColor: "#f0f0f0",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "5px",
    fontWeight: "400",
  },

  ancher: {
    color: "#0f6cbd",
    // textDecoration: "none !important",
    fontWeight: "500",
  },

  icon: {
    width: "12px",
    color: "#bdbdbd",
  },
  form: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("5px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  mx: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  valueText: {
    marginLeft: "10px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#bdbdbd",
  },
  inputWidthLg: {
    maxWidth: "94%",
    width: "94%",
    border: "1px solid #d1d1d1",
    height: "32px",
    borderBottomColor: "#616161",
    backgroundColor: "#fff",
    color: "#242424",
    borderRadius: "3px",
    padding: "0% 3%",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "10px",
  },
  selectWidthMd: {
    maxWidth: "180px",
    minWidth: "180px",
  },
  selectWidthLg: {
    maxWidth: "100%",
    width: "100%",
    marginTop: "5px",
  },
  selectWidthSm: {
    width: "80px",
    marginLeft: "5px",
  },
  selectWidthMdt: {
    maxWidth: "90px",
  },
  flexWrap: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  arrowIcon: {
    width: "16px",
  },
  headingTitle: {
    color: "#242424",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "0",
    marginBottom: "0",
  },
  hr: {
    width: "100%",
    // borderColor: "#c7c7c7",
  },
  loader: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  },
  error: {
    color: "#ff0000",
    fontSize: "12px",
    marginTop: "0",
    marginBottom: "0",
  },
};
export const DataFunctionStyle = {
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    backgroundColor: "#f0f0f0",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "5px",
    fontWeight: "400",
  },
  error: {
    color: "#ff0000",
    fontSize: "12px",
    marginTop: "0",
    marginBottom: "0",
  },

  ancher: {
    color: "#0f6cbd",
    // textDecoration: "none !important",
    fontWeight: "500",
  },

  icon: {
    width: "12px",
    color: "#bdbdbd",
  },
  form: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("5px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  mx: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  valueText: {
    marginLeft: "10px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#bdbdbd",
  },
  selectWidthLg: {
    maxWidth: "100%",
    width: "100%",
  },
  selectWidthMd: {
    maxWidth: "180px",
    minWidth: "170px",
  },
  selectWidthSm: {
    width: "100px",
    marginLeft: "5px",

    // "&:after": {
    //   backgroundImage: "linear-gradient(0deg, #107c10 0%, #107c10 50%, transparent 50%, transparent 100%)",
    // },
  },
  selectWidthMdt: {
    maxWidth: "100px",
  },
  selectWidthSms: {
    width: "90px",
    marginLeft: "5px",

    // "&:after": {
    //   backgroundImage: "linear-gradient(0deg, #107c10 0%, #107c10 50%, transparent 50%, transparent 100%)",
    // },
  },
  selectWidthMdts: {
    maxWidth: "80px",
  },
  flexWrap: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  flexWraps: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row !important",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    width: "16px",
  },
  headingTitle: {
    color: "#242424",
    fontSize: "14px",
    fontWeight: "600",
    marginTop: "0",
    marginBottom: "0",
  },
  hr: {
    width: "100%",
    // borderColor: "#c7c7c7",
  },
  inputWidth: {
    maxWidth: "100px",
  },
};

export const ChangePasswordStyle = {
  container: {
    paddingRight: "40px",
    paddingLeft: "40px",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "5px",
    fontWeight: "400",
  },

  ancher: {
    color: "#107C10",
    // textDecoration: "none !important",
    fontWeight: "500",
  },
  line: {
    borderColor: "#adadad",
    marginTop: "10px",
    marginBottom: "10px",
  },
  form: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
};

export const MainReportsStyle = {
  container: {
    paddingRight: "20px",
    paddingLeft: "20px",
    paddingTop: "15px",
    paddingBottom: "15px",
    backgroundColor: "#f0f0f0",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#107C10",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0e700e",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "5px",
    fontWeight: "400",
  },

  line: {
    // borderColor: "#adadad",
    marginTop: "10px",
    marginBottom: "10px",
  },
  form: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  tabBtnsWrap: {
    display: "flex",
    backgroundColor: "#e0e0e0",
    paddingRight: "10px",
    // paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  tabBtnsList: {
    // listStyle: "none",
    marginLeft: "15px",
    color: "#000",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    paddingBottom: "10px",
  },
  tabBtnsListActive: {
    borderBottomStyle: "solid",
    borderBottomColor: "#107C10",
  },
  hr: {
    width: "100%",
    borderColor: "#c7c7c7",
  },
};

export const ModalStyle = {
  dialog: {
    position: "fixed",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.inset(0),
    ...shorthands.padding("10px"),
    ...shorthands.margin("auto"),
    ...shorthands.borderStyle("none"),
    ...shorthands.overflow("unset"),
    boxShadow: tokens.shadow16,
    width: "100%",
    maxWidth: "250px",
    height: "120px",
    display: "flex",
    flexDirection: "column",
    zIndex: "999",
  },

  footer: {
    display: "flex",
    marginTop: "auto",
    justifyContent: "end",
    ...shorthands.gap("5px"),
  },
  icon: {
    width: "20px",
  },
  modalBtn: {
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: "4px",
    paddingRight: "4px",
    minWidth: "40px !important",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexWap: {
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    width: "16px",
    cursor: "pointer",
  },
  crossIcon: {
    width: "16px",
    cursor: "pointer",
  },
  modalTitle: {
    color: "#242424",
    fontSize: "12px",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "4px",
    fontWeight: "400",
  },
  modalDlTitle: {
    color: "##d6d6d6",
  },
  line: {
    // borderColor: "#adadad",
    marginTop: "10px",
    marginBottom: "10px",
  },
  popupErrorAlert: {
    // borderColor: "#adadad",
    textAlign: "center",
    width: "100%",
    backgroundColor: "#f70b0b54",
    padding: "5px 0px",
    borderRadius: "5px",
    fontWeight: "500",
  },
  wideBtn: {
    marginTop: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  form: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("5px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Set background color to black with some transparency
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, // Ensure it is on top of other elements
  },
};

export const SetPassStyle = {
  container: {
    paddingRight: "40px",
    paddingLeft: "40px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  message: {
    backgroundColor: "#107c10",
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "500",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    fontWeight: "400",
  },

  textCenter: {
    textAlign: "center",
    marginTop: "6px",
  },
  ancher: {
    color: "#107C10",
    // textDecoration: "none !important",
    fontWeight: "500",
  },

  form: {
    marginTop: "40px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
};

export const ForgetPassStyle = {
  container: {
    paddingRight: "40px",
    paddingLeft: "40px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  message: {
    backgroundColor: "#107c10",
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "500",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    fontWeight: "400",
  },

  textCenter: {
    textAlign: "center",
    marginTop: "6px",
  },
  ancher: {
    color: "#107C10",
    // textDecoration: "none !important",
    fontWeight: "500",
  },

  form: {
    marginTop: "40px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
};

export const SingInStyle = {
  container: {
    paddingRight: "40px",
    paddingLeft: "40px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    fontWeight: "400",
  },

  textCenter: {
    textAlign: "center",
    marginTop: "6px",
  },
  ancher: {
    color: "#107C10",
    // textDecoration: "none !important",
    fontWeight: "500",
  },

  form: {
    marginTop: "40px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
};

export const SignUpStyle = {
  container: {
    paddingRight: "40px",
    paddingLeft: "40px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    fontWeight: "400",
  },
  simpleSmText: {
    color: "#999999",
    fontSize: "10px",
    marginTop: "0",
    marginBottom: "0",
    fontWeight: "400",
  },
  textCenter: {
    textAlign: "center",
    marginTop: "6px",
  },
  ancher: {
    color: "#107C10",
    // textDecoration: "none !important",
    fontWeight: "500",
  },
  line: {
    // borderColor: "#adadad",
    marginTop: "40px",
    marginBottom: "40px",
  },
  form: {
    marginTop: "40px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
};

export const ChooseColumnModalStyle = {
  dialog: {
    position: "fixed",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.inset(0),
    ...shorthands.padding("10px"),
    ...shorthands.margin("auto"),
    ...shorthands.borderStyle("none"),
    ...shorthands.overflow("unset"),
    boxShadow: tokens.shadow16,
    width: "100%",
    maxWidth: "400px",
    height: "450px",
    display: "flex",
    flexDirection: "column",
    zIndex: "999",
  },

  footer: {
    display: "flex",
    marginTop: "auto",
    justifyContent: "end",
    ...shorthands.gap("5px"),
  },
  icon: {
    width: "15px",
  },
  iconDrop: {
    width: "20px",
  },
  modalBtn: {
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingLeft: "8px",
    paddingRight: "8px",
    // minWidth: "40px !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexWap: {
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    width: "16px",
    cursor: "pointer",
  },
  crossIcon: {
    width: "16px",
    cursor: "pointer",
  },
  modalTitle: {
    color: "#242424",
    fontSize: "12px",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "4px",
    fontWeight: "400",
  },
  modalDlTitle: {
    color: "##d6d6d6",
  },
  line: {
    // borderColor: "#adadad",
    marginTop: "10px",
    marginBottom: "10px",
  },
  wideBtn: {
    marginTop: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Set background color to black with some transparency
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, // Ensure it is on top of other elements
  },
  flexWrap: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "#107c10",
    fontSize: "13px",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "4px",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    // borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    padding: "20px",
    boxSizing: "border-box",
  },
  cardHeader: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    // borderRadius: "10px 10px 0 0",
    textAlign: "center",
    fontWeight: "bold",
  },
  cardContent: {
    padding: "10px",
  },
  clickable: {
    display: "inline-block",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "5px",
    marginTop: "5px",
    marginLeft: "5px",
    marginRight: "5px",
    // borderRadius: "20px",
    backgroundColor: "#e0e0e0",
    cursor: "pointer",
    transition: "background 0.3s",
    "&.active": {
      backgroundColor: "#4caf50",
      color: "#fff",
    },
  },
  cardActive: {
    backgroundColor: "aliceblue",
  },
  mZero: {
    margin: "0px",
    fontSize: "12px",
  },
  selectWidthLg: {
    maxWidth: "100%",
    width: "100% !important",
    marginTop: "5px",
    marginBottom: "10px",
  },
};

export const StandardReportStyle = {
  container: {
    paddingRight: "40px",
    paddingLeft: "40px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#9fd89f",
    color: "#107c10",
    "&:hover": {
      backgroundColor: "#9fd89f",
      color: "#107c10",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "5px",
    fontWeight: "400",
  },

  ancher: {
    color: "#107C10",
    // textDecoration: "none !important",
    fontWeight: "500",
  },

  form: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  tabBtnsWrap: {
    display: "flex",
    backgroundColor: "#e0e0e0",
    paddingRight: "5px",
    // paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  tabInnerBtnsWrap: {
    display: "flex",
    backgroundColor: "#e0e0e0",
    paddingRight: "5px",
    // paddingLeft: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
    marginTop: "2px",
  },
  tabInnerBtnsList: {
    // listStyle: "none",
    marginLeft: "15px",
    color: "#000",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    paddingBottom: "3px",
  },
  tabBtnsList: {
    // listStyle: "none",
    marginLeft: "15px",
    color: "#000",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    paddingBottom: "10px",
  },
  tabBtnsListActive: {
    borderBottomStyle: "solid",
    borderBottomColor: "#107C10",
  },
};

export const AllMainStyle = {
  container: {
    paddingRight: "20px",
    paddingLeft: "20px",
    paddingTop: "15px",
    paddingBottom: "15px",
    backgroundColor: "#f0f0f0",
  },
  wideBtn: {
    width: "100%",
    marginTop: "0px",
    marginBottom: "10px",
    backgroundColor: "#107C10",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0e700e",
    },
  },
  simpleText: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "5px",
    fontWeight: "400",
  },

  line: {
    // borderColor: "#adadad",
    marginTop: "10px",
    marginBottom: "10px",
  },
  form: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  tabBtnsWrap: {
    display: "flex",
    backgroundColor: "#e0e0e0",
    paddingRight: "10px",
    // paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  tabBtnsList: {
    // listStyle: "none",
    marginLeft: "15px",
    color: "#000",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    paddingBottom: "10px",
  },
  tabBtnsListActive: {
    borderBottomStyle: "solid",
    borderBottomColor: "#107C10",
  },
};
