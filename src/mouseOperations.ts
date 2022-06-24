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

  drawCircle(radius: number): void {
    const mousePos: mousePosition = robot.getMousePos();

    robot.mouseToggle("down");

    for (let i = 0; i <= Math.PI * 2; i += 0.02) {
      const x = mousePos.x - radius * Math.cos(i) + radius;
      const y = mousePos.y + radius * Math.sin(i);

      robot.dragMouse(x, y);
    }

    robot.mouseToggle("up");
  }

  drawRectangle(width: number, length: number): void {
    const mousePos: mousePosition = robot.getMousePos();
    let currentXPos: number = mousePos.x;
    let currentYPos: number = mousePos.y;

    robot.mouseToggle("down");

    for (let i = 0; i < width; i++) {
      currentXPos += 1;

      robot.dragMouse(currentXPos, currentYPos);
    }

    for (let i = 0; i < length; i++) {
      currentYPos += 1;

      robot.dragMouse(currentXPos, currentYPos);
    }

    for (let i = 0; i < width; i++) {
      currentXPos -= 1;

      robot.dragMouse(currentXPos, currentYPos);
    }

    for (let i = 0; i < length; i++) {
      currentYPos -= 1;

      robot.dragMouse(currentXPos, currentYPos);
    }

    robot.mouseToggle("up");
  }
}

const mouseOps = new MouseOperations();

export default mouseOps;
