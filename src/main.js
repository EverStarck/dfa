const { types, parser } = require("./index");

const NT = types.NT;
const T = types.T;
const Rule = types.Rule;
const Grammar = types.Grammar;

function setStyles(valid, input, label) {
  if (valid) {
    input.classList =
      "block w-full p-4 text-sm text-green border border-green rounded-lg bg-bg_tertiary focus:ring-blue-500 focus:border-blue-500";
    label.classList = "block mb-2 text-sm font-medium text-green";
    label.innerHTML = "CFG Valid!";
    return;
  }

  input.classList =
    "block w-full p-4 text-sm text-red border border-red rounded-lg bg-bg_tertiary focus:ring-blue-500 focus:border-blue-500";
  label.classList = "block mb-2 text-sm font-medium text-red";
  label.innerHTML = "CFG Invalid!";
}

const cfgs = {
  0: Grammar([
    Rule("S", [NT("A"), NT("B")]),
    Rule("A", [T("a"), NT("A"), NT("A")]),
    Rule("A", [T("a"), NT("A")]),
    Rule("A", [T("a")]),
    Rule("B", [T("b"), NT("B")]),
    Rule("B", [T("b")]),
  ]),
  1: Grammar([
    Rule("S", [NT("A"), NT("B")]),
    Rule("S", [NT("C")]),
    Rule("A", [T("a"), NT("A"), T("b")]),
    Rule("A", [T("c"), T("b")]),
    Rule("B", [T("c"), NT("B"), T("d")]),
    Rule("B", [T("c"), T("d")]),
    Rule("C", [T("a"), NT("C"), T("d")]),
    Rule("C", [T("a"), NT("D"), T("d")]),
    Rule("D", [T("b"), NT("D"), T("c")]),
    Rule("D", [T("b"), T("c")]),
  ]),
  2: Grammar([
    Rule("S", [NT("S"), NT("S")]),
    Rule("S", [T("("), NT("S"), T(")")]),
    Rule("S", [T("("), T(")")]),
  ]),
};

function validate(idx) {
  const inputEl = document.querySelector(`#dfa${idx}_input`);
  const labelEl = document.querySelector(`#dfa${idx}_label`);
  const grammar = cfgs[idx];

  const input = inputEl.value;
  const valid = parser.parse(grammar, input).length > 0;

  setStyles(valid, inputEl, labelEl);
}

window.onload = function () {
  for (let i = 0; i < 3; i++) {
    const buttonEl = document.querySelector(`#dfa${i}_button`);
    buttonEl.onclick = () => validate(i);
  }
};
