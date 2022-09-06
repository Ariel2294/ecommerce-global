export const MockModel = {
  findOne() {
    return {
      exec: () => this.entityStub,
    };
  },

  find() {
    return [this.entityStub];
  },

  save() {
    return this.entityStub;
  },

  async findOneAndUpdate() {
    return this.entityStub;
  },
};
