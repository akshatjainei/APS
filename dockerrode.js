const Docker = require('dockerode');
const docker = new Docker({ host: '0.0.0.0', port: 80 });

const imageName = 'keshavdock12/carpark-app';
docker.pull(imageName, (err, stream) => {
    if (err) {
        return console.error('Error pulling image:', err);
    }

    docker.modem.followProgress(stream, onFinished, onProgress);

    function onFinished(err, output) {
        if (err) {
            return console.error('Error on finished:', err);
        }

        docker.createContainer({
            Image: imageName,
            Tty: true
        }, (err, container) => {
            if (err) {
                return console.error('Error creating container:', err);
            }

            container.start((err, data) => {
                if (err) {
                    return console.error('Error starting container:', err);
                }

                console.log('Container started successfully:', data);
            });
        });
    }

    function onProgress(event) {
        console.log('Progress:', event);
    }
});