import { CellSize, CellGap, Vector2 } from "./App";

export const getEventCoordsInElement: (e: any) => Vector2 = (e) => {
  var rect = e.target!.closest(".__bounding-rect").getBoundingClientRect();
  var posX = e.clientX - rect.left;
  var posY = e.clientY - rect.top;
  return { x: posX, y: posY };
};

export const pxToGridRound: (pos: Vector2) => Vector2 = (pos) => {
  const posX = Math.round(pos.x / (CellSize + CellGap));
  const posY = Math.round(pos.y / (CellSize + CellGap));
  return { x: posX, y: posY };
};

export const getEventCoordsInGrid: (e: any) => Vector2 = (e) => {
  var rect = e.target!.closest(".__bounding-rect").getBoundingClientRect();
  var posX = e.clientX - rect.left;
  var posY = e.clientY - rect.top;

  //size:5
  //gap:1
  //01234 5 67890 1 23456 7 89012 3 45678
  //xxxxx _ xxxxx _ xxxxx _ xxxxx _ xxxxx
  //00000 0 11111 1 22222 2 33333 3 44444
  //console.log(posX, posY);
  posX = Math.floor(posX / (CellSize + CellGap));
  posY = Math.floor(posY / (CellSize + CellGap));
  //console.log(posX, posY);

  //console.log(`x: ${posX}, y: ${posY}`);
  return { x: posX, y: posY };
};

export function generate2DArray(
  cols: number,
  rows: number,
  initialValue: number
): number[][] {
  // Create an empty array
  var array2D = [];

  // Loop through each row
  for (var i = 0; i < rows; i++) {
    // Create a new row
    var row = [];

    // Loop through each column
    for (var j = 0; j < cols; j++) {
      // Set the initial value for each cell
      row.push(initialValue);
    }

    // Add the row to the 2D array
    array2D.push(row);
  }

  return array2D;
}

export const logMatrix = (matrix: number[][]) => {
  let buffer = "";
  for (const row of matrix) {
    buffer += row.join("") + "\n";
  }
  console.log(buffer);
};
