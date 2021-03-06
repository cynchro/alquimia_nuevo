import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { TokenStorageService } from '../../_auth/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./scss/default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit{

  public sidebarMinimized = false;
  public navItems = navItems;
  name: string[] = [];

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(private tokenStorage: TokenStorageService) { }

  logout(){
    this.tokenStorage.signOut();
  }

  ngOnInit(): void {
    this.name = this.tokenStorage.getUser().username;
  }
}
