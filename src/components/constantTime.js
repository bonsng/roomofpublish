export const YEAR = [];
const nowYear = new Date().getFullYear();
for (let i = 1900; i <= nowYear; i++) {
  YEAR.push(i);
}

export const MONTH = [];
for (let i = 1; i <= 12; i++) {
  let m = String(i).padStart(2, "0");
  MONTH.push(m);
}

export const DAY = [];
for (let i = 1; i <= 31; i++) {
  let d = String(i).padStart(2, "0");
  DAY.push(d);
}

export const RELATIONSHIP = ["", "본인", "가족", "지인"];
