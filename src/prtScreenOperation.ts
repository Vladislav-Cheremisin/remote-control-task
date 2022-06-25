import Jimp from "jimp";
import robot from "robotjs";

const makeScreenshot = async (): Promise<string | void> => {
  try {
    const mousePos = robot.getMousePos();
    const img = robot.screen.capture(
      mousePos.x - 100,
      mousePos.y - 100,
      200,
      200
    ).image;
    const jimpImg = new Jimp(200, 200);

    jimpImg.bitmap.data = img;

    const jimpImgBuffer = await jimpImg.getBufferAsync(Jimp.MIME_PNG);
    const result = jimpImgBuffer.toString("base64");

    return `prnt_scrn ${result}`;
  } catch (err) {
    console.log(
      "Something wrong happened with server. Please try again or contact with me: vladislav@cheremis.in"
    );
  }
};

export default makeScreenshot;
