import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// -> Handle scenarios with or without sub categories
// show dropdown arrow is sub categories are , if not then plus sign

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const result = {};
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  if (droppableSource.droppableId != "droppable2") {
    const removed = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, removed);

    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  } else {
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  }

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  minHeight: 60,
  maxHeight: 80,
  overflowY: "scroll",
});

class DragAndDrop extends React.Component {
  state = {
    items: this.props.selectedColumns,
    selected: this.props.filterColumns,
    key: 1,
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  componentDidMount() {
    this.setState({
      items: this.props.selectedColumns,
      selected: this.props.filterColumns,
      key: Math.floor(Math.random() * 100),
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.colUpdated !== prevProps.colUpdated) {
      //   let selectStr = this.state.selected.map((sel) => sel.id);
      //   let filteredCol = this.props.selectedColumns.filter((col) => !selectStr.includes(col.id));
      this.setState({
        items: this.props.selectedColumns,
        key: Math.floor(Math.random() * 100),
        // selected: this.props.filterColumns
      });
    }
  }
  id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(this.getList(source.droppableId), source.index, destination.index);

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      } else {
        state = { items: items };
      }

      this.setState(state);
    } else {
      const result = move(this.getList(source.droppableId), this.getList(destination.droppableId), source, destination);

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  filterItems = (item) => {
    let filteredItems = this.state.items?.filter((itemEle) => itemEle.id != item.id);
    let filteredSelected = this.state.selected?.filter((itemEle) => itemEle.id != item.id);
    this.props.updatedSelected(filteredItems);
    this.setState({ items: filteredItems, selected: filteredSelected, key: Math.floor(Math.random() * 100) });
  };

  filterSelected = (item) => {
    let filteredSelected = this.state.selected?.filter((itemEle) => itemEle.id != item.id);
    this.setState({ selected: filteredSelected, key: Math.floor(Math.random() * 100) });
    this.props.reredner();
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd} key={this.state.key}>
        <span>Selected Columns</span>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      {item.content}
                      <span
                        onClick={() => {
                          this.filterItems(item);
                        }}
                      >
                        -
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <span>Filter Columns</span>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {this.state.selected.map((item, index) => (
                <Draggable key={`${item.id}-2`} draggableId={`${item.id}-2`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      {item.content}
                      <span
                        onClick={() => {
                          this.filterSelected(item);
                        }}
                      >
                        -
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragAndDrop;
