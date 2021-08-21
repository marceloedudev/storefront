import { PixiBuilder, PixiRender } from '@infra/map/pixi';

import { pointTextureSVG } from '@resources/markers-texture';

export const renderDots = async ({
  mapElement,
  markerData,
  textureData,
  onClick,
}) => {
  const textures: any = await Promise.all(
    textureData.data.map(async (item) => {
      return {
        ...(await PixiBuilder.textureID(item.textureID).texture(
          pointTextureSVG(item.color),
        )),
      };
    }),
  );

  const render: any = new PixiRender(textures)
    .build()
    .setupMap(mapElement)
    .setupClickNearest(mapElement)
    .create(markerData);

  render.onClickNearest = onClick;

  return render;
};
