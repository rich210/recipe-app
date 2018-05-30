export class Ingredient {

  public name: string;
  public amount: number;
  public amountType: string;
  public category: string;

  constructor(name: string, amount: number, amountType: string, category: string) {
    this.name = name;
    this.amount = amount;
    this.amountType = amountType;
    this.category = category;
  }
}
