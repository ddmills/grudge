import * as TraitIds from './TraitIds';
import * as EffectIds from './EffectIds';

const create = (id, name, traits = [], onPlayed = [], onDrawn = []) => ({
  id,
  name,
  description: name,
  traits,
  onPlayed,
  onDrawn,
});

const CardTypes = [
  create('cdt-hovel', 'Hovel', [
    {
      id: TraitIds.DEFENSE,
      value: 3,
    },
    {
      id: TraitIds.COST,
      value: 6,
    },
  ]),
  create('cdt-clay-mine', 'Clay Mine', [
    {
      id: TraitIds.DEFENSE,
      value: 2,
    },
    {
      id: TraitIds.COST,
      value: 6,
    },
    {
      id: TraitIds.VALUE,
      value: 4,
    },
  ]),
  create('cdt-tax-collector', 'Tax Collector', [
    {
      id: TraitIds.VALUE,
      value: 2,
    },
  ], [
    {
      id: EffectIds.COLLECT,
    },
    {
      id: EffectIds.DISABLE,
    },
  ], [
    {
      id: EffectIds.ENABLE,
    },
  ]),
  create('cdt-tavern', 'Tavern', [
    {
      id: TraitIds.VALUE,
      value: 1,
    },
    {
      id: TraitIds.DEFENSE,
      value: 3,
    },
    {
      id: TraitIds.COST,
      value: 1,
    },
  ]),
  create('cdt-cathedral', 'Cathedral', [
    {
      id: TraitIds.VALUE,
      value: 8,
    },
    {
      id: TraitIds.COST,
      value: 16,
    },
    {
      id: TraitIds.POINTS,
      value: 8,
    },
  ]),
  create('cdt-necromancer', 'Necromancer', [
    {
      id: TraitIds.DEFENSE,
      value: 2,
    },
    {
      id: TraitIds.COST,
      value: 12,
    },
    {
      id: TraitIds.ATTACK,
      value: 4,
    },
    {
      id: TraitIds.POINTS,
      value: 8,
    },
  ]),
  create('cdt-monk', 'Monk', [
    {
      id: TraitIds.VALUE,
      value: 1,
    },
  ], [
    {
      id: EffectIds.COLLECT,
    },
    {
      id: EffectIds.DISABLE,
    },
  ], [
    {
      id: EffectIds.ENABLE,
    },
  ]),
  create('cdt-courtines', 'Courtines', [
    {
      id: TraitIds.COST,
      value: 6,
    },
    {
      id: TraitIds.DEFENSE,
      value: 4,
    },
  ]),
  create('cdt-bannerman', 'Bannerman', [
    {
      id: TraitIds.COST,
      value: 3,
    },
    {
      id: TraitIds.DEFENSE,
      value: 4,
    },
    {
      id: TraitIds.ATTACK,
      value: 4,
    },
  ]),
  create('cdt-thief', 'Thief', [
    {
      id: TraitIds.ATTACK,
      value: 1,
    },
  ]),
  create('cdt-graveyard', 'Graveyard', [
    {
      id: TraitIds.POINTS,
      value: 1,
    },
  ]),
  create('cdt-library', 'Library', [
    {
      id: TraitIds.COST,
      value: 3,
    },
    {
      id: TraitIds.POINTS,
      value: 2,
    },
  ]),
  create('cdt-watchtower', 'Watchtower', [
    {
      id: TraitIds.COST,
      value: 6,
    },
    {
      id: TraitIds.ATTACK,
      value: 4,
    },
    {
      id: TraitIds.DEFENSE,
      value: 8,
    },
  ]),
  create('cdt-nunnery', 'Nunnery', [
    {
      id: TraitIds.COST,
      value: 5,
    },
    {
      id: TraitIds.POINTS,
      value: 5,
    },
    {
      id: TraitIds.DEFENSE,
      value: 5,
    },
  ]),
  create('cdt-barracks', 'Barracks', [
    {
      id: TraitIds.COST,
      value: 8,
    },
    {
      id: TraitIds.ATTACK,
      value: 4,
    },
    {
      id: TraitIds.DEFENSE,
      value: 5,
    },
  ]),
  create('cdt-palace', 'Palace', [
    {
      id: TraitIds.COST,
      value: 20,
    },
    {
      id: TraitIds.VALUE,
      value: 12,
    },
    {
      id: TraitIds.DEFENSE,
      value: 2,
    },
    {
      id: TraitIds.POINTS,
      value: 10,
    },
  ]),
];

export default CardTypes.reduce((types, cardType) => ({
  ...types,
  [cardType.id]: cardType,
}), {});
