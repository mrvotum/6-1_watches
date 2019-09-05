import React, { useState } from 'react';
import Watch from './Watch';
import Input from './Input';

const cities = [
  {
    city: 'Москва',
    id: '12345',
    offset: 3,
  },
  {
    city: 'Лондон',
    id: '67891',
    offset: 0,
  },
];

const makeID = () =>
  Math.random()
    .toString()
    .slice(2, 10);

export default function() {
  const [citiesArray, setCities] = useState(cities);

  function handleDelete(id) {
    setCities(citiesArray.filter(city => city.id !== id));
  }

  function handleAdd(input) {
    input.offset = +input.offset;
    if (input.offset < 0) input.offset += 24;
    setCities([...citiesArray, { ...input, id: makeID() }]);
  }

  function getMoscowOffset() {
    const now = new Date();
    return +now
      .toString()
      .match(/GMT.../)[0]
      .slice(4);
  }

  return (
    <div className="watch-container">
      <Input handleAdd={handleAdd} />
      <div className="watches">
        {citiesArray.map(city => {
          return (
            <Watch
              id={city.id}
              city={city.city}
              key={city.id}
              handleDelete={handleDelete}
              offset={city.offset}
              moscowOffset={getMoscowOffset()}
            />
          );
        })}
      </div>
    </div>
  );
}
