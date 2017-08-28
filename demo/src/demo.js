// import JsonConverter from 'json-dot-notation-converter';
import JsonConverter from '../../dist/JsonDotNotationConverter';

const dataSet = {
  items: [
    {
      a: 'London',
      b: '1500',
      nested: {
        a: 'John doe',
        b: '28',
        c: 'UK',
      }
    }
  ]
};


const converter = new JsonConverter(dataSet);

const results = converter.convert([
  [
    ['items[].a', 'items[].city'],
    ['items[].b', 'items[].price'],
    ['items[].nested', 'items[].user']
  ],
  [
    ['items[].user.a', 'items[].user.name'],
    ['items[].user.b', 'items[].user.age'],
    ['items[].country', 'items[].user.c'],
  ]
]);

console.log(JSON.stringify(results));
