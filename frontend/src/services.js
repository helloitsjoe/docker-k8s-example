const KUBE_NODE_URL = 'http://192.168.64.2:31577';
const DOCKER_COMPOSE_URL = 'http://localhost:8080';
const DOCKER_LOCAL_URL = 'http://localhost:5000';

const wait = () => new Promise(resolve => setTimeout(resolve, 200));

export const fetchData = value => {
  return wait().then(() =>
    fetch(`${KUBE_NODE_URL}?sentence=${value}`)
      .then(res => Promise.all([res.ok, res.json()]))
      .then(([ok, jsonOrErr]) => {
        if (!ok) throw new Error(jsonOrErr.message);

        return jsonOrErr;
      })
  );
};
