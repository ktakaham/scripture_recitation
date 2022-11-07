//参考：https://omkz.net/react-beautiful-dnd/#index_id0
//参考：https://github.com/eltociear/react-beautiful-dnd-ja
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type {
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

type questionType = { id: number; title: string };

// ドラッグ&ドロップした要素を入れ替える
const reorder = (
  list: questionType[],
  startIndex: number,
  endIndex: number
): questionType[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// ドラッグ&ドロップの質問のスタイル
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  background: isDragging ? "#757ce8" : "white",
  ...draggableStyle,
});
// ドラッグ&ドロップのリストのスタイル
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "#1769aa" : "lightgrey",
  padding: "10px",
});

export const DndPageComponent = () => {
  const [questions, setQuestions] = useState([
    { id: 1, title: "question1" },
    { id: 2, title: "question2" },
    { id: 3, title: "question3" },
    { id: 4, title: "question4" },
    { id: 5, title: "question5" },
  ]);

  const onDragEnd = (result: DropResult) => {
    // ドロップ先がない
    if (!result.destination) {
      return;
    }
    // 配列の順序を入れ替える
    let movedItems = reorder(
      questions, //　順序を入れ変えたい配列
      result.source.index, // 元の配列の位置
      result.destination.index // 移動先の配列の位置
    );
    setQuestions(movedItems);
  };

  return (
    // ドラッグアンドドロップの有効範囲
    <DragDropContext onDragEnd={onDragEnd}>
      {/* ドロップできる範囲 */}
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {/*　ドラッグできる要素　*/}
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={"q-" + question.id}
                index={index}
              >
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {question.title}
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
};
