import { ShopListComponent } from './shop-list';

describe('ShopListComponent', () => {
  let component: ShopListComponent;

  beforeEach(() => {
    component = new ShopListComponent({} as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
