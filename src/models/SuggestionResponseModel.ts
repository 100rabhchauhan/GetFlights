interface SuggestionResponse {
    result: Array<FlightSuggestion>
}

interface FlightSuggestion{
    id:string,
    fare: number,
    displayData: DisplayData
}

interface DisplayData {
    totalDuration:string,
    stopInfo:string,
    source: Source,
    destination:Destination,
    airlines: Array<AirlinesInfo>
}

interface Source{
    depTime: string,
    airport: AirportInfo
}

interface AirportInfo{
    airportCode:string,
    airportName:string,
    cityCode:string,
    cityName:string,
    countryCode:string,
    countryName:string,
    terminal:string
}

interface Destination{
    arrTime: string,
    airport: AirportInfo
}

interface AirlinesInfo{
    airlineCode:string,
    airlineName: string,
    flightNumber: string
}

export {type SuggestionResponse, type Source, type Destination, type AirlinesInfo,type AirportInfo,type FlightSuggestion}