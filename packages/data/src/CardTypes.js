import * as RefIds from './RefIds';
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
    {
      id: PreconditionIds.TARGET_CARD_HAS_TRAIT,
      traitId: TraitIds.HEALTH,
    },
    { id: PreconditionIds.TARGET_CARD_IS_NOT_DEFENDED },
  ],
  effects: [
    {
      id: EffectIds.DAMAGE,
      value: {
        id: RefIds.TRAIT,
        traitId: TraitIds.ATTACK,
      },
    },
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
    {
      id: EffectIds.DAMAGE_PLAYER,
      value: {
        id: RefIds.TRAIT,
        traitId: TraitIds.ATTACK,
      },
    },
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
    {
      id: PreconditionIds.TARGET_CARD_HAS_TRAIT,
      traitId: TraitIds.HEALTH,
    },
  ],
  effects: [
    {
      id: EffectIds.PAY,
      value: {
        id: RefIds.TRAIT,
        traitId: TraitIds.COST,
      },
    },
    {
      id: EffectIds.HEAL,
      value: {
        id: RefIds.TRAIT,
        traitId: TraitIds.HEAL,
      },
    },
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
    {
      id: EffectIds.PAY,
      value: {
        id: RefIds.TRAIT,
        traitId: TraitIds.COST,
      },
    },
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
        value: 4,
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
          {
            id: PreconditionIds.CARD_HAS_TRAIT,
            traitId: TraitIds.VALUE,
          },
        ],
        effects: [
          {
            id: EffectIds.COLLECT,
            value: {
              id: RefIds.TRAIT,
              traitId: TraitIds.VALUE,
            },
          },
          { id: EffectIds.DISABLE },
        ],
      },
    ],
  },
  {
    id: 'cdt-golden-pear-tree',
    name: 'Pear Tree',
    description: 'Worth one gold for every empty slot',
    traits: [
      {
        id: TraitIds.VALUE,
        value: {
          id: RefIds.EMPTY_ALLY_SLOT_COUNT,
        },
      },
    ],
    handActions: [
      {
        name: 'Collect',
        setup: [],
        preconditions: [
          { id: PreconditionIds.CARD_IS_ENABLED },
          {
            id: PreconditionIds.CARD_HAS_TRAIT,
            traitId: TraitIds.VALUE,
          },
        ],
        effects: [
          {
            id: EffectIds.COLLECT,
            value: {
              id: RefIds.TRAIT,
              traitId: TraitIds.VALUE,
            },
          },
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
        value: 5,
      },
      {
        id: TraitIds.HEALTH,
        value: 4,
        max: 4,
      },
      {
        id: TraitIds.DEFENDER,
        slots: [
          {
            id: RefIds.SLOT_INDEX_LEFT,
          },
          {
            id: RefIds.SLOT_INDEX_RIGHT,
          },
        ],
      },
    ],
    handActions: [
      playAction,
    ],
    playActions: [],
  },
  {
    id: 'cdt-otter',
    name: 'Otter',
    description: 'Heal an ally card',
    traits: [
      {
        id: TraitIds.COST,
        value: 2,
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
    id: 'cdt-praying-mantis',
    name: 'Praying Mantis',
    description: 'Instantly attack an enemy card',
    traits: [
      {
        id: TraitIds.COST,
        value: 3,
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
