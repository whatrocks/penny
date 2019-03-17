import { expect } from "chai";
import quantile from "@/utils/quantile.js";

describe("quantile util", () => {
  const arr = [
    {
      latency_in_seconds: 1
    },
    {
      latency_in_seconds: 2
    },
    {
      latency_in_seconds: 3
    },
    {
      latency_in_seconds: 4
    },
    {
      latency_in_seconds: 5
    },
    {
      latency_in_seconds: 6
    },
    {
      latency_in_seconds: 7
    },
    {
      latency_in_seconds: 8
    },
    {
      latency_in_seconds: 9
    },
    {
      latency_in_seconds: 10
    }
  ];
  it("provides the median of a sorted array when q = .5", () => {
    expect(quantile(arr, 0.5)).to.equal(5.5);
  });
  it("provides the p75 of a sorted array when q = .75", () => {
    expect(quantile(arr, 0.75)).to.equal(8);
  });
  it("provides the p90 of a sorted array when q = .9", () => {
    expect(quantile(arr, 0.9)).to.equal(9.5);
  });
});
