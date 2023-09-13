import {
  Component,
  OnDestroy,
  OnInit,
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
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/core/interfaces/user.interfaces';
import { UserService } from 'src/app/core/services/user/user.service';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs';

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

  selectedFile!: any;
  items!: MenuItem[];

  logout = false;

  userData = signal<User>({} as User);

  private subscription!: Subscription;

  private readonly productService = inject(ProductServices);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly userService = inject(UserService);
  private readonly cookieService = inject(CookieService);

  ngOnInit(): void {
    this.getCategories();
    this.searchForm = this.initSearchForm();
    this.getProductsToCart();
    this.isAutenticate();
    // this.userData.set(JSON.parse(localStorage.getItem('userData') || '{}'));

    this.getUserData();

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

  getCategories() {
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      this.transformData(res);
    });
  }

  transformData(apiResponse: any) {
    const transformedData = apiResponse.data
      .filter((category: any) => category.attributes.brands.data.length > 0) // Filtrar las categorías con marcas
      .map((category: any) => {
        const categoryLabel = category.attributes.name;
        const categoryData = category.attributes.slug;
        const brandsData = category.attributes.brands.data;

        const children = brandsData.map((brand: any) => ({
          label: brand.attributes.name,
          data: brand.attributes.slug,
        }));

        return {
          label: categoryLabel,
          data: categoryData,
          children: children,
        };
      });

    this.files = transformedData;
  }

  nodeExpand(event: any) {}
  nodeCollapse(event: any) {}
  nodeUnselect(event: any) {}

  nodeSelect(event: any) {
    this.filterPanel.hide();

    this.router.navigate([`/products`], {
      queryParams: {
        category: event.node.data,
      },
    });
    if (event.node.parent) {
      this.router.navigate([`/products`], {
        queryParams: {
          category: event.node.parent.data,
          subcategory: event.node.data,
        },
      });
    }
  }
  initSearchForm(): FormGroup {
    return this.formBuilder.group({
      product: ['', Validators.required],
    });
  }

  SearchFormProducts(): void {
    if (this.searchForm.invalid) return;

    // this.searchForm.valueChanges
    //   .pipe(
    //     map((search) => search.trim()),
    //     debounceTime(850),
    //     distinctUntilChanged(),
    //     filter((search) => search !== ''),
    //     tap((search) => {
    //       console.log(search);
    //     })
    //   )
    //   .subscribe();
    this.router.navigate(['/products'], {
      queryParams: { query: this.searchForm.value.product.toLowerCase() },
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

  closeModal() {
    this.filterPanel.hide();
    this.cartPanel.hide();
    this.userPanel.hide();
  }
}
