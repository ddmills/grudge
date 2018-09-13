import CardTypeService from 'services/CardTypeService';

export default class CardTypeController {
  static async list() {
    return CardTypeService.list();
  }
}
