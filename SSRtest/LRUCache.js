import LRU from 'lru-cache';

export default class ComponentCache {
  constructor(config = {}) {

		if (Number.isInteger(config)) {
			config = {
				max:config
			};
    }
    
		this.storage = LRU({
			max: config.max || 1000000000,
			length: (n, key) => {
				return n.length + key.length;
			}
		});

	}  
}