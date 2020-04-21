# Docker/Kubernetes Example

Following the example at https://github.com/rinormaloku/k8s-mastery, but with a Node server. A
sentiment analysis app, with containers serving:

- Preact frontend running on nginx
- Express server in front of a Python (Flask) sentiment analysis service

## Docker

### To run all 3 docker containers

```
docker-compose up [--build]
```

### To run containers individually

#### `frontend`:

```
docker run -dp 80:80 helloitsjoe/preact-frontend
```

#### `node-server`:

```
docker run -dp 5000:8080 -e SA_LOGIC_URL=http://<logic container IP>:5000 helloitsjoe/node-server
```

#### `sa-logic`:

```
docker run -dp 5050:5000 helloitsjoe/sa-logic
```

## Kubernetes

All service and deployment `yml` files are in the `resource-manifests` directory. Either run them individually:

```
kubectl apply -f <service or deployment>.yml
```

Or all at once:

```
kubectl apply -f .
```

### Making changes

If you make changes to a project, you'll need to do a few things to update kubernetes. For example, after making changes to `frontend`:

1. Rebuild from `src`: `yarn build` (within the `frontend` directory)
2. Rebuild docker image: `docker build -t helloitsjoe/preact-frontend:minikube .`
3. Push to docker hub: `docker push helloitsjoe/preact-frontend:minikube`
4. Bring down the running kubernetes pod: `kubectl delete -f preact-frontend-deployment.yml`
5. Restart it: `kubectl apply -f preact-frontend-deployment.yml`

Despite the `imagePullPolicy: Always` in the `deployment.yml`, it will not pull a new image without restarting (`apply` is not enough)

### Starting a new node service

If you need to start a new node service (or bring it down and back up), you'll need to update the URL in the frontend's `src/services.js`, since the IP address and port are hardcoded. Update the `NODE_URL` and follow the instructions above to rebuild the frontend container.
