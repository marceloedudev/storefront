import { PixiUtils } from '../utils';

export class PixiBuilder extends PixiUtils {
  private _textureID;
  private data: Array<any> = [];

  constructor(textureID) {
    super();
    this._textureID = textureID;
  }

  public static textureID(textureID) {
    return new PixiBuilder(textureID);
  }

  public color(color: string) {
    const exists = this.data.find((item) => item.textureID === this._textureID);

    if (!exists) {
      this.data.push({
        textureID: this._textureID,
        color,
      });
    }
    return this;
  }

  public texture(texture: any): any {
    return this.transformToSVGIcon(texture)
      .then((res) => {
        const textureData = {
          textureID: this._textureID,
          texture: res,
        };
        this.data.push(textureData);
        return textureData;
      })
      .catch(() => {
        return this.data;
      });
  }

  public build() {
    return this.data;
  }
}
