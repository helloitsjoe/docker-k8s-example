# Docker/Kubernetes Example

Following the example at https://github.com/rinormaloku/k8s-mastery, but with a Node server. A
sentiment analysis app, with containers serving:

- Preact frontend running on nginx
- Express server in front of a Python (Flask) sentiment analysis service

## Docker

### `frontend`:

```
docker run -dp 80:80 helloitsjoe/preact-frontend
```

### `node-server`:

```
docker run -dp 5000:8080 -e SA_LOGIC_URL=http://<logic container IP>:5000 helloitsjoe/node-server
```

### `sa-logic`:

```
docker run -dp 5050:5000 helloitsjoe/sa-logic
```
