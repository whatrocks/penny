import { expect } from "chai";
import multiFilter from "@/utils/multiFilter.js";

const DATA = [
  {
    request_time: "2017-01-01 00:00:03.850000",
    service_name: "service_4777",
    http_method: "post",
    consumer_id: "consumer_566",
    latency_in_seconds: "5.013062396901898",
    response_code: "401"
  },
  {
    request_time: "2017-01-01 00:00:03.850000",
    service_name: "service_4724",
    http_method: "post",
    consumer_id: "consumer_72",
    latency_in_seconds: "6",
    response_code: "200"
  },
  {
    request_time: "2017-01-01 00:00:07.900000",
    service_name: "service_3828",
    http_method: "get",
    consumer_id: "consumer_1281",
    latency_in_seconds: "0.9981994115938102",
    response_code: "200"
  },
  {
    request_time: "2017-01-01 00:01:09.500000",
    service_name: "service_4010",
    http_method: "post",
    consumer_id: "consumer_1049",
    latency_in_seconds: "9",
    response_code: "500"
  }
];

describe("multiFilter util", () => {
  it("filters traffic data with Select style inputs", () => {
    const filters = {
      http_method: {
        value: "get",
        type: "select"
      }
    };
    expect(multiFilter(filters, DATA)).to.deep.equal([
      {
        request_time: "2017-01-01 00:00:07.900000",
        service_name: "service_3828",
        http_method: "get",
        consumer_id: "consumer_1281",
        latency_in_seconds: "0.9981994115938102",
        response_code: "200"
      }
    ]);
  });
  it("filters traffic data with text style inputs", () => {
    const filters = {
      service_name: {
        value: "7",
        type: "text"
      }
    };
    expect(multiFilter(filters, DATA)).to.deep.equal([
      {
        request_time: "2017-01-01 00:00:03.850000",
        service_name: "service_4777",
        http_method: "post",
        consumer_id: "consumer_566",
        latency_in_seconds: "5.013062396901898",
        response_code: "401"
      },
      {
        request_time: "2017-01-01 00:00:03.850000",
        service_name: "service_4724",
        http_method: "post",
        consumer_id: "consumer_72",
        latency_in_seconds: "6",
        response_code: "200"
      }
    ]);
  });
  it("filters traffic data with greater style inputs", () => {
    const filters = {
      latency_in_seconds: {
        value: "8",
        type: "greater"
      }
    };
    expect(multiFilter(filters, DATA)).to.deep.equal([
      {
        request_time: "2017-01-01 00:01:09.500000",
        service_name: "service_4010",
        http_method: "post",
        consumer_id: "consumer_1049",
        latency_in_seconds: "9",
        response_code: "500"
      }
    ]);
  });
  it("filters traffic data with datetime inputs", () => {
    const filters = {
      start_datetime: {
        value: "1483257660000",
        type: "datetime"
      }
    };
    expect(multiFilter(filters, DATA)).to.deep.equal([
      {
        request_time: "2017-01-01 00:01:09.500000",
        service_name: "service_4010",
        http_method: "post",
        consumer_id: "consumer_1049",
        latency_in_seconds: "9",
        response_code: "500"
      }
    ]);
  });
  it("filters traffic data with multiple filters", () => {
    const filters = {
      http_method: {
        value: "post",
        type: "select"
      },
      consumer_id: {
        value: "566",
        type: "text"
      }
    };
    expect(multiFilter(filters, DATA)).to.deep.equal([
      {
        request_time: "2017-01-01 00:00:03.850000",
        service_name: "service_4777",
        http_method: "post",
        consumer_id: "consumer_566",
        latency_in_seconds: "5.013062396901898",
        response_code: "401"
      }
    ]);
  });
  it("returns empty array when nothing matches", () => {
    const filters = {
      http_method: {
        value: "get",
        type: "select"
      },
      consumer_id: {
        value: "566",
        type: "text"
      }
    };
    expect(multiFilter(filters, DATA)).to.deep.equal([]);
  });
});
