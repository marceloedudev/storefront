import * as PIXI from 'pixi.js';

import leaflet, { LatLng } from 'leaflet';

import { PixiUtils } from '../utils';

const L: any = leaflet;

export class PixiRender extends PixiUtils {
  private loader;
  private textures = [];
  private pixiLayer;
  private pixiContainer;
  private markers: Array<any> = [];
  private map: any;
  private oldPixiLayer: any;

  public onClick!: (item: any) => void;
  public onClickNearest!: (item: any) => void;

  constructor(textures) {
    super();
    this.loader = new PIXI.Loader();
    this.textures = textures;
  }

  public build() {
    this.textures.forEach(({ textureID, texture }) => {
      if (!this.loader.resources[textureID]) {
        this.loader.add(textureID, { texture });
        this.loader.resources[textureID].texture = texture;
      }
    });
    return this;
  }

  public setupMap(map: any) {
    this.map = map;

    return this;
  }

  public setupClick(map?) {
    (map || this.map).on('click', this.tryClick, this);

    return this;
  }

  public setupClickNearest(map?) {
    (map || this.map).on('click', this.tryClickNearest, this);

    return this;
  }

  public removeClick(map?) {
    (map || this.map).off('click', this.tryClick, this);
    (map || this.map).off('click', this.tryClickNearest, this);

    return this;
  }

  public create(props) {
    const { data } = props;

    this.pixiLayer = null;

    if (this.pixiContainer) {
      this.pixiContainer.removeChildren();

      if (this.oldPixiLayer) {
        this.map.removeLayer(this.oldPixiLayer);
      }
    }

    this.loader.load((loader, resources) => {
      if (!this.pixiContainer) {
        this.pixiContainer = new PIXI.Container();
      }

      this.markers = [];

      const doubleBuffering =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream;

      this.pixiLayer = L.pixiOverlay(
        (utils, event) => {
          const container = utils.getContainer();
          const renderer = utils.getRenderer();
          const project = utils.latLngToLayerPoint;
          const scale = utils.getScale();
          const invScale = 1 / scale;

          switch (event.type) {
            case 'add': {
              data.forEach((item) => {
                const { data, latitude, longitude, rotate, textureID } = item;

                if (resources[textureID]) {
                  const markerTexture = resources[textureID].texture;

                  const latlng = [latitude, longitude];
                  const coords = project(latlng);

                  const markerSprite: any = new PIXI.Sprite(markerTexture);
                  markerSprite.data = data;
                  markerSprite.textureID = textureID;
                  markerSprite.x = coords.x;
                  markerSprite.y = coords.y;
                  markerSprite.rotate = rotate;
                  markerSprite.latlng = latlng;
                  markerSprite.anchor.set(0.5, 0.5);
                  markerSprite.scale.set(invScale);

                  this.pixiContainer.addChild(markerSprite);
                  this.markers.push(markerSprite);
                }
              });

              break;
            }
            case 'update': {
              const newData = event.data;

              this.markers.forEach((marker) => {
                const findMarker = newData?.find(
                  (item) => item.textureID === marker.textureID,
                );

                if (findMarker) {
                  const { data, latitude, longitude, rotate } = findMarker;

                  const latlng = [latitude, longitude];
                  const projected = project(latlng);

                  marker.x = projected.x;
                  marker.y = projected.y;
                  marker.latlng = latlng;
                  marker.rotation = rotate;
                  marker.data = data;
                }
              });

              break;
            }
          }

          if (scale >= 0.25) {
            this.markers.forEach((marker) => {
              marker.scale.set(invScale);
            });
          }

          renderer.render(container);
        },
        this.pixiContainer,
        {
          doubleBuffering,
          destroyInteractionManager: true,
        },
      );

      if (this.oldPixiLayer) {
        this.map.removeLayer(this.oldPixiLayer);
      }

      this.oldPixiLayer = this.pixiLayer;

      this.pixiLayer.addTo(this.map);
    });

    return this;
  }

  public update({ data }) {
    if (!this.pixiLayer) {
      return;
    }

    this.pixiLayer.redraw({
      type: 'positionUpdate',
      markersData: data,
    });

    return this;
  }

  private tryClick(event) {
    const { lat, lng } = event.latlng;

    const found: any = this.closest(this.map, [lat, lng], this.markers);

    if (found === null) {
      return;
    }

    const foundLatLng = new LatLng(found.latlng[0], found.latlng[1]);

    const xy = this.map.latLngToLayerPoint(foundLatLng);

    const { width, height } = found.texture;

    const radius = this.getRadius(width, height);

    if (this.pointInCircle(xy, event.layerPoint, radius)) {
      if (this.onClick) {
        this.onClick(found);
      }
    }
  }

  private tryClickNearest(event) {
    const found = this.getNearestLatLng(event.latlng, this.markers);

    if (found) {
      if (this.onClickNearest) {
        this.onClickNearest(found);
      }
    }
  }
}
