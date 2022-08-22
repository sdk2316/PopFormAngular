import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import swalWithBootstrapButtons from 'sweetalert2';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Registration';
  content: string = ''

  submitted:boolean=false;

  addForm: FormGroup |any

  constructor(private toast: ToastrService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.setFormState();
  }
setFormState(){

  this.addForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(10)])),
    lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(10)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    //dob:new FormControl('', Validators.compose([Validators.required, Validators.pattern('/^((1[0-2])|[1-9])[/-.](3[0-1]|[1-2]\d|[1-9])[/-.][19|20]\d{2}$/')])),
    dob:new FormControl('', Validators.compose([Validators.required])),
    password:new FormControl('', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(16)])),
    confirmPassword:new FormControl('', Validators.compose([Validators.requiredTrue])),
    acceptTerms:new FormControl(false,Validators.required)
  });


}


cancelForm(){
  this.addForm.reset({
    id: 0,
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    dob:'',
    password:'',
    confirmPassword:'',
    acceptTerms:false
  });
}

  edit(id: number) {
    alert("edit call : " + id)
  }
  delete(id: number) {
    alert("delete call : " + id)

  }
  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  addUser(){
    this.submitted=true

    console.log(this.addForm.value);
    console.log(this.addForm.valid);
  }


}
