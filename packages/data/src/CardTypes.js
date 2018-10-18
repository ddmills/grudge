import * as TraitIds from './TraitIds';
import * as EffectIds from './EffectIds';
import * as PreconditionIds from './PreconditionIds';
import * as ActionSetups from './ActionSetups';

const basicCardAttack = {
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

const basicPlayerAttack = {
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

const basicPlay = {
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
      basicCardAttack,
      basicPlayerAttack,
    ],
    handActions: [
      basicPlay,
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
        value: 4,
        max: 4,
      },
    ],
    handActions: [
      basicPlay,
    ],
    playActions: [
      basicCardAttack,
      basicPlayerAttack,
    ],
  },
  {
    id: 'cdt-otter',
    name: 'Otter',
    description: 'Heal an ally card',
    traits: [
      {
        id: TraitIds.HEALTH,
        value: 2,
        max: 2,
      },
      {
        id: TraitIds.COST,
        value: 2,
      },
    ],
    handActions: [
      basicPlay,
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
      basicCardAttack,
      basicPlayerAttack,
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
