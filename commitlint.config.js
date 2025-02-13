module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["fix", "FIX", "enh", "ENH", "chg", "CHG"]],
    "type-case": [2, "always", ["lower-case", "upper-case", "pascal-case"]],
    "subject-case": [
      2,
      "always",
      ["lower-case", "upper-case", "pascal-case", "sentence-case"],
    ],
  },
};
