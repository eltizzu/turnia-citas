import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadValidator() {
  const code = await readFile(new URL("../inputValidation.js", import.meta.url), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TurniaInputValidation;
}

test("sanitiza texto y rechaza HTML o scripts", async () => {
  const validator = await loadValidator();

  const safe = validator.validateFields(
    { name: "  Lucia Gomez  ", note: "Prefiere tonos miel" },
    {
      name: { type: "text", required: true, max: 80 },
      note: { type: "text", max: 300 },
    },
  );

  assert.equal(safe.ok, true);
  assert.equal(safe.values.name, "Lucia Gomez");

  const unsafe = validator.validateFields(
    { name: "<script>alert(1)</script>", note: "hola" },
    { name: { type: "text", required: true, max: 80 }, note: { type: "text", max: 300 } },
  );

  assert.equal(unsafe.ok, false);
  assert.match(unsafe.errors[0], /no puede incluir HTML/i);
});

test("valida requeridos, email, numeros y longitud maxima", async () => {
  const validator = await loadValidator();

  const result = validator.validateFields(
    {
      email: "cliente@@mail",
      duration: "treinta",
      note: "x".repeat(301),
      phone: "",
    },
    {
      email: { type: "email", required: true, max: 160 },
      duration: { type: "number", required: true, min: 5, max: 600 },
      note: { type: "text", max: 300 },
      phone: { type: "phone", required: true, max: 40 },
    },
  );

  assert.equal(result.ok, false);
  assert.equal(result.errors.length, 4);
  assert.match(result.errors.join("\n"), /Email invalido/i);
  assert.match(result.errors.join("\n"), /Duracion debe ser numerico/i);
  assert.match(result.errors.join("\n"), /Nota supera/i);
  assert.match(result.errors.join("\n"), /Telefono es obligatorio/i);
});

