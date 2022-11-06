import { type RefObject } from "react";
import { CANVAS_TOOLS } from "../types/canvas";

const Canvas: React.FC<{
  tool: CANVAS_TOOLS;
  canvasRef: RefObject<HTMLCanvasElement>;
  topOffset: number | null | undefined;
  context2d: CanvasRenderingContext2D | null | undefined;
}> = ({ tool, canvasRef, topOffset, context2d }) => {
  let prevPos: { x: number; y: number } | null = null;
  const offset = topOffset || 0;
  let isLeftClickPressed = false;

  const handleEvent = (event: any, eventType: string) => {
    if (!context2d) return;

    const { clientX, clientY } = event;

    const offsettedY = Math.abs(clientY - offset);
    if (!prevPos) prevPos = { x: clientX, y: offsettedY };

    switch (tool) {
      case CANVAS_TOOLS.FREE_HAND: {
        if (isLeftClickPressed && eventType === "move") {
          context2d.moveTo(prevPos.x, prevPos.y);
          context2d.lineTo(clientX, offsettedY);
          context2d.stroke();
        }

        prevPos.x = clientX;
        prevPos.y = offsettedY;
        break;
      }
    }
  };

  const mouseDown = (event: any) => {
    isLeftClickPressed = true;

    const { clientX, clientY } = event;
    if (tool === CANVAS_TOOLS.RECT) {
      if (!prevPos) {
        prevPos = { x: clientX, y: clientY };
      } else {
        prevPos.x = clientX;
        prevPos.y = clientY;
      }
    }
  };

  const mouseUp = (event: any) => {
    isLeftClickPressed = false;

    if (!context2d || !prevPos) return;

    const { clientX, clientY } = event;

    if (
      tool === CANVAS_TOOLS.RECT &&
      prevPos.x !== clientX &&
      prevPos.y !== clientY
    ) {
      context2d.lineWidth = 2;
      context2d.strokeRect(
        prevPos.x,
        Math.abs(offset - prevPos.y),
        clientX - prevPos.x,
        clientY - prevPos.y
      );
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={(e) => handleEvent(e, "move")}
      onClick={(e) => handleEvent(e, "click")}
    >
      {tool}
    </canvas>
  );
};

export default Canvas;
