import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { MemberComponent } from '../member/member.component';

const routes: Routes = [{
  path: '',
  component: MemberComponent
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
