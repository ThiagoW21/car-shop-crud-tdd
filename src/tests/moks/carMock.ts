import {ICar} from '../../interfaces/ICar';

const carMock: ICar = {
  model: "Fiat Uno Power Ultra Hardcore",
  year: 2010,
  color: "Dourato Diamante",
  buyValue: 8800000,
  seatsQty: 4,
  doorsQty: 4
};

const carMockWithId: ICar & { _id:string } = {
  _id: "62cf1fc6498565d94eba52cd",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockAll: ICar[] = [
  {
    // _id: "62cf1fc6498565d94ebacoco",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2,
  },
  {
    // _id: "62cf1fc6498565d94ebaave",
    model: "Ferrari Caramelinho",
    year: 2000,
    color: "rosa",
    buyValue: 3505343,
    seatsQty: 4,
    doorsQty: 2,
  }
];

const carInvalidDataMock: ICar = {
  model: "Fiat Uno Power Ultra Hardcore",
  year: 2876,
  color: "Dourato Diamante",
  buyValue: 88000,
  seatsQty: 7,
  doorsQty: 2
};

export { carMock, carMockWithId, carMockAll, carInvalidDataMock };