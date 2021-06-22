const url = "https://api.coincap.io/v2/assets?limit=20";
const urlA = "https://api.coincap.io/v2/assets";
function getAssets() {
  return fetch(url)
    .then((response) => response.json())
    .then((res) => res.data);
}

function getAsset(coin) {
  return fetch(`${urlA}/${coin}`)
    .then((response) => response.json())
    .then((res) => res.data);
}

function getAssetHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();
  return fetch(`${urlA}/${coin}/history?interval=h1&start=${start}&end=${end}`)
    .then((res) => res.json())
    .then((res) => res.data);   
}

export default { getAssets, getAsset, getAssetHistory };
