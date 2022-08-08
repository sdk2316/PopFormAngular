import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'popform';
  content:string=''

  constructor(private toast:ToastrService,private modalService: NgbModal){

  }
  
  ngOnInit() {
    // this.toast.success("Done","User");
    // this.toast.warning("warning","User");
    // this.toast.error("error","User");
    // this.toast.info("info","User");
  }

  openXl(content:any) {
    this.modalService.open(content, { size: 'xl' });
  }

 
}
