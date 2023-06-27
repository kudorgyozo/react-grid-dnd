import "./styles.css";
import { GameTable } from "./GameTable";
import { GamePiece } from "./GamePiece";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useImmer } from "use-immer";

export type PieceInfo = {
  id: number;
  rows: number;
  cols: number;
  data: number[][];
  placed?: boolean;
};

export const GridSize = 10;
export const CellSize = 20;
export const CellGap = 1;

export type Vector2 = {
  x: number;
  y: number;
};

export type PieceDragInfo = {
  pos: Vector2;
  id: number;
};

const thePieces: PieceInfo[] = [
  {
    id: 1,
    rows: 4,
    cols: 1,
    data: [
      [1], // this is a comment to stop the formatter from formatting
      [1],
      [1],
      [1],
    ],
  },
  {
    id: 2,
    rows: 2,
    cols: 3,
    data: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
];

export default function App() {
  const [pieces, setPieces] = useImmer<PieceInfo[]>(thePieces);

  const onRotate = (
    id: number,
    data: number[][],
    rows: number,
    cols: number
  ) => {
    setPieces((draft) => {
      const piece = draft.find((p) => p.id === id);
      if (!piece) return;
      piece.data = data;
      piece.rows = rows;
      piece.cols = cols;
    });
  };

  const onDrop = (id: number) => {
    setPieces((draft) => {
      const piece = draft.find((p) => p.id === id);
      piece!.placed = true;
    });
  };

  console.log("app pieces", pieces);
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <GamePiece piece={pieces[0]} onRotate={onRotate} />
        <GamePiece piece={pieces[1]} onRotate={onRotate} />
        <br />
        <br />
        <GameTable pieces={pieces} onDrop={onDrop} />
      </DndProvider>
    </div>
  );
}
