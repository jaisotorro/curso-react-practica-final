import { periodToNow } from "../src/utils/periodToNow";

describe("#periodToNow", () => {
    const now = new Date();
    const hace1Hora = new Date(new Date() - 3600000);

    it("Devuelve 1 si se le pasa 1h antes que ahora y 'H' ", () => {
      expect(periodToNow(sinceTime = hace1Hora, unit = "H")).toBe("1");
    });
  });