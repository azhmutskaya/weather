export const iconHelper = (id: number, isDay: boolean): string => {
  switch (id) {
    case 800:
      return isDay ? 'sun' : 'moon';
    case 801:
      return isDay ? 'cloudy1' : 'cloudy3';
    case 802:
      return isDay ? 'cloudy2' : 'cloudy3';
    case 803:
      return 'clouds1';
    case 804:
      return 'clouds2';
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      return 'rain1';
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
    case 520:
    case 521:
    case 522:
    case 531:
      return 'rain2';
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      return 'thunderstorm';
    case 511:
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      return 'snow';
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      return 'mist';
    default:
      return 'logo';
  }

};
