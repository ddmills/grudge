import * as TraitIds from './TraitIds';
import * as EffectIds from './EffectIds';
import * as PreconditionIds from './PreconditionIds';
import * as ActionSetups from './ActionSetups';

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
    playActions: [
      {
        name: 'Attack',
        setup: [
          ActionSetups.TARGET_ENEMY_CARD,
        ],
        preconditions: [
          { id: PreconditionIds.CARD_IS_ENABLED },
          { id: PreconditionIds.USER_CAN_AFFORD },
          { id: PreconditionIds.TARGET_CARD_IS_ENEMY },
          { id: PreconditionIds.TARGET_CARD_HAS_HEALTH },
        ],
        effects: [
          { id: EffectIds.DAMAGE },
          { id: EffectIds.DISABLE },
        ],
      },
      {
        name: 'Attack',
        setup: [
          ActionSetups.TARGET_ENEMY_USER,
        ],
        preconditions: [
          { id: PreconditionIds.CARD_IS_ENABLED },
          { id: PreconditionIds.USER_CAN_AFFORD },
        ],
        effects: [
          { id: EffectIds.DAMAGE_PLAYER },
          { id: EffectIds.DISABLE },
        ],
      },
    ],
    handActions: [
      {
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
          { id: EffectIds.PLAY },
          { id: EffectIds.PAY },
          { id: EffectIds.DISABLE },
        ],
      },
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
      {
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
          { id: EffectIds.PLAY },
          { id: EffectIds.PAY },
          { id: EffectIds.DISABLE },
          {
            id: EffectIds.ADD_TRAIT,
            traitId: TraitIds.VALUE,
            traitParams: {
              value: 3,
            },
          },
        ],
      },
    ],
    playActions: [
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
    id: 'cdt-monk',
    name: 'Monk',
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
    id: 'cdt-thief',
    name: 'Thief',
    traits: [
      {
        id: TraitIds.ATTACK,
        value: 1,
      },
    ],
    handActions: [
      {
        name: 'Attack',
        setup: [
          ActionSetups.TARGET_ENEMY_CARD,
        ],
        preconditions: [
          { id: PreconditionIds.CARD_IS_ENABLED },
          { id: PreconditionIds.USER_CAN_AFFORD },
          { id: PreconditionIds.TARGET_CARD_IS_ENEMY },
          { id: PreconditionIds.TARGET_CARD_HAS_HEALTH },
        ],
        effects: [
          { id: EffectIds.DAMAGE },
          { id: EffectIds.DISABLE },
        ],
      },
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
      {
        name: 'Attack',
        setup: [
          ActionSetups.TARGET_ENEMY_CARD,
        ],
        preconditions: [
          { id: PreconditionIds.CARD_IS_ENABLED },
          { id: PreconditionIds.USER_CAN_AFFORD },
          { id: PreconditionIds.TARGET_CARD_IS_ENEMY },
          { id: PreconditionIds.TARGET_CARD_HAS_HEALTH },
        ],
        effects: [
          { id: EffectIds.DAMAGE },
          { id: EffectIds.DISABLE },
        ],
      },
    ],
    handActions: [
      {
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
          { id: EffectIds.PLAY },
          { id: EffectIds.PAY },
          { id: EffectIds.DISABLE },
        ],
      },
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
