export interface IDevices {
  audios: MediaDeviceInfo[];
  videos: MediaDeviceInfo[];
}

export const loadMediaDevices = async () => {
  try {
    const deviceInfos = await navigator.mediaDevices.enumerateDevices();

    const audios = deviceInfos.filter(
      (device) => device.kind === 'audioinput' && device.deviceId !== '',
    );

    const videos = deviceInfos.filter(
      (device) => device.kind === 'videoinput' && device.deviceId !== '',
    );

    return { audios, videos };
  } catch (err) {
    return err;
  }
};

export const getUserMedia = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  return stream;
};

export function stopAllDevices(stream) {
  if (!stream) {
    return;
  }
  stream.getTracks().forEach((track) => {
    track.stop();
  });
}
