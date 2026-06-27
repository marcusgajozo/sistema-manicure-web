import { describe, expect, it } from "vitest";

import { generateUrl } from "./generate-url";
import { APP_ROUTES } from "./routes";

describe("generateUrl", () => {
  it("returns static routes without params", () => {
    expect(generateUrl(APP_ROUTES.clientes.list)).toBe("/clientes");
    expect(generateUrl(APP_ROUTES.login)).toBe("/entrar");
  });

  it("replaces dynamic route params", () => {
    expect(generateUrl(APP_ROUTES.clientes.edit, { id: "abc-123" })).toBe(
      "/clientes/abc-123/editar",
    );
  });

  it("encodes dynamic route params", () => {
    expect(generateUrl(APP_ROUTES.clientes.edit, { id: "a/b" })).toBe(
      "/clientes/a%2Fb/editar",
    );
  });

  it("throws when a required param is missing at runtime", () => {
    expect(() =>
      generateUrl(APP_ROUTES.clientes.edit, {} as { id: string }),
    ).toThrow('Missing route param "id"');
  });
});
