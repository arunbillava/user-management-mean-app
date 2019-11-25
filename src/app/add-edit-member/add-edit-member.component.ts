import { Component,  Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import {  Validators, FormGroup, FormBuilder } from '@angular/forms';
import {MemberService} from '../services/members/member.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-member',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.scss'],
  providers: [MemberService]
})
export class AddEditMemberComponent {
  form: FormGroup;
  errorMessage:string;
  selectedDepartment:string;
  constructor(public memberService:MemberService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditMemberComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    let MOBILE_PATTERN = /[0-9\+\-\ ]/;
    this.form = this.formBuilder.group({
      firstName: [this.data?this.data.firstName:'', <any>Validators.required],
      lastName: [this.data?this.data.lastName:'', <any>Validators.required],
      email: [this.data?this.data.email:'', [<any>Validators.required,Validators.email]],
      phoneNumber: [this.data?this.data.phoneNumber:'', [<any>Validators.required,Validators.pattern(MOBILE_PATTERN)]],
      department: [this.data?this.data.department[0]:'', <any>Validators.required]
    });
  }

  submit(form) {
    if (form.valid) {
      if(this.data){
        this.editMember(form.value,this.data._id);
      }
      else{
        this.addMember(form.value);
      }
    }
  }

  addMember(value){
    this.memberService.addMember(value).subscribe(result =>{
      this.onSuccess();
    },err =>{
      this.onError(err);
    });
  }

  editMember(value,memberId){
    this.memberService.updateMember(value,memberId).subscribe(result =>{
      this.onSuccess();
    },err =>{
      this.onError(err);
    });
  }

  onSuccess(){
    this.errorMessage='';
    this.dialogRef.close();
    this.openSnackBar(this.data?"Edited Successfully":"Added Successfully");
    setTimeout(function(){
      location.reload();
    },1000);
  }

  onError(err:any){
    if(err.status>=500){
      this.errorMessage="Service not available, please try again later";
    }
    else{
      this.errorMessage=err.error.message;
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  openSnackBar(message:string) {
    this._snackBar.open(message);
  }
}