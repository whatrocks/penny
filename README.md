# 🕵️‍♀️ penny

🕵️‍♀️ Penny is your friendly neighborhood HTTP traffic inspector app.

## High-level Features

* Comprehensive dashboard with multiple filters
* Zoomable metrics to help triage traffic irregularities
* Sharable URLs to get your team on the same page
* Service-level statistics to find bottlenecks

### Detailed Features

#### Dashboard Components

* **Queries per Minute**: Track network throughput over time
* **Latency Statistics per Minute**: Statistical overview of latency
* **Errors per Minute**: View spikes in 4xx and 5xx errors
* **Average Latency by Service**: Identify potentially overloaded services

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

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Data exploration utilities

Convert CSV to JSON:

```
../node_modules/csvtojson/bin/csvtojson traffic.csv > converted.json
```

Explore the data (group and view by parameter):
```
python ./scripts/summarize.py
```

