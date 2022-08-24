import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import swalWithBootstrapButtons from 'sweetalert2';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action } from './helpers/action.enum';
import { passwordMatch } from './helpers/must-match-validator';
import { UserApiService } from './service/user-api.service';
import { User } from './service/user.interface';

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

  userData: User[] = [];

  constructor(private toast: ToastrService, private modalService: NgbModal,private _userApiService:UserApiService) {

  }

  ngOnInit() {
    this.setFormState();
    this.getAllUsers();

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

    },passwordMatch('password','confirmPassword'));


  }


  cancelForm() {
    this.buttonText ="Save"
    this.formTitle =" Add User Form"
    this.db = Action.create
    this.submitted = false
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

  edit(userId: number) {
    //  alert("edit call : " + id)
    
    this.buttonText = "Update"
    this.formTitle ="Update User Form",

    this.db = Action.update

    //edit code here 
    let user =this.userData.find((u:User)=>u.id === userId);
    // patchValue() like PartialMapping in Spring Boot
    this.addForm.patchValue(user);
// set value like PostMapping
    //this.addForm.setValue();

    this.addForm.get('password').setValue('');
    this.addForm.get('confirmPassword').setValue('');
    this.addForm.get('acceptTerms').setValue(false);
    


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
      // delete code here
      this._userApiService.deleteUser(id).subscribe(res=>{
        this.getAllUsers();

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'User data  has been deleted.',
          'success'
        )

      })
      
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
        // create code here 

        this._userApiService.addUser(this.addForm.value).subscribe(res=>{

          this.toast.success("Add added ", "User Registration form")
          this.getAllUsers();
          this.cancelForm();

        })
       
        break;
      case Action.update:
        // update code
        this._userApiService.addUser(this.addForm.value).subscribe(res=>{

          this.toast.success("User Updated ", "User Registration form")
          this.getAllUsers();
          this.cancelForm();
        })

        break;

    }

    // console.log(this.addForm.value);
    //console.log(this.addForm.valid);
   
  }


  getAllUsers(){
    this._userApiService.getUsers().subscribe((res:any)=>{
      this.userData=res;
    })
  }


}
