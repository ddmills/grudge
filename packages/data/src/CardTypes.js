import * as TraitIds from './TraitIds';
import * as EffectIds from './EffectIds';
import * as ActionIds from './ActionIds';

const CardTypes = [
  {
    id: 'cdt-tax-collector',
    name: 'Tax Collector',
    traits: [
      {
        id: TraitIds.VALUE,
        value: 2,
      },
    ],
    onDrawn: [
      { id: EffectIds.ENABLE },
    ],
    handActions: [
      { id: ActionIds.COLLECT },
    ],
  },
  {
    id: 'cdt-cathedral',
    name: 'Cathedral',
    traits: [
      {
        id: TraitIds.COST,
        value: 6,
      },
      {
        id: TraitIds.HEALTH,
        value: 8,
        max: 8,
      },
    ],
    handActions: [
      { id: ActionIds.PLAY },
    ],
    onPlayed: [
      {
        id: EffectIds.ADD_TRAIT,
        traitId: TraitIds.VALUE,
        traitParams: {
          value: 8,
        },
      },
    ],
  },
  {
    id: 'cdt-monk',
    name: 'Monk',
    traits: [
      {
        id: TraitIds.VALUE,
        value: 1,
      },
    ],
    onDrawn: [
      { id: EffectIds.ENABLE },
    ],
    handActions: [
      { id: ActionIds.COLLECT },
    ],
  },
  {
    id: 'cdt-thief',
    name: 'Thief',
    traits: [
      {
        id: TraitIds.ATTACK,
        value: 1,
      },
    ],
    onDrawn: [
      { id: EffectIds.ENABLE },
    ],
    handActions: [
      { id: ActionIds.ATTACK },
    ],
  },
  {
    id: 'cdt-watchtower',
    name: 'Watchtower',
    traits: [
      {
        id: TraitIds.COST,
        value: 4,
      },
      {
        id: TraitIds.ATTACK,
        value: 2,
      },
      {
        id: TraitIds.DEFENSE,
        value: 2,
      },
      {
        id: TraitIds.HEALTH,
        value: 2,
        max: 2,
      },
    ],
    handActions: [
      { id: ActionIds.PLAY },
    ],
  },
];

const hydrate = (cardType) => ({
  description: cardType.name,
  traits: [],
  onPlayed: [],
  onDrawn: [],
  handActions: [],
  ...cardType,
});

export default CardTypes.reduce((types, cardType) => ({
  ...types,
  [cardType.id]: hydrate(cardType),
}), {});
