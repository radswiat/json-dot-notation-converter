# [ JDN ]
# Json DOT Notation Converter
Convert JSON / OBJECT by instructions.
Instructions are string dot notation directives.

## Example

#### Input:
```
{
  items: [{
    a: 'London',
    b: '1500',
    nested: {
      a: 'John doe',
      b: '28',
      c: 'UK',
    }
  }]
}
```

#### Instructions:
```
  [
    ['items[].a', 'items[].city'],
    ['items[].b', 'items[].price'],
    ['items[].nested', 'items[].user']
  ],
  [
    ['items[].user.a', 'items[].user.name'],
    ['items[].user.b', 'items[].user.age'],
    ['items[].user.c', 'items[].country'],
  ]
]
```

#### Output:
```
{
  "items": [{
    "city": "London",
    "price": "1500",
    "country": "UK",
    "user": {
      "name": "John doe",
      "age": "28"
    }
  }]
}
```

# Examples and explanation

#### Rename `name` into `surname`
`input`:        { name: 'A' } <br>
`instruction`:  ['data.name', 'data.surname'] <br>
`output`:       { surname: 'A' } <br>

input | instruction | output
--- | --- | ---
{ name: 'A' } | ['name', 'surname'] | { surname: 'A' }

#### Copy `name` into `surname`
Copy is a special attribute that can be added to instruction.

input | instruction | output
--- | --- | ---
{ name: 'A' } | ['name', 'surname', `['copy']`] | { name: 'A', surname: 'A' }

#### Move `price` from object to parent
input | instruction | output
--- | --- | ---
{ name: 'A', car: { type: 'Mazda', price: 100 }} | ['car.price', 'price'] | { name: 'A', price: 100, car: { type: 'Mazda' }}

#### Move `price` from object to not existing object
input | instruction | output
--- | --- | ---
{ name: 'A', car: { type: 'Mazda', price: 100 }} | ['car.price', 'price.mazda'] | { name: 'A', car: { type: 'Mazda' }, mazda: { price: 100 }}

#### Move all `price` from array object
input | instruction | output
--- | --- | ---
{ name: 'A', cars: [{ type: 'Mazda', price: 100 }]} | ['cars[].price', 'prices[].price'] | { name: 'A', cars: [{ type: 'Mazda' }], prices: [{ price: 100 }]}
