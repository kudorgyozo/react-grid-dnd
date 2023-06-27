import { DefaultColors, GameGrid } from "./GameGrid";
import { useDrag } from "react-dnd";
import { useState } from "react";
import { PieceInfo } from "./App";

import { generate2DArray, getEventCoordsInElement } from "./utils";

type Props = {
  piece: PieceInfo;
  onRotate: (id: number, data: number[][], rows: number, cols: number) => void;
};

export const GamePiece = (props: Props) => {
  const [canRotate, setCanRotate] = useState<boolean>(false);

  const [grabPos, setGrabPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0
  });

  const [{ isDragging }, dragSourceRef] = useDrag(
    {
      type: "piece",
      item: {
        id: props.piece.id,
        pos: grabPos
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      }),
      canDrag: () => !props.piece.placed,
      previewOptions: {
        captureDraggingState: true
      }
    },
    [grabPos, props.piece]
  );

  const onMouseDown = (e: any) => {
    setGrabPos(getEventCoordsInElement(e));
  };

  const onMouseEnter = () => {
    setCanRotate(true);
  };

  const onMouseLeave = () => {
    setCanRotate(false);
  };

  const onRotate = (e: any) => {
    const { piece, onRotate } = props;
    if (canRotate) {
      if (e.key === "q") {
        const newRows = piece.cols;
        const newCols = piece.rows;
        const newBuffer = generate2DArray(newCols, newRows, 0);

        //logMatrix(props.piece.data);
        for (let y = 0; y < piece.rows; y++) {
          for (let x = 0; x < piece.cols; x++) {
            newBuffer[newRows - x - 1][y] = piece.data[y][x];
          }
        }
        //logMatrix(newBuffer);
        onRotate(piece.id, newBuffer, newRows, newCols);
      }
      if (e.key === "e") {
        const newRows = piece.cols;
        const newCols = piece.rows;
        const newBuffer = generate2DArray(newCols, newRows, 0);
        for (let y = 0; y < piece.rows; y++) {
          for (let x = 0; x < piece.cols; x++) {
            newBuffer[x][newCols - y - 1] = piece.data[y][x];
          }
        }

        onRotate(piece.id, newBuffer, newRows, newCols);
      }
    }
  };

  //The dragPreview will be attached to the dragSource by default
  return (
    // <div
    //   //ref={dragPreviewRef}
    // >
    <GameGrid
      ref={dragSourceRef}
      style={{
        opacity: isDragging || props.piece.placed ? 0.5 : 1.0,
        display: "inline-grid",
        margin: "1rem",
        //fontSize: 25,
        //fontWeight: "bold",
        cursor: !props.piece.placed ? "move" : ""
      }}
      tabIndex={-1}
      rows={props.piece.rows}
      cols={props.piece.cols}
      data={props.piece.data}
      colors={DefaultColors}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyPress={onRotate}
      className="__bounding-rect"
    />
  );
};
