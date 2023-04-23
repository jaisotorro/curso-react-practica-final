// Los selectores te permiten obtener datos del store de
// redux. Con relesect, estos valores se memorizan e incluso
// puedes crear combinaciones fácilmente

// Un selector básico para obtener el nombre.
export const getName = (state) => state.user.name;
