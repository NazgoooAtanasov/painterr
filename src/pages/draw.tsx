import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Canvas from "../components/canvas";
import ToolPicker from "../components/toolPicker";
import { CANVAS_TOOLS } from "../types/canvas";
import { useRef } from "react";

const DrawPage: NextPage = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<CANVAS_TOOLS>(CANVAS_TOOLS.FREE_HAND);
  const [context2d, setContext2d] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const topOffset: number | null | undefined =
    canvas.current?.parentElement?.offsetTop;

  useEffect(() => {
    if (canvas.current && canvas.current.parentElement) {
      canvas.current.width = canvas.current.parentElement.clientWidth;
      canvas.current.height = canvas.current.parentElement.clientHeight;

      setContext2d(canvas.current?.getContext("2d"));
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-black">
        <ToolPicker setTool={setTool} />
      </header>
      <main className="flex-grow">
        <Canvas
          tool={tool}
          canvasRef={canvas}
          topOffset={topOffset}
          context2d={context2d}
        />
      </main>
    </div>
  );
};

export default DrawPage;
