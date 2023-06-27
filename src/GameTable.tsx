import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { useImmer } from "use-immer";
import { GridSize, PieceInfo, Vector2 } from "./App";
import { DefaultColors, GameGrid } from "./GameGrid";
import {
  generate2DArray,
  getEventCoordsInElement,
  pxToGridRound
} from "./utils";

export type Props = {
  pieces: PieceInfo[];
  onDrop: (id: number) => void;
};

export const GameTable = (props: Props) => {
  const [data, setData] = useImmer<number[][]>(
    generate2DArray(GridSize, GridSize, 0)
  );

  const [dropPos, setDropPos] = useState<Vector2>({ x: 0, y: 0 });
  const { pieces, onDrop } = props;
  //actually place the fckin piece by updating the game data
  const handleDropItem = useCallback(
    (id: number, dropPos: Vector2, grabPos: Vector2) => {
      const gridStartPos = pxToGridRound({
        x: dropPos.x - grabPos.x,
        y: dropPos.y - grabPos.y
      });
      //console.log(gridStartPos);
      const piece = pieces.find((p) => p.id === id);

      if (!piece) return;
      if (gridStartPos.x < 0 || gridStartPos.y < 0) return;
      if (gridStartPos.x + piece.cols > GridSize) return;
      if (gridStartPos.y + piece.rows > GridSize) return;
      for (let x = 0; x < piece!.cols; x++) {
        for (let y = 0; y < piece!.rows; y++) {
          if (piece.data[y][x] > 0) {
            setData((draft) => {
              draft[gridStartPos.y + y][gridStartPos.x + x] = piece.data[y][x];
            });
          }
        }
      }

      onDrop(id);
    },
    [pieces, onDrop, setData]
  );

  const [{ canDrop, isOver }, dropRef] = useDrop(
    {
      accept: "piece",
      drop: (item: any) => {
        //console.log("dropped item to pos:", dropPos, "grab pos: ", item.pos);
        handleDropItem(item.id, dropPos, item.pos);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    },
    [handleDropItem, dropPos]
  );

  const cellClick = (i: number, j: number) => {
    let currentValue = data[i][j];
    currentValue++;
    if (currentValue > 2) currentValue = 0;
    setData((draft) => {
      draft[i][j] = currentValue;
    });
  };

  const onHtmlDropEvent = (e: any) => {
    //const a = getEventCoordsInGrid(e);
    const a = getEventCoordsInElement(e);
    //console.log("dropped to", a);
    setDropPos(a);
  };

  return (
    <GameGrid
      ref={dropRef}
      onDrop={onHtmlDropEvent}
      className="__bounding-rect"
      rows={10}
      cols={10}
      data={data}
      colors={DefaultColors}
      onCellClick={cellClick}
    />
  );
};
