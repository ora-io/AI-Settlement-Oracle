import SearchService from './searchService';
import { searchClient } from './clients';

class Services {
  search: SearchService;

  constructor() {
    this.search = new SearchService(searchClient);
  }
}

export default new Services();
export * as evmService from './evm';
