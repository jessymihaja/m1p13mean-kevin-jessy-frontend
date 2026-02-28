import { InventoryComponent } from './inventory';

describe('InventoryComponent', () => {
  let component: InventoryComponent;

  beforeEach(() => {
    component = new InventoryComponent({} as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
