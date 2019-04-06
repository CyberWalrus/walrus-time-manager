import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
    height: 100
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, height) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: `none`,
  height: `${height}px`,

  // change background colour if dragging
  background: isDragging ? `lightgreen` : `grey`,

  // styles we need to apply on draggables
  ...draggableStyle
});
const getDivStyle = () => ({
  // some basic styles to make the items look a bit nicer
  userSelect: `none`,
  height: `30px`,
  width: `250px`,
  transform: `translateY(-30px)`,

  // change background colour if dragging
  background: `red`,
  position: `fixed`
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? `lightblue` : `lightgrey`,
  padding: grid,
  width: 250
});

export default class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(3),
      x: 0,
      y: 0,
      value: 0
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addHight = this.addHight.bind(this);
    this.divMouseDown = this.divMouseDown.bind(this);
    this.divMouseUp = this.divMouseUp.bind(this);
    this.divMouseMove = this.divMouseMove.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }
  addHight(event) {
    console.log(event.target.id);
    const items = this.state.items.slice();
    items[event.target.id].height += 20;
    this.setState({
      items: items
    });
  }
  divMouseDown(e) {
    e.target.attributes.move.value = 1;
    const target = e.target;
    console.log(e.target);
    window.addEventListener(`pointerup`, this.divMouseUp);
  }
  divMouseUp(e) {
    //e.target.attributes.move.value = 0;
    console.log(`test`);
    console.log(e.target);
    window.removeEventListener(`pointerup`, this.divMouseUp);
  }
  divMouseMove(e) {
    console.log(e.target.attributes.move.value);
    if (e.target.attributes.move.value != 0) {
      this.setState({ value: e.clientY });
    }
  }
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div>
        <div move={0} style={getDivStyle()} onPointerDown={this.divMouseDown}>
          {`${this.state.x} , ${this.state.y} , ${this.state.value}`}
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            item.height
                          )}
                        >
                          {item.content}
                          <button id={index} onClick={this.addHight}>
                            +
                          </button>
                          <div />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
