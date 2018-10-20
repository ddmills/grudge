import * as TraitIds from './TraitIds';
import * as EffectIds from './EffectIds';
import * as PreconditionIds from './PreconditionIds';
import * as ActionSetups from './ActionSetups';

const attackAction = {
  name: 'Attack',
  setup: [
    ActionSetups.TARGET_ENEMY_CARD,
  ],
  preconditions: [
    { id: PreconditionIds.CARD_IS_ENABLED },
    { id: PreconditionIds.TARGET_CARD_IS_ENEMY },
    { id: PreconditionIds.TARGET_CARD_HAS_HEALTH },
  ],
  effects: [
    { id: EffectIds.DAMAGE },
    { id: EffectIds.DISABLE },
  ],
};

const attackPlayerAction = {
  name: 'Attack',
  setup: [
    ActionSetups.TARGET_ENEMY_USER,
  ],
  preconditions: [
    { id: PreconditionIds.CARD_IS_ENABLED },
  ],
  effects: [
    { id: EffectIds.DAMAGE_PLAYER },
    { id: EffectIds.DISABLE },
  ],
};

const healAction = {
  name: 'Heal',
  setup: [
    ActionSetups.TARGET_ALLY_CARD,
  ],
  preconditions: [
    { id: PreconditionIds.CARD_IS_ENABLED },
    { id: PreconditionIds.USER_CAN_AFFORD },
    { id: PreconditionIds.TARGET_CARD_IS_ALLY },
    { id: PreconditionIds.TARGET_CARD_HAS_HEALTH },
  ],
  effects: [
    { id: EffectIds.PAY },
    { id: EffectIds.HEAL },
    { id: EffectIds.DISABLE },
  ],
};

const playAction = {
  name: 'Play',
  setup: [
    ActionSetups.TARGET_OPEN_SLOT,
  ],
  preconditions: [
    { id: PreconditionIds.CARD_IS_ENABLED },
    { id: PreconditionIds.USER_CAN_AFFORD },
    { id: PreconditionIds.TARGET_SLOT_INDEX_IS_OPEN },
  ],
  effects: [
    { id: EffectIds.PAY },
    { id: EffectIds.PLAY },
    { id: EffectIds.DISABLE },
  ],
};

const CardTypes = [
  {
    id: 'cdt-stoat',
    name: 'Stoat',
    traits: [
      {
        id: TraitIds.HEALTH,
        value: 1,
        max: 1,
      },
      {
        id: TraitIds.ATTACK,
        value: 1,
      },
      {
        id: TraitIds.COST,
        value: 3,
      },
    ],
    playActions: [
      attackAction,
      attackPlayerAction,
    ],
    handActions: [
      playAction,
    ],
  },
  {
    id: 'cdt-goose',
    name: 'Goose',
    description: 'Instantly collect one gold',
    traits: [
      {
        id: TraitIds.VALUE,
        value: 1,
      },
    ],
    handActions: [
      {
        name: 'Collect',
        setup: [],
        preconditions: [
          { id: PreconditionIds.CARD_IS_ENABLED },
          { id: PreconditionIds.CARD_HAS_VALUE },
        ],
        effects: [
          { id: EffectIds.COLLECT },
          { id: EffectIds.DISABLE },
        ],
      },
    ],
  },
  {
    id: 'cdt-toad',
    name: 'Toad',
    traits: [
      {
        id: TraitIds.COST,
        value: 3,
      },
      {
        id: TraitIds.ATTACK,
        value: 1,
      },
      {
        id: TraitIds.HEALTH,
        value: 3,
        max: 3,
      },
    ],
    handActions: [
      playAction,
    ],
    playActions: [
      attackAction,
      attackPlayerAction,
    ],
  },
  {
    id: 'cdt-otter',
    name: 'Otter',
    description: 'Heal an ally card',
    traits: [
      {
        id: TraitIds.COST,
        value: 1,
      },
      {
        id: TraitIds.HEAL,
        value: 1,
      },
    ],
    handActions: [
      healAction,
    ],
  },
  {
    id: 'cdt-stag-beetle',
    name: 'Stag Beetle',
    description: 'Instantly attack an enemy card',
    traits: [
      {
        id: TraitIds.COST,
        value: 1,
      },
      {
        id: TraitIds.ATTACK,
        value: 1,
      },
    ],
    handActions: [
      attackAction,
      attackPlayerAction,
    ],
  },
];

const hydrate = (cardType) => ({
  description: cardType.name,
  traits: [],
  handActions: [],
  playActions: [],
  ...cardType,
});

export default CardTypes.reduce((types, cardType) => ({
  ...types,
  [cardType.id]: hydrate(cardType),
}), {});
