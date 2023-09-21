import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, TreeNode } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { CategoryDatum } from 'src/app/core/interfaces/category.interfaces';
import { CartService } from 'src/app/core/services/cart-services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/core/interfaces/user.interfaces';
import { UserService } from 'src/app/core/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('filter') filterPanel!: OverlayPanel;
  @ViewChild('cart') cartPanel!: OverlayPanel;
  @ViewChild('user') userPanel!: OverlayPanel;
  searchForm!: FormGroup;

  files!: TreeNode[];
  categories!: CategoryDatum[];
  totalProductToCart = signal<number>(0);
  isLogued: boolean = false;
  public showCart = false;

  selectedFile!: any;
  items!: MenuItem[];

  logout = false;

  userData = signal<User>({} as User);

  private subscription!: Subscription;

  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly userService = inject(UserService);
  private readonly cookieService = inject(CookieService);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.searchForm = this.initSearchForm();
    this.getProductsToCart();
    this.isAutenticate();
    // this.userData.set(JSON.parse(localStorage.getItem('userData') || '{}'));

    this.getUserData();

    this.clickOutMenu();

    this.items = [
      {
        label: 'Cuenta',
        icon: 'pi pi-fw pi-user-edit',
        routerLink: ['/user'],
        command: () => {
          this.closeModal();
        },
      },
      {
        label: 'Favoritos',
        icon: 'pi pi-fw pi-heart',
        routerLink: ['/favorites'],
        command: () => {
          this.closeModal();
        },
      },
      {
        label: 'Mis compras',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/my-shopping'],
        command: () => {
          this.closeModal();
        },
      },
      {
        separator: true,
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.closeModal();
          this.logout = true;
        },
      },
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserData() {
    this.subscription = this.userService.user$.subscribe((res) => {
      this.userData.set(res);
    });
  }

  initSearchForm(): FormGroup {
    return this.formBuilder.group({
      product: ['', Validators.required],
    });
  }

  SearchFormProducts(): void {
    if (this.searchForm.invalid) return;
    this.router.navigate(['/products'], {
      queryParams: {
        query: this.searchForm.value.product.toLowerCase().trim(),
      },
    });

    this.searchForm.reset();
  }

  getProductsToCart() {
    this.cartService.getCartObservable().subscribe((products) => {
      const totalProductos = products.reduce(
        (total, producto) => total + producto.quantity,
        0
      );

      this.totalProductToCart.set(totalProductos);
    });
  }

  isAutenticate() {
    this.userService.getAutenticate().subscribe((res) => {
      this.isLogued = res;
    });
  }

  logOut() {
    this.userService.setAutenticate(false);
    localStorage.removeItem('userData');
    sessionStorage.removeItem('favorites');
    this.cookieService.delete('accessToken');
    this.logout = false;
  }

  closeModal(e?: any) {
    // this.cartPanel.hide();
    this.userPanel.hide();
    this.showCart = false;
  }

  showCartFn() {
    this.showCart = !this.showCart;
  }

  clickOutMenu() {
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      const clickedInsideMenu = this.elementRef.nativeElement.contains(
        event.target
      );

      console.log(this.elementRef.nativeElement.contains(event.target));

      if (!clickedInsideMenu) {
        this.showCart = false;
      }
    });
  }
}
