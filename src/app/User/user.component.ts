import { isBoolean } from 'util';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IUser } from './user';
import { UserService } from './user.service';
import { } from '';
import { GridOptions } from 'ag-grid';
import { window } from 'rxjs/operator/window';
import { Window } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {

  @ViewChild('modalSFU')
  mymodalSFU: BsModalComponent;

  private user: IUser = {
    id: 0,
    firstname: '', lastname: '', username: '', password: ''
  };
  private TableGridOptions: GridOptions;
  private list: IUser[] = [];
  private listofusers: IUser[];
  private create = false;
  private listuser = true;
  private listofauthority: IUser[];
  private users = {};
  private userInfo;
  private selectedusers: IUser[] = [];
  constructor(private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, private userservice: UserService) {
    this.toastr.setRootViewContainerRef(vcr);

    this.TableGridOptions = {
      enableFilter: true,
      enableSorting: true,
      pagination: true,
      rowSelection: 'multiple',

      columnDefs: [{
        checkboxSelection: true,
        width: 17,
        suppressFilter: true,
        suppressMovable: true,
        suppressResize: true,
        suppressSorting: true,
        cellStyle: { outline: "none" },


      },
      {
        headerName: "FirstName",
        field: "firstname",
        filter: "text",
        editable: true,
        width: 216,
      },
      {
        headerName: "LastName",
        field: "lastname",
        filter: "text",
        editable: true,
        width: 216

      },
      {
        headerName: "UserName",
        field: "username",
        filter: "text",
        editable: true
      },
      {
        headerName: "Password",
        field: "password",
        filter: "text",
        editable: true
      },
      {
        headerName: "Email",
        field: "email",
        filter: "text",
        editable: true,
        width: 288

      }

      ],
      enableColResize: true,
      rowHeight: 22,
      rowData: [],
      rowDeselection: true,
      onRowSelected: this.pushSelectedUser.bind(this),
      onCellValueChanged: this.updateUser.bind(this)

    }



  }

  ngOnInit() {

    this.listofuser();
  }
  clearuserdetails() {
    this.users = {};
    this.selectedusers = [];
    this.listofusers = [];
    this.list = [];
  }

  pushSelectedUser(event) {

    if (event.node !== undefined) {
      if (event.node.selected == true) {
        this.selectedusers.push(event.node.data);
      }
      else {
        var index = this.selectedusers.indexOf(event.node.data);
        this.selectedusers.splice(index, 1);
      }
    }
  }

  updateUser(event) {
    if (event.node != undefined) {
      var data = event.node.data
      this.userservice.updateUser(data).subscribe(
        data => {
          this.toastr.success("user details updated");
        },
        error => {
          this.toastr.error("cannot save the user details")
        }
      )



    }
  }

  listofuser() {
    var username;
    this.clearuserdetails();
    var cookiedata = localStorage.getItem('currentUser');
    var json = JSON.parse(cookiedata);
    this.userInfo = json.user;
    if (this.userInfo.role == "ROLE_ADMIN") {
      username = this.userInfo.username;
    }
    this.userservice.getalluser().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].username != 'admin' && data[i].username != 'user' && data[i].username != username) {
            this.list.push(data[i]);
          }
        }
        this.listofusers = this.list;
        var number = 10;
        this.TableGridOptions.api.paginationSetPageSize(number);
        this.TableGridOptions.api.sizeColumnsToFit()
        this.toastr.success("Success!");
        this.getauthority();
      },
      error => {
        this.toastr.error(
          "Check the browser console to see more info.",
          "Error!"
        );
      }
    );
  }

  getauthority() {
    this.userservice.getallauthority().subscribe(
      data => {
        this.listofauthority = data;
      },
      error => {
        this.toastr.error("cannot get all role users info");
      }



    )
  }
  saveUser() {
    this.userservice.saveuser(this.users).subscribe(
      data => {
        this.toastr.success("user details saved");
        this.clearuserdetails();
      },
      error => {
        this.toastr.error("cannot save the user details")
      }
    )
  }

  createuser() {
    this.create = true;
    this.listuser = false;

  }

  createcancel() {
    this.create = false;
    this.listuser = true;
    this.listofuser();
  }

  openrole() {
    this.mymodalSFU.open();

  }
  saveNewRole() {
    this.userservice.saveNewRole(this.users).subscribe(
      data => {
        this.toastr.success("New Role created");
        this.getauthority();
        this.clearuserdetails();
        this.mymodalSFU.dismiss();
      },
      error => {
        this.toastr.error("cannot create New Role");
      }
    )
  }

  delete() {
    if (this.selectedusers.length > 0) {
      this.userservice.deleteuser(this.selectedusers).subscribe(
        data => {

          this.toastr.success("success")
          location.reload();
        },
        error => {
          this.toastr.error("cannot delete the user in the list")
        }
      );
    }
    else {
      this.toastr.info("please first select user in the list");
    }
  }

  cancelList() {
    this.router.navigate(['home'])
  }

}