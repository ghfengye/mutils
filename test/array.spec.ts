import { expect } from "chai";
import _ from "../src/entry-compiler";

describe("测试 数组操作 方法", () => {
  it("测试数组平铺", () => {
    const arr1 = [1,[2,3,[4,5]],[4],0];
    const arr2 = [1,2,3,4,5,4,0];
    expect(_.arrayFlat(arr1)).to.deep.equal(arr2);
  });

  it("测试交集", () => {
    const arr1 = [1, 2, "1"];
    const arr2 = [1, 2];
    const arr3 = [1, 2];
    expect(_.intersectionArray(arr1, arr2)).to.deep.equal(arr3);
  });

  it("测试差集", () => {
    const arr1 = [1, 2, "1"];
    const arr2 = [1, 2];
    const arr3 = ["1"];
    expect(_.differenceABArray(arr1, arr2)).to.deep.equal(arr3);
  });
});
