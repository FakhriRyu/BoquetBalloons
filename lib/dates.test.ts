import assert from "node:assert/strict";
import { test } from "node:test";
import { addDays, isIsoDate, isMonth, monthRange, shiftMonth, todayWIB } from "./dates.ts";

test("todayWIB memakai zona Jakarta, bukan UTC", () => {
  // 18:30 UTC tanggal 14 = 01:30 WIB tanggal 15
  assert.equal(todayWIB(new Date("2026-11-14T18:30:00Z")), "2026-11-15");
  assert.equal(todayWIB(new Date("2026-11-14T16:59:00Z")), "2026-11-14");
});

test("monthRange dan shiftMonth melewati pergantian tahun", () => {
  assert.deepEqual(monthRange("2026-12"), { start: "2026-12-01", end: "2027-01-01" });
  assert.equal(shiftMonth("2026-01", -1), "2025-12");
  assert.equal(shiftMonth("2026-12", 1), "2027-01");
});

test("addDays dan validasi", () => {
  assert.equal(addDays("2026-02-28", 1), "2026-03-01");
  assert.equal(isIsoDate("2026-11-15"), true);
  assert.equal(isIsoDate("15/11/2026"), false);
  assert.equal(isMonth("2026-13"), false);
  assert.equal(isMonth("2026-01"), true);
});
