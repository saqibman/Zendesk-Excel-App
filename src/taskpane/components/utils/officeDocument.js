
let eventResult;

export function initializeCellChangeEventHandler() {
  Excel.run(function (context) {
    const worksheet = context.workbook.worksheets.getActiveWorksheet();
    eventResult = worksheet.onSelectionChanged.add(handleSelectionChange);

    return context.sync().then(function () {
      console.log("Event handler successfully registered for onSelectionChanged event in the worksheet.");
    });
  });
}

// Function to handle cell change events
async function handleSelectionChange(event) {
  await Excel.run(async (context) => {
    await context.sync();
    console.log("Address of current selection: " + event.address);
  });
}

export async function removeEventHandler() {
  if (eventResult) {
    await Excel.run(async (context) => {
      eventResult.remove();
      await context.sync();

      eventResult = null;
      console.log("Event handler successfully removed.");
    });
  } else {
    console.log("No event handler to remove.");
  }
}
