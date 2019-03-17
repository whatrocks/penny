export default function(arr, quantile) {
  let id = arr.length * quantile - 1;
  if (id === Math.floor(id)) {
    return (
      (parseFloat(arr[id].latency_in_seconds) +
        parseFloat(arr[id + 1].latency_in_seconds)) /
      2.0
    );
  }
  id = Math.ceil(id);
  return parseFloat(arr[id].latency_in_seconds);
}
