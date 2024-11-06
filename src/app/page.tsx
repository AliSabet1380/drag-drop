"use client";

import { z } from "zod";
import { parseAsJson, useQueryState } from "nuqs";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

const dummy_Data = [
  { id: 1, title: "item 1", idx: 0 },
  { id: 2, title: "item 2", idx: 1 },
  { id: 3, title: "item 3", idx: 2 },
  { id: 4, title: "item 4", idx: 3 },
];

const reorder = (
  list: { id: number; title: string }[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Dummy_Data_Schema = z.array(
  z.object({ id: z.number(), title: z.string(), idx: z.number() })
);

const Home = () => {
  const [items, setItems] = useQueryState(
    "items",
    parseAsJson(Dummy_Data_Schema.parse).withDefault(dummy_Data)
  );
  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;
    if (
      destination?.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newItems = reorder(items, source.index, destination.index).map(
      (item, idx) => ({ ...item, idx })
    );
    setItems(newItems);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-700">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list">
          {(provided) => (
            <div
              className=" w-96 bg-white p-4 rounded-lg border shadow-md space-y-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, i) => (
                <Draggable index={i} draggableId={`${item.id}`} key={item.id}>
                  {(draggableProvided) => (
                    <div
                      {...draggableProvided.dragHandleProps}
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      className="bg-black/20 p-3 rounded-md"
                    >
                      {item.title}
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
};

export default Home;
