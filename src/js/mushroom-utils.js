// ===== Mushroom Utilities (localStorage persistence for MVP) =====
const MushroomUtils = {
  STORAGE_KEY: 'mushroom_collection',

  getMushrooms() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveMushroom(mushroom) {
    const mushrooms = this.getMushrooms();
    mushroom.id = 'mush_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    mushrooms.push(mushroom);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mushrooms));
    return mushroom.id;
  },

  deleteMushroom(id) {
    const mushrooms = this.getMushrooms().filter(m => m.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mushrooms));
  },

  vote(id, type) {
    const mushrooms = this.getMushrooms();
    const m = mushrooms.find(m => m.id === id);
    if (!m) return;
    if (type === 'up') m.upvotes = (m.upvotes || 0) + 1;
    else m.downvotes = (m.downvotes || 0) + 1;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mushrooms));
  }
};
