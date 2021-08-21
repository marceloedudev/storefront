/* eslint-disable no-console */

import { useCallback, useEffect, useState } from 'react';

const useRenderDots = ({ mapRef, renderDots, randomDots }) => {
  const [data] = useState(randomDots.markerData);

  const onDotsHandler = useCallback(async () => {
    try {
      if (!data.length || !mapRef) {
        return;
      }

      const refPixi = await renderDots({
        mapElement: mapRef,
        onClick: (item) => {
          console.log('item: ', item);
        },
        markerData: {
          data,
        },
        textureData: {
          data: randomDots.textureData,
        },
      });

      return () => {
        refPixi.removeClick(mapRef);
      };
    } catch (err) {
      console.error(err);
    }
  }, [data, mapRef, randomDots.textureData, renderDots]);

  useEffect(() => {
    void (async () => {
      onDotsHandler();
    })();
  }, [onDotsHandler]);
};

export default useRenderDots;
