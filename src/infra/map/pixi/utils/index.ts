import * as PIXI from 'pixi.js';

export class PixiUtils {
  private svg2img(svgString: string): any {
    const img = new Image();
    const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svg);
    img.src = url;
    return img;
  }
  public transformToSVGIcon(text: string) {
    return PIXI.Texture.fromURL(this.svg2img(text))
      .then((res) => res)
      .catch(() => null);
  }

  private vectorDistance(dx: number, dy: number) {
    return Math.sqrt(dx * dx + dy * dy);
  }

  public locationDistance(location1, location2, map) {
    const point1 = map.latLngToLayerPoint(location1),
      point2 = map.latLngToLayerPoint(location2),
      dx = point1.x - point2.x,
      dy = point1.y - point2.y;
    return this.vectorDistance(dx, dy);
  }

  public pointInCircle(centerPoint, checkPoint, radius) {
    const distance =
      (centerPoint.x - checkPoint.x) * (centerPoint.x - checkPoint.x) +
      (centerPoint.y - checkPoint.y) * (centerPoint.y - checkPoint.y);

    return distance <= radius * radius;
  }

  public getRadius(width, height) {
    return width / 2 + height / 2;
  }

  private toRad(value: any) {
    return (value * Math.PI) / 180;
  }

  private closestPoint(position1: any, position2) {
    const { lat: lat1, lng: lng1 } = position1;
    const { lat: lat2, lng: lng2 } = position2;

    const r = 6371000;
    const val1 = this.toRad(lat1);
    const val2 = this.toRad(lat2);
    const val3: any = this.toRad(lat2 - lat1);
    const val4: any = this.toRad(lng2 - lng1);

    const a =
      Math.sin(val3 / 2) * Math.sin(val3 / 2) +
      Math.cos(val1) * Math.cos(val2) * Math.sin(val4 / 2) * Math.sin(val4 / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = r * c;

    return d;
  }

  public getNearestLatLng(eLatLng, data) {
    if (!data || !data.length) {
      return null;
    }

    let target = data[0];

    const pos = {
      lat: eLatLng.lat,
      lng: eLatLng.lng,
    };

    const [lat = null, lng = null] = target.latlng || {};

    let closest = this.closestPoint({ lat, lng }, pos);

    data.forEach((item: any, index: number) => {
      const [lat = null, lng = null] = item.latlng || {};
      const tmp = this.closestPoint({ lat, lng }, pos);
      if (tmp <= closest) {
        target = {
          ...item,
          index,
        };
        closest = tmp;
      }
    });

    return target;
  }

  public closest(map, targetLocation, points) {
    if (points.length < 1) {
      return null;
    }

    return points.reduce((prev, curr) => {
      const prevDistance = this.locationDistance(
          targetLocation,
          prev.latlng,
          map,
        ),
        currDistance = this.locationDistance(targetLocation, curr.latlng, map);
      return prevDistance < currDistance ? prev : curr;
    });
  }
}
