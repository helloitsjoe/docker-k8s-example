const wait = () => new Promise(resolve => setTimeout(resolve, 200));

export const fetchData = value => {
  return wait().then(() =>
    fetch(`http://localhost:5000?sentence=${value}`)
      .then(res => Promise.all([res.ok, res.json()]))
      .then(([ok, jsonOrErr]) => {
        if (!ok) throw new Error(jsonOrErr.message);

        return jsonOrErr;
      })
  );
};
