import { pruebaParaTest } from "../src/utils/pruebaParaTest";

// Definimos un bloque describe para dar contexto a los tests
describe("#pruebaParaTest", () => {
    // Definimos un test para comprobar que devuelve "Hola"
    it("responde Hola", () => {
      expect(pruebaParaTest()).toBe("Hola");
    });
  });