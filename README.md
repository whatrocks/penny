# penny

TODO:
* [ ] remove flux since not needed
* [ ] create user journey docs
* [ ] figure out charts
* [ ] fix / write tests
* [ ] append to url query string so it can be shared

 - error monitoring: which services have lots of 400/500
- drag to select the range
- QPM / QPS, error rate, traffic pattern

- count 200s or 500s per minute
https://docs.particular.net/samples/logging/prometheus-grafana/


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
