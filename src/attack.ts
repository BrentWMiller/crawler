export class Attack {
  entity: Matter.Body;
  type: string;

  constructor(entity: Matter.Body, type: string) {
    this.entity = entity;
    this.type = type;
  }

  test(): string {
    return this.type;
  }
}
