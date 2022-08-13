const detectWebcam = async () => {
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices || !mediaDevices.enumerateDevices) {
        return false;
    }
    const devices = await mediaDevices.enumerateDevices();
    console.log(devices);
    // @ts-ignore: Typescript error
    return devices.some(device => device.kind === 'videoinput');
};

export default detectWebcam;