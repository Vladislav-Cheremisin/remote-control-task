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
    let bitmapIndex = 0;

    jimpImg.scan(
      0,
      0,
      jimpImg.bitmap.width,
      jimpImg.bitmap.height,
      (x, y, idx) => {
        jimpImg.bitmap.data[idx + 2] = img.readUInt8(bitmapIndex++);
        jimpImg.bitmap.data[idx + 1] = img.readUInt8(bitmapIndex++);
        jimpImg.bitmap.data[idx + 0] = img.readUInt8(bitmapIndex++);
        jimpImg.bitmap.data[idx + 3] = img.readUInt8(bitmapIndex++);
      }
    );

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
