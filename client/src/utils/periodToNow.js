export const periodToNow = (sinceTime, unit="H") => {
/* Componente "tonto" creado para practicar los tests de jest, 
    Devuelve el periodo transcurrido desde la fecha/hora recibida hasta el momento actual, medido en la unidad de tiempo también recibida 
    Usado para mostrar los datos de conexión
*/
    const now = new Date();
    const milisec = now.getTime() - sinceTime.getTime();
    switch(unit) {
        case "H": // horas
            return milisec / 3600000;
        case "M": // minutos
            return milisec / 60000;
        default:
            return -1;
    }

    
}