const create = (id, name, traits) => ({
  id,
  name,
  description: name,
  traits,
});

const CardTypes = [
  create('cdt-hovel', 'Hovel', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-defense',
      value: 3,
    },
    {
      id: 'trt-cost',
      value: 6,
    },
  ]),
  create('cdt-clay-mine', 'Clay Mine', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-defense',
      value: 2,
    },
    {
      id: 'trt-cost',
      value: 6,
    },
    {
      id: 'trt-value',
      value: 4,
    },
  ]),
  create('cdt-tax-collector', 'Tax Collector', [
    {
      id: 'trt-value',
      value: 2,
    },
    {
      id: 'trt-playable',
    },
  ]),
  create('cdt-tavern', 'Tavern', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-value',
      value: 1,
    },
    {
      id: 'trt-defense',
      value: 3,
    },
    {
      id: 'trt-cost',
      value: 1,
    },
  ]),
  create('cdt-cathedral', 'Cathedral', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-value',
      value: 8,
    },
    {
      id: 'trt-cost',
      value: 16,
    },
    {
      id: 'trt-points',
      value: 8,
    },
  ]),
  create('cdt-necromancer', 'Necromancer', [
    {
      id: 'trt-defense',
      value: 2,
    },
    {
      id: 'trt-cost',
      value: 12,
    },
    {
      id: 'trt-attack',
      value: 4,
    },
    {
      id: 'trt-points',
      value: 8,
    },
  ]),
  create('cdt-monk', 'Monk', [
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-value',
      value: 1,
    },
    {
      id: 'trt-healer',
      value: 2,
    },
  ]),
  create('cdt-courtines', 'Courtines', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-cost',
      value: 6,
    },
    {
      id: 'trt-defense',
      value: 4,
    },
  ]),
  create('cdt-bannerman', 'Bannerman', [
    {
      id: 'trt-cost',
      value: 3,
    },
    {
      id: 'trt-defense',
      value: 4,
    },
    {
      id: 'trt-attack',
      value: 4,
    },
  ]),
  create('cdt-thief', 'Thief', [
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-thief',
      value: 1,
    },
    {
      id: 'trt-attack',
      value: 1,
    },
  ]),
  create('cdt-graveyard', 'Graveyard', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-points',
      value: 1,
    },
  ]),
  create('cdt-library', 'Library', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-cost',
      value: 3,
    },
    {
      id: 'trt-points',
      value: 2,
    },
  ]),
  create('cdt-watchtower', 'Watchtower', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-cost',
      value: 6,
    },
    {
      id: 'trt-attack',
      value: 4,
    },
    {
      id: 'trt-defense',
      value: 8,
    },
  ]),
  create('cdt-nunnery', 'Nunnery', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-cost',
      value: 5,
    },
    {
      id: 'trt-points',
      value: 5,
    },
    {
      id: 'trt-defense',
      value: 5,
    },
  ]),
  create('cdt-barracks', 'Barracks', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-cost',
      value: 8,
    },
    {
      id: 'trt-attack',
      value: 4,
    },
    {
      id: 'trt-defense',
      value: 5,
    },
  ]),
  create('cdt-palace', 'Palace', [
    {
      id: 'trt-blueprint',
    },
    {
      id: 'trt-playable',
    },
    {
      id: 'trt-cost',
      value: 20,
    },
    {
      id: 'trt-value',
      value: 12,
    },
    {
      id: 'trt-defense',
      value: 2,
    },
    {
      id: 'trt-points',
      value: 10,
    },
  ]),
];

export default CardTypes.reduce((types, cardType) => ({
  ...types,
  [cardType.id]: cardType,
}), {});
