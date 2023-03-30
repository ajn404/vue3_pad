import type p5 from 'p5';
import type { p5Option } from '..';
export interface bubbleSortViewOption extends p5Option {
  rate?: number;
}

export const bubbleSortView = (
  sketch: p5,
  container: HTMLElement | null,
  option?: bubbleSortViewOption
) => {
  let i = 0;
  let values: number[] = [];
  const width: number = option?.width || 1;

  const rate = option?.rate || 60;

  let calculate = 0;
  sketch.setup = () => {
    i = 0;
    sketch.createCanvas(
      container?.clientWidth || sketch.windowWidth,
      container?.clientHeight || sketch.windowHeight
    );
    sketch.frameRate(rate);
    values = new Array(Math.round(sketch.width / width));
    for (let n = 0; n < values.length; n++) {
      values[n] = sketch.random(sketch.height);
    }
  };

  sketch.draw = () => {
    sketch.background(0);

    //核心冒泡排序代码块

    if (i < values.length) {
      for (let j = 0; j < values.length - i - 1; j++) {
        const a = values[j];
        const b = values[j + 1];
        if (a > b) {
          [values[j], values[j + 1]] = [b, a];
          calculate++;
        }
      }
    } else {
      sketch.noLoop();
      console.log('n=', values.length, '一共交换', calculate, '次');
    }
    i++;
    for (let m = 0; m < values.length; m++) {
      sketch.stroke(
        (((m * width) / 10) % 200) + 50,
        (((m * width) / 10) % 355) - 100,
        (((m * width) / 10) % 55) + 200
      );
      sketch.strokeWeight(width);

      const line_height = sketch.height - values[m];
      sketch.line(m * width, sketch.height, m * width, line_height);
    }
  };

  sketch.mousePressed = () => {};
};
