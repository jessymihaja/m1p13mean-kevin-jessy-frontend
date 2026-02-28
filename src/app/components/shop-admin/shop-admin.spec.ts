import { ShopAdminComponent } from './shop-admin';

describe('ShopAdminComponent', () => {
  let component: ShopAdminComponent;

  beforeEach(() => {
    component = new ShopAdminComponent({} as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
