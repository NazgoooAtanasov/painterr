import { CANVAS_TOOLS } from "../types/canvas";

const ToolPicker: React.FC<{ setTool: any }> = ({ setTool }) => {
  return (
    <nav className="p-4">
      <button className="mr-2" onClick={() => setTool(CANVAS_TOOLS.FREE_HAND)}>
        freehand
      </button>
      <button onClick={() => setTool(CANVAS_TOOLS.RECT)}>rectangle</button>
    </nav>
  );
};

export default ToolPicker;
