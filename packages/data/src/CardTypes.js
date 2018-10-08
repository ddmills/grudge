import * as TraitIds from './TraitIds';
import * as EffectIds from './EffectIds';
import * as ActionIds from './ActionIds';

const CardTypes = [
  {
    id: 'cdt-soldier',
    name: 'Soldier',
    traits: [
      {
        id: TraitIds.HEALTH,
        value: 3,
      },
      {
        id: TraitIds.ATTACK,
        value: 2,
      },
    ],
    onDestroyed: [
      { id: EffectIds.TRASH },
    ],
    onDrawn: [
      { id: EffectIds.ENABLE },
    ],
    playActions: [
      { id: ActionIds.ATTACK },
    ],
    handActions: [
      { id: ActionIds.PLAY },
    ],
  },
  {
    id: 'cdt-tax-collector',
    name: 'Tax Collector',
    traits: [
      {
        id: TraitIds.VALUE,
        value: 2,
      },
    ],
    onDestroyed: [
      { id: EffectIds.TRASH },
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
        value: 3,
      },
      {
        id: TraitIds.HEALTH,
        value: 6,
        max: 6,
      },
    ],
    handActions: [
      { id: ActionIds.PLAY },
    ],
    onDestroyed: [
      { id: EffectIds.TRASH },
    ],
    playActions: [
      { id: ActionIds.COLLECT },
    ],
    onPlayed: [
      {
        id: EffectIds.ADD_TRAIT,
        traitId: TraitIds.VALUE,
        traitParams: {
          value: 3,
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
    onDestroyed: [
      { id: EffectIds.TRASH },
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
    onDestroyed: [
      { id: EffectIds.TRASH },
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
        value: 4,
        max: 4,
      },
    ],
    playActions: [
      { id: ActionIds.ATTACK },
    ],
    onDestroyed: [
      { id: EffectIds.TRASH },
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
  onDestroyed: [],
  handActions: [],
  playActions: [],
  ...cardType,
});

export default CardTypes.reduce((types, cardType) => ({
  ...types,
  [cardType.id]: hydrate(cardType),
}), {});
