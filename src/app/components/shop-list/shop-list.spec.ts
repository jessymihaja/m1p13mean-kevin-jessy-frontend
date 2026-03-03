import { Router } from '@angular/router';
import { ShopListComponent } from './shop-list';

describe('ShopListComponent', () => {
  let component: ShopListComponent;


  beforeEach(() => {
     const shopServiceMock = {} as any; // stub/mock pour ShopService
    const routerMock = {} as Router;   // stub/mock pour Router
    component = new ShopListComponent(shopServiceMock, routerMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
