# penny

TODO:
* [ ] remove flux since not needed
* [ ] create user journey docs
* [ ] figure out charts
* [ ] fix / write tests


 - error monitoring: which services have lots of 400/500
 - ranking services by latencies
- drag to select the range
- QPM / QPS, error rate, traffic pattern

- convert latency to persecond metrics
p75, p95, p90, p99
p95 = 500ms  (95% of the requests with than minute or second is below or equal to 500s)

- count 200s or 500s per minute
https://docs.particular.net/samples/logging/prometheus-grafana/


for given time range
(sort all data points)
avg = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
multiple length of data points by 90% (less or equal)
p50% is same as median
avg
count




NOTES:

converted to json
```bash
../node_modules/csvtojson/bin/csvtojson traffic.csv > converted.json
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
