import robot from "robotjs";

import mousePosition from "./types";

class MouseOperations {
  mouseUp(distanceInPx: number): void {
    const mousePos: mousePosition = robot.getMousePos();

    robot.moveMouse(mousePos.x, mousePos.y - distanceInPx);
  }

  mouseDown(distanceInPx: number): void {
    const mousePos: mousePosition = robot.getMousePos();

    robot.moveMouse(mousePos.x, mousePos.y + distanceInPx);
  }

  mouseLeft(distanceInPx: number): void {
    const mousePos: mousePosition = robot.getMousePos();

    robot.moveMouse(mousePos.x - distanceInPx, mousePos.y);
  }

  mouseRight(distanceInPx: number): void {
    const mousePos: mousePosition = robot.getMousePos();

    robot.moveMouse(mousePos.x + distanceInPx, mousePos.y);
  }

  getMousePosition(): string {
    const mousePos: mousePosition = robot.getMousePos();

    return `mouse_position ${mousePos.x}px,${mousePos.y}px`;
  }
}

const mouseOps = new MouseOperations();

export default mouseOps;
