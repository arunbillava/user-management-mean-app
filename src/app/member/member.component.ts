import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {MemberService} from '../services/members/member.service';
import {AddEditMemberComponent} from '../add-edit-member/add-edit-member.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  providers: [MemberService]
})
export class MemberComponent implements OnInit {

  addEditMemberModal: MatDialogRef<AddEditMemberComponent>;
  members:any[]=[];
  gotResult:boolean;
  constructor(
    public memberService:MemberService,
    private dialog: MatDialog,
    private _snackBar:MatSnackBar,
    private _router:Router) { }

  ngOnInit() {
    this.memberService.getMembers().subscribe(result =>{
      this.members=result;
      this.gotResult=true;
    }, err =>{
      if(err.status==401 || err.status==403){
        this._router.navigate(['/auth']);
      }
    });
  }

  
  onEdit(member:any){
    this.addEditMemberModal = this.dialog.open(AddEditMemberComponent,{data:member});
  }

  onDelete(member:any){
    this.memberService.deleteMember(member).subscribe(result =>{
      this.openSnackBar("deleted user "+member.firstName+' '+member.lastName);
      setTimeout(function(){
        location.reload();
      },1000);
    },err =>{
      this.openSnackBar("Oops!! couldn't delete "+member.firstName+' '+member.lastName)
    });
  }
  

  onAdd(){
    this.addEditMemberModal = this.dialog.open(AddEditMemberComponent);
  }

  openSnackBar(message:string) {
    this._snackBar.open(message);
  }
}
