import React from "react";
import styled from "styled-components";
import { forwardRef } from "react";

export const DefaultColors: Record<number, string> = {
  0: "#dddddd",
  1: "#F2BEBE",
  2: "#B9E6B8"
};

type StyledGridProps = {
  cols: number;
  rows: number;
};

export const StyledGrid = styled.div<StyledGridProps>`
  display: inline-grid;
  grid-template-columns: repeat(
    ${(props: StyledGridProps) => props.cols},
    20px
  );
  grid-template-rows: repeat(${(props: StyledGridProps) => props.rows}, 20px);
  gap: 1px;
`;

type StyledGridItemProps = {
  state: number;
  colors: Record<number, string>;
};

export const StyledGridCell = styled.div<StyledGridItemProps>`
  background-color: ${(props: StyledGridItemProps) =>
    props.colors[props.state]};
`;

type GameGridProps = React.DOMAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> &
  StyledGridProps & {
    data: number[][];
    onCellClick?: (i: any, j: any) => any;
    colors: Record<number, string>;
  };

export const GameGrid = forwardRef((props: GameGridProps, ref) => {
  const { onCellClick, data, colors, ...rest } = props;
  return (
    <StyledGrid {...rest} ref={ref}>
      {props.data.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((col, j) => (
            <StyledGridCell
              key={`${i}-${j}`}
              state={col}
              colors={props.colors}
              onClick={() => props.onCellClick?.(i, j)}
            />
          ))}
        </React.Fragment>
      ))}
    </StyledGrid>
  );
});
