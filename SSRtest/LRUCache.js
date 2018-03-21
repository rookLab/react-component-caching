import LRU from 'lru-cache';

export default class ComponentCache {
  constructor(config = {}) {

		if (Number.isInteger(config)) {
			config = {
				max:config
			};
    }
    
		this.storage = lru({
			max: config.max || 1000000000,
			length: (n, key) => {
				return n.length + key.length;
			}
    });
  }

  get(cacheKey, cb) {
    let reply = this.storage.get(cacheKey);
    cb(null,reply);
  }

  set(cacheKey, html) {
    this.storage.set(cacheKey, html);
  }

}  