import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterModule, IconFieldModule, InputIconModule, FormsModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  searchTerm: string = '';

  constructor(private router: Router) {}

  search() {
    const term = this.searchTerm.trim();

    if (term) {
      this.router.navigate(['/busqueda', { term: term }]);
    }
  }

  authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
        if((user.displayName!)==null){
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.phoneNumber!,
          });
        }
      }else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
