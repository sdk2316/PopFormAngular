import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import swalWithBootstrapButtons from 'sweetalert2';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action } from './helpers/action.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Registration';
  content: string = ''

  submitted: boolean = false;
  buttonText:string=''

  @ViewChild('content') elContent: any

  modalRef: any

  formTitle: string = ''
  db: Action | undefined

  addForm: FormGroup | any

  constructor(private toast: ToastrService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.setFormState();

  }
  setFormState() {
    this.buttonText ="Save"
    this.formTitle =" Add User Form"
    this.db = Action.create
    this.addForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      //dob:new FormControl('', Validators.compose([Validators.required, Validators.pattern('/^((1[0-2])|[1-9])[/-.](3[0-1]|[1-2]\d|[1-9])[/-.][19|20]\d{2}$/')])),
      dob: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.requiredTrue])),
      acceptTerms: new FormControl(false, Validators.requiredTrue)

    });


  }


  cancelForm() {
    this.buttonText ="Save"
    this.formTitle =" Add User Form"
    this.db = Action.create
    this.addForm.reset({
      
      id: 0,
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    });
    this.modalRef.close();
  }

  edit(id: number) {
    //  alert("edit call : " + id)
    this.buttonText = "Update"
    this.formTitle ="Update User Form",

    this.db = Action.update

    this.modalRef = this.modalService.open(this.elContent, { size: 'xl' });
  }


  delete(id: number) {
   // alert("delete call : " + id)
   swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })

  }
  openXl(content: any) {
    this.modalRef = this.modalService.open(content, { size: 'xl' });
  }

  addUser() {
    this.submitted = true

    if (this.addForm.invalid) {
      return
    }
    switch (this.db) {
      case Action.create:
        // create code 
        this.toast.success("Add added ", "User form")
        this.modalRef.cancelForm();
        break;
      case Action.update:
        // update code
        this.toast.success("Updated added ", " User form")
        this.modalRef.cancelForm();
        break;

    }

    // console.log(this.addForm.value);
    //console.log(this.addForm.valid);
   
  }


}
