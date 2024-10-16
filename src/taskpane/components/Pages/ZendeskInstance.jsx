import React from "react";
import { makeStyles, Button, shorthands } from "@fluentui/react-components";
import { Delete20Filled, Edit20Filled } from "@fluentui/react-icons"; // Icons for delete and edit
import { StandardReportStyle } from "../../../style/style";

const useStyles = makeStyles({
  ...StandardReportStyle,
  boxPanel: {
    marginBottom: "8px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  zendeskinstancemain: {
    padding: "15px",
  },
  header: {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    ...shorthands.borderBottom("2px", "solid", "darkgreen"),
  },
  body: {
    backgroundColor: "white",
    padding: "15px",
  },
  footer: {
    backgroundColor: "gray",
    padding: "10px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    marginBottom: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  column: {
    width: "30%",
  },
});

const ZendeskInstance = () => {
  const styles = useStyles();

  const instances = [
    {
      name: "Instance 1",
      email: "instance1@example.com",
      details: [
        { label: "Detail 1", value: "Value 1" },
        { label: "Detail 2", value: "Value 2" },
        { label: "Detail 3", value: "Value 3" },
      ],
    },
    {
      name: "Instance 2",
      email: "instance2@example.com",
      details: [
        { label: "Detail 1", value: "Value 1" },
        { label: "Detail 2", value: "Value 2" },
        { label: "Detail 3", value: "Value 3" },
      ],
    },
    {
      name: "Instance 3",
      email: "instance3@example.com",
      details: [
        { label: "Detail 1", value: "Value 1" },
        { label: "Detail 2", value: "Value 2" },
        { label: "Detail 3", value: "Value 3" },
      ],
    },
  ];

  return (
    <div className={styles.zendeskinstancemain}>
      {instances.map((instance, index) => (
        <div key={index} className={styles.boxPanel}>
          <div className={styles.header}>{instance.name}</div>
          <div className={styles.body}>
            <div className={styles.value} style={{ width: "100%" }}>
              <strong>Email: </strong> {instance.email}
            </div>
            <div className={styles.row}>
              {instance.details.map((detail, idx) => (
                <div key={idx} className={styles.column}>
                  <div className={styles.label}>{detail.label}</div>
                  <div className={styles.value}>{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.footer}>
            <Button icon={<Edit20Filled />} appearance="primary">
              Edit
            </Button>
            <Button icon={<Delete20Filled />} appearance="primary">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ZendeskInstance;
