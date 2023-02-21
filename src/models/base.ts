export class BaseModel {
  protected guard: string[] = [];
  private preserve: string[] = ['guard', 'preserve'];

  serialize() {
    const obj: any = {};

    for (const key in this) {
      if (this.guard.includes(key) || this.preserve.includes(key)) continue;
      obj[key] = this[key];
    }

    return obj;
  }
}
