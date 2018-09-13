import CardTypeRepository from 'repositories/CardTypeRepository';

export default class CardTypeService {
  static list() {
    return CardTypeRepository.list();
  }
}
