import moment from "moment";

export default function(filters, data) {
  const activeFilters = Object.keys(filters).filter(f => {
    const currentFilter = filters[f];
    return (
      (currentFilter.type === "select" && currentFilter.value !== "All") ||
      (currentFilter.type === "text" && currentFilter.value.length) ||
      (currentFilter.type === "greater" && currentFilter.value.length) ||
      (currentFilter.type === "datetime" && currentFilter.value)
    );
  });
  if (!activeFilters.length) {
    return data;
  }
  let filteredData = data;
  activeFilters.forEach(filter => {
    filteredData = filteredData.filter(ping => {
      if (filters[filter].type === "select") {
        return ping[filter] === filters[filter].value;
      } else if (filters[filter].type === "text") {
        return ping[filter].includes(filters[filter].value);
      } else if (filters[filter].type === "datetime") {
        const dt = moment(ping.request_time)
          .startOf("minute")
          .format("DD/MM/YYYY HH:mm");
        const ts = new Date(moment(dt).valueOf()).getTime();
        if (filter === "start_datetime") {
          console.log("ts: ", ts, filters[filter].value);
          return ts >= filters[filter].value;
        } else {
          console.log("ts end: ", ts, filters[filter].value);
          return ts <= filters[filter].value;
        }
      } else {
        // greater than filter
        console.log("ping(filter)", ping[filter]);
        return parseFloat(ping[filter]) >= parseFloat(filters[filter].value);
      }
    });
  });
  return filteredData;
}
