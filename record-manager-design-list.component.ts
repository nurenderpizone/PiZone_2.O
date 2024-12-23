import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
/* services */

import { Page } from "../../shared/page";
/* bootstrap modal */
import { MatDialog } from '@angular/material/dialog';

/* popup component */
import { EditSuccessComponent } from '../../popups/edit-success/edit-success.component';

/* Router */
import { ActivatedRoute, Router } from '@angular/router';

import { MainLayoutComponent } from '../main-layout.component';
import { CookieService } from 'ngx-cookie';

/* interface */
// 
// import * as _ from 'lodash';
// import { ConfimationPageLeaveComponent } from 'src/app/popups';
import { RecordManagerDesignService } from './service/record-manager-design.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

import { authenticationPopup, editSuccedPopupControlledDocumentState, recordArchivedState, recordSoftDeleteState, recordRestoreState, confirmtationPageLeave } from './service/commonPopUpMethods';
import { JsonRecordManagerDesignService } from './service/json-record-manager-design.service';
import { ConstantRecordManagerData } from './service/constant-design.data';
import { sessionOutPopup } from '../controlled-document/shared/commonMathods';
import { CommonFunctionRecordManagerService } from './service/common-function-record-manager.service';
import { propertyValuesInterface, isValidControlInterface } from './interface/record-manager-design-interface';
import * as _ from 'lodash';
import { ErrorHandlingMethods } from 'src/app/global-error-handler/error-handling-methods.service';

@Component({
  selector: 'app-record-manager-design-list',
  templateUrl: './record-manager-design-list.component.html',
  styleUrls: ['./record-manager-design-list.component.css']
})
export class RecordManagerDesignListComponent implements OnInit {
  public page = new Page();
  public selected: any = [];
  //varible for cog icon
  isMenuOpen = false;
  isRowMenuOpen = false;
  isDropDownShow = false;

  public loading = false;
  public isFilterApplied = true;

  rowIndexes: number[] = [];
  public arrSelected: any[] = [];
  public baseModelTables: any = [];
  public rowIdList: any = '';
  public row: any = [];
  public allEdit = true;
  public multiEditsave: any;
  public saveCompanyRecord = false;
  error_msg: any;
  public isFlag = [false, false, false, false, false];
  public isSorted = [false, false, false, false, false];
  public sortinParam: any = null;
  public sortOrder: any = null;
  //multi edit functionality
  public MultiSelectArray: any = [];
  public editview = false;
  public editmode: any;
  obj_error_msg: any[] = [];
  isDropDown = false;
  dropdownSettings: any;
  inlineArray: any[] = [];
  baseModelTableId = '';
  opneMultiSelectDropdownIndex: any = null;
  public currentRowIndex: any = [];
  @Input() baseTableName: any;
  @Input() recordManagerDesign: any;
  @Input() recordId: any;
  getAllData: any[] = [];
  Indexmodeltable: any;
  baseModelTableData: any;
  multiStateArray: any = [];
  editState: any;
  @Output() mrvCreateButtonShow = new EventEmitter<any>();
  @Output() mrvCreateButtonHide = new EventEmitter<any>();
  @Output() apiErrorEvent = new EventEmitter<any>();
  @Output() isRecordManagerDesignInlineEdit = new EventEmitter<any>();
  tableData: any;

  // 2909 changes
  @Output() recordManagerClassificationShow = new EventEmitter<any>();
  @Output() recordReviewandApprovalShow = new EventEmitter<any>();
  createGetData: any;
  isValidControl: any = new Array<isValidControlInterface>();
  propertyValues: any = new Array<propertyValuesInterface>();
  objErrorMsg: any[] = [];
  isActiveRMDesign: any;
  recordReviewAndApprovalData: any;
  @Input() permissionTableName: any;
  @Input() linkId: any;

  constructor(public urlparams: ActivatedRoute, public mainlayout: MainLayoutComponent, private cd: ChangeDetectorRef,
    public storage: CookieService, public popup: MatDialog, public router: Router, public utils: UtilsService,
    private service: RecordManagerDesignService, public jsonService: JsonRecordManagerDesignService, public constant: ConstantRecordManagerData,
    public commonService: CommonFunctionRecordManagerService, private errorHandling: ErrorHandlingMethods) { }

  ngOnInit(): void {
    this.selected = [];
    this.getAllData = [];
    this.isMenuOpen = false;
    this.isRowMenuOpen = false;
    this.isDropDownShow = false;
    this.loading = false;
    this.isFilterApplied = false;
    this.rowIndexes = [];
    this.arrSelected = [];
    this.baseModelTables = [];
    this.rowIdList = '';
    this.row = [];
    this.allEdit = true;
    this.multiEditsave;
    this.saveCompanyRecord = false;
    this.error_msg = [];
    this.isFlag = [false, false, false, false, false];
    this.isSorted = [false, false, false, false, false];
    this.sortinParam = null;
    this.sortOrder = null;
    this.baseModelTableId = '';
    this.inlineArray = [];
    this.apiErrorEvent.emit(this.error_msg);
    // All control validation to be false on load
    this.isValidControl.push(this.constant.controllVisible);
    // All control dropdown value assign to null on load
    this.propertyValues.push(this.constant.controllValues);
    this.commonService.modelEmpty(this.isValidControl, this.propertyValues);
    sessionStorage.setItem('returnStop', 'Yes');
    this.dropdownSettings = this.commonService.dropdownSettings;
    this.recordId = this.urlparams.snapshot.params['id'];
    this.getModelTableData();

  }

  serverSideSorting(name: any, i: any) {
    this.utils.loading = true;
    this.isFlag = [false, false, false, false, false];
    this.isSorted[i] = !this.isSorted[i];
    this.isFlag[i] = true;

    if (this.isSorted[i] && this.isFlag[i]) {
      if (!this.isFilterApplied) {
        this.sortinParam = name;
        this.sortOrder = `asc`;
        // this.getRecordManagerGetData({ offset: 0, pageSize: '10', sort: this.sortinParam, order: this.sortOrder });
      } else {
        this.sortinParam = name;
        this.sortOrder = `asc`;
      }
    } else if (!this.isSorted[i] && this.isFlag[i]) {
      if (!this.isFilterApplied) {
        this.sortinParam = name;
        this.sortOrder = `desc`;
        // this.getRecordManagerGetData({ offset: 0, pageSize: '10', sort: this.sortinParam, order: this.sortOrder });
      } else {
        this.sortinParam = name;
        this.sortOrder = `desc`;
      }
    }
  }

  getModelTableData() {
    this.loading = true;
    // Get api for model table get Data
    this.service.getModelTableData(this.baseTableName).then((data: any) => {
      if (data['status'] == 401) {
        this.popup.open(EditSuccessComponent, ({ data: { context: 'Session Expired. Please Login Again', title: 'Session Expired', isUnauthenticationFailed: true } }));
      } else if (data) {
        this.loading = false;
        this.baseModelTableData = data;
        this.getRecordManagerGetData({ offset: 0, pageSize: '10', sort: this.sortinParam, order: this.sortOrder });
        // Record Manager Person Get all API
        this.recordManagerPersonGet();
      }
    }).catch((error: any) => {
      // const msg = error?.error.substr(error?.error?.indexOf('.: ') + 1);
      // this.error_msg = msg?.split('.-1');
      this.apiErrorEvent.emit(error.error);
      this.loading = false;
    });
  }

  activeOpenMultiSelect = true;
  multiSelectDropdown(index: any) {
    if (this.activeOpenMultiSelect) {
      this.opneMultiSelectDropdownIndex = index;
      this.isDropDown = true;
    }
  }
  onDropDownClose(index: any) {
    if (this.opneMultiSelectDropdownIndex == index) {
      this.isDropDown = false;
      this.activeOpenMultiSelect = false;
      setTimeout(() => {
        this.activeOpenMultiSelect = true;
      }, 100);
    }
  }

  //checkbox select event
  onSelect(data: any) {
    const selected = data['selected'];
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  closeDropDown() {
    this.isMenuOpen = false;
    this.isRowMenuOpen = false;
    this.isDropDownShow = false;

  }
  dropDownShowAll() {
    setTimeout(() => {
      this.isMenuOpen = true;
      this.isRowMenuOpen = false;
      this.isDropDownShow = true;
    }, 1);
  }
  dropDownShow() {
    setTimeout(() => {
      this.isRowMenuOpen = true;
      this.isMenuOpen = false;
      this.isDropDownShow = true;
    }, 1);
  }

  setIndex(index: any, isSelected: any, row: any) {
    if (isSelected) {
      for (let i = 0; i < this.rowIndexes.length; i++) {
        if (this.rowIndexes[i] == index) {
          this.rowIndexes.splice(i, 1);
        }
      }
    } else {
      this.rowIndexes.push(index);
    }
    if (!this.arrSelected) {
      this.arrSelected = [];
    }
    if (isSelected == false) {
      this.arrSelected.push({ 'Index': index, 'Row': row, 'Edit': 'edit' });
    }
    else {
      this.arrSelected = this.arrSelected.filter(function (item) {
        return item.Index !== index;
      });
    }
  }

  getCogIconColor(cogArray: any) {
    if (cogArray.length != 0) {
      if (cogArray.map((x: any) => x.recordState).indexOf('Active') != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }

  editFn() {
    // click on Edit option
    this.isRecordManagerDesignInlineEdit.emit(true);
    const iindex = this.getAllData.findIndex(i => i.recordState == "Active");
    if (iindex > -1) {
      this.getAllData[iindex].reviewControlType = this.commonService.strinfValueConvertToMultiselectValueInList(this.getAllData[iindex].reviewControlType);
      this.getAllData[iindex].approvalControlType = this.commonService.strinfValueConvertToMultiselectValueInList(this.getAllData[iindex].approvalControlType);
      this.getControlIsValid(iindex);
      this.disableReviewControlType(this.constant.columnName.reviewControlType, this.constant.controller.reviewNotUsed, this.constant.columnName.reviewControlTypes, iindex);
      this.disableReviewControlType(this.constant.columnName.approvalControlType, this.constant.controller.approvalNotUsed, this.constant.columnName.approvalControlTypes, iindex);
    }
    sessionStorage.setItem('returnStop', 'No');
    this.editmode = false;
    this.editview = false;
    // this.editinlinesave = false;
    // this.singleEdit = false;
    this.MultiSelectArray = [];
    this.rowIdList = '';
    this.multiEditsave = false;
    this.allEdit = false;
    if (this.selected.length > 0) {
      const i = 0;
      this.selected.forEach((element: any) => {
        if (i === 0) {
          this.rowIdList = this.rowIdList + element.id + ',';
          this.multiEditsave = true;
          this.editview = true;
        }
        this.MultiSelectArray.push(element.Row);
      });
    }
    this.row = this.MultiSelectArray;
    // this.multipleEdit = true;
    // this.singleEdit = false;
    this.editmode = false;
  }

  onActivate(event: any) {
    // recordManagerDesign/edit
    if (this.editview === false || this.editview === undefined) {
      if (event.type === 'dblclick' && event.row.recordState != "Soft Deleted") {
        if (this.linkId) {
          localStorage.setItem('renderEngineLinkId', this.linkId);
        } else {
          localStorage.removeItem('renderEngineLinkId');
        }
        if (!this.recordId) {
          this.recordId = null;
        }
        localStorage.setItem('recordIdForRecordManagerDesign', this.recordId);
        this.mainlayout.navigation.push({
          name: 'Record Manager Design NTV',
          path: 'view/table/edit/' + this.urlparams.snapshot.params['id']
        });
        const navigation = JSON.stringify(this.mainlayout.navigation);
        localStorage.setItem('recordManagerDesignPostBreadcrumb', navigation);
        this.router.navigateByUrl('view/recordManagerDesign/edit/' + this.baseTableName + '/' + event.row.id);
      }
    }
  }

  setActionsVisibility(event: any) {
    if (event.event.toElement) {
      const target_element = event.event.toElement.className;
      if (target_element == 'dropdown row-menu' || target_element == 'dropdown-menu row-menu' || target_element === 'dropdown row-menu ng-star-inserted') {
        this.isRowMenuOpen = true;
        this.isMenuOpen = false;
      }
      else if (target_element == 'dropdown header-menu' || target_element == 'dropdown-menu header-menu' || target_element === 'dropdown header-menu ng-star-inserted') {
        this.isMenuOpen = true;
        this.isRowMenuOpen = false;
      }
      else {
        this.isMenuOpen = false;
        this.isRowMenuOpen = false;
      }
    }
  }

  updateRecordState(event: any): any {
    if (event.state == 'Soft Deleted' || event.state == 'Archived' || event.state == 'Active' || event.state == 'Edit') {
      if (this.mainlayout.checkisRecordLock('Record_Manager_Design', event.row.id) != false) {
        return false;
      }
    }
    if (event.state == "Soft Deleted") {
      // click on Soft Delete option
      recordSoftDeleteState('Record Manager Design', event, this.popup).then((val) => {
        val.afterClosed().subscribe((resultPromise: any) => {
          if (resultPromise) {
            this.apiCallForRecordStateUpdate(event);
          }
        });
      });
    } else if (event.state == "Edit") {
      // click on Edit option
      this.isRecordManagerDesignInlineEdit.emit(true);
      const iindex = this.getAllData.findIndex(i => i.recordState == "Active");
      if (iindex > -1) {
        this.getAllData[iindex].reviewControlType = this.commonService.strinfValueConvertToMultiselectValueInList(this.getAllData[iindex].reviewControlType);
        this.getAllData[iindex].approvalControlType = this.commonService.strinfValueConvertToMultiselectValueInList(this.getAllData[iindex].approvalControlType);
        this.getControlIsValid(iindex);
        this.disableReviewControlType(this.constant.columnName.reviewControlType, this.constant.controller.reviewNotUsed, this.constant.columnName.reviewControlTypes, iindex);
        this.disableReviewControlType(this.constant.columnName.approvalControlType, this.constant.controller.approvalNotUsed, this.constant.columnName.approvalControlTypes, iindex);
      }

      this.mainlayout.recordLockCreate(event.row.id, 'Record_Manager_Design');
      sessionStorage.setItem('returnStop', 'No');
      this.saveCompanyRecord = true;
      this.updateEditInline(event);
    } else if (event.state === 'Record Manager') {
      // click on Record Manager option
    } else if (event.state === 'Archived') {
      // click on Archive option
      recordArchivedState('Record Manager Design', event, this.popup).then((ele) => {
        ele.afterClosed().subscribe((resultPromise: any) => {
          if (resultPromise) {
            this.error_msg = [];
            this.apiCallForRecordStateUpdate(event);
          }
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      recordRestoreState('Record Manager Design', this.popup).then((ele) => {
        ele.afterClosed().subscribe((resultPromise: any) => {
          if (resultPromise) {
            this.error_msg = [];
            this.apiCallForRecordStateUpdate(event);
          }
        });
      });
    }
  }
  // Authentication popup on update record State
  apiCallForRecordStateUpdate(event: any) {
    this.error_msg = [];
    authenticationPopup('Record Manager Design', 'Record_Manager_Design', 'Edit', this.mainlayout, RecordManagerDesignListComponent).then((data: any) => {
      if (data) {
        this.updateRecord(event, data['reason'], data['password']);
        // Record Manager Person Update Record
        // let reason = '';
        // if (event.state === 'Archived' || event.state === 'Soft Deleted') {
        //   reason = this.constant.reasonForEdit.stateOne;
        // } else if (event.state === 'Active') {
        //   reason = this.constant.reasonForEdit.stateTwo;
        // }
        // this.getRecordManagerPersonData(event.row, reason);
      } else {
        this.error_msg.push('Password Incorrect .');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  updateRecord(event: any, reasonForEdit = '', password = '') {
    this.loading = true;
    this.isRowMenuOpen = false;
    const jsonObject: any = [this.utils.getJsonForUpdateRecord(event, '', true)];
    jsonObject[0]['reasonForEdit'] = reasonForEdit;
    jsonObject[0]['password'] = password;
    // Record State change api
    this.service.MultiEditRecordStateChange(jsonObject, 'UpdateRecordManagerDesignStatus').then((data: any) => {
      if (data == 'The record(s) edited successfully.') {
        sessionStorage.setItem('returnStop', 'Yes');
        this.loading = false;
        this.multiEditsave = false;
        this.editview = false;
        if (!this.isFilterApplied)
          this.getRecordManagerGetData({ offset: 0, pageSize: '10', sort: this.sortinParam, order: this.sortOrder });
        else
          event.row.recordState = event.state;
        event.row.Restorable = event.state;
        event.row.Archived = event.state;
        const lineOutsub = this.popup.open(EditSuccessComponent, ({ data: { title: 'Record Manager Design Record State Change', context: 'Record Manager Design record state has been updated' } }));
        lineOutsub.afterClosed().subscribe((resultPromise: any) => {
          if (resultPromise) {
            this.getRecordManagerGetData({ offset: 0, pageSize: '10', sort: this.sortinParam, order: this.sortOrder });
          }
        });
      } else {
        this.loading = false;
        this.apiErrorEvent.emit(data.error);
      }
    }).catch((error: any) => {
      this.loading = false;
      this.apiErrorEvent.emit(error.error);
    });
  }

  updateEditInline(event: any) {
    if (event.state === "Edit") {
      this.editview = true;
    } else {
      this.editview = false;
    }
    this.Indexmodeltable = event.Index;
    this.cd.detectChanges();
    this.inlineArray.push(event.row);
    this.row = this.inlineArray;
    this.editmode = event.edit;
  }

  MultiEditupdateRecordState(event: any): any {
    if (event.state == 'Soft Deleted' || event.state == 'Archived' || event.state == 'Active' || event.state == 'Edit') {
      if (this.mainlayout.checkisRecordLock('Record_Manager_Design', this.selected) != false) {
        return false;
      }
    }
    if (event.state == "Soft Deleted") {
      recordSoftDeleteState('Record Manager Design', event, this.popup).then((val) => {
        val.afterClosed().subscribe((resultPromise: any) => {
          if (resultPromise) {
            this.multiEditStateChange(event);
          }
        });
      }).catch((err) => {
        console.log(err);
      });
    } else if (event.state === 'Audit Log') {
      this.multiEditStateChange(event);
    } else if (event.state === 'Archived') {
      recordArchivedState('Record Manager Design', event, this.popup).then((val) => {
        val.afterClosed().subscribe((resultPromise: any) => {
          if (resultPromise) {
            this.multiEditStateChange(event);
          }
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      recordRestoreState('Record Manager Design', this.popup).then((val) => {
        val.afterClosed().subscribe((resultPromise: any) => {
          if (resultPromise) {
            this.multiEditStateChange(event);
          }
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  multiEditStateChange(event: any) {
    this.MultiSelectArray = [];
    this.multiStateArray = [];
    this.GetSelectedRecordId();
    this.selected = [];
    this.isRowMenuOpen = false;
    event.row = this.MultiSelectArray;

    if (event.state === 'Audit Log') {
      this.utils.isMultiAudit = true;
      this.utils.isMultiAuditLogTableName = "Record_Manager_Design";
      const previousUrl = localStorage.getItem('last_visited_url');
      localStorage.setItem('recordManagerDesignPreviousUrl', previousUrl);
      const navigation = JSON.stringify(this.mainlayout.navigation);
      localStorage.setItem('recordManagerDesignPostBreadcrumb', navigation);
      // this.storage.remove('lastUrl');
      this.router.navigateByUrl('view/Record_Manager_Design/auditlog/' + this.rowIdList);
    } else {
      for (let i = 0; i < event.row.length; i++) {
        this.editState = event.state;
        const jsonObject: any = this.utils.getJsonForMultiUpdateRecord(event.row[i], this.editState, true);
        this.multiStateArray.push(jsonObject);
      }
      // Record Manager Person Update Record
      // let reason = '';
      // if (event.state === 'Archived' || event.state === 'Soft Deleted') {
      //   reason = this.constant.reasonForEdit.stateOne;
      // } else if (event.state === 'Active') {
      //   reason = this.constant.reasonForEdit.stateTwo;
      // }
      // this.getRecordManagerPersonData(this.MultiSelectArray[0], reason);

      this.rowIdList = '';
      this.mainlayout.checkPassworReasonForEdit('Record Manager Design', 'Record_Manager_Design', 'Edit').then((data1: any) => {
        if (data1) {
          this.loading = true;
          this.multiStateArray[0]['reasonForEdit'] = data1?.reason;
          this.multiStateArray[0]['password'] = data1?.password;
          this.service.MultiEditRecordStateChange(this.multiStateArray, 'UpdateRecordManagerDesignStatus').then((data: any) => {
            if (data == 'The record(s) edited successfully.') {
              sessionStorage.setItem('returnStop', 'Yes');
              this.selected = [];
              this.inlineArray = [];
              this.multiEditsave = false;
              if (!this.isFilterApplied) {
                this.getRecordManagerGetData({ offset: 0, pageSize: '10', sort: this.sortinParam, order: this.sortOrder });
                this.MultiSelectArray = [];
                this.arrSelected = [];
              }
              else {
                this.utils.loading = false;
                event.row.recordState = event.state;
                event.row.Restorable = event.state;
                event.row.Archived = event.state;
                editSuccedPopupControlledDocumentState('Record Manager Design', this.popup);
              }
            } else {
              this.loading = false;
              this.apiErrorEvent.emit(data.error);
            }
          }).catch((error) => {
            this.loading = false;
            this.apiErrorEvent.emit(error.error);
          });
        }
      });
    }

  }

  GetSelectedRecordId() {
    let arrSelctedRows: any;
    arrSelctedRows = [];
    arrSelctedRows = this.arrSelected && this.arrSelected.length > 0 ? this.arrSelected : this.selected;
    this.rowIdList = '';
    if (arrSelctedRows.length > 0) {
      arrSelctedRows.forEach((element: any) => {
        if (this.arrSelected && this.arrSelected.length > 0) {
          this.rowIdList = this.rowIdList + element.Row.id + ',';
          this.MultiSelectArray.push(element.Row);
        } else {
          this.rowIdList = this.rowIdList + element.id + ',';
          this.MultiSelectArray.push(element);
        }
      });
    }
  }

  routing(event: any) {
    // let url:any = this.urlparams.snapshot.url;
    // const previousUrl:any = url?.substring(1);
    const previousUrl = localStorage.getItem('last_visited_url');
    localStorage.setItem('recordManagerDesignPreviousUrl', previousUrl);
    const navigation = JSON.stringify(this.mainlayout.navigation);
    localStorage.setItem('recordManagerDesignPostBreadcrumb', navigation);
    // this.storage.remove('lastUrl');
    this.router.navigateByUrl('view/Record_Manager_Design/auditlog/' + event.row.id);
  }

  saveInlineRecord(event: any) {
    event;
  }

  cancelEdit() {
    // Cancel button functionality on SRV
    confirmtationPageLeave(this.popup).then((val) => {
      val.afterClosed().subscribe((resultPromise: any) => {
        if (resultPromise) {
          sessionStorage.setItem('returnStop', 'Yes');
          this.error_msg = [];
          this.editview = false;
          this.inlineArray = [];
          this.rowIdList = '';
          this.selected = [];
          this.multiEditsave = false;
          this.saveCompanyRecord = false;
          this.ngOnInit();
        }
      });
    });
  }

  onClick() {
    const element: HTMLElement = document.getElementsByClassName('btn addFilters datatable-filter-btn')[0] as HTMLElement;
    element.click();
  }

  gotoCV() {
    if (!this.recordId) {
      this.recordId = null;
    }
    if (this.linkId) {
      localStorage.setItem('renderEngineLinkId', this.linkId);
    } else {
      localStorage.removeItem('renderEngineLinkId');
    }
    localStorage.setItem('recordIdForRecordManagerDesign', this.recordId);
    this.router.navigateByUrl('view/recordManagerDesign/create/' + this.baseTableName);
  }

  getRecordManagerGetData(event: any) {
    this.loading = true;
    this.error_msg = [];
    this.tableData = [];
    this.row = [];
    this.inlineArray = [];
    this.rowIdList = '';
    this.editview = false;
    this.multiEditsave = false;
    this.page.pageIndex = event.offset;
    this.page.pageSize = event.pageSize;

    // get all api with pagination
    // this.service.getRecordManagerDesignData('RecordManagerDesign/getAll?pageIndex=' + event.offset + '&pageSize=' +
    // event.pageSize, this.sortinParam, this.sortOrder).then((data: any) => {

    this.service.geAllListGetData(this.baseModelTableData?.id, (this.recordManagerDesign == 'Design on Record' || this.recordManagerDesign == 'Dependent on File Design') ? this.recordId : null, event.offset, event.pageSize,
      this.sortinParam, this.sortOrder).then((data: any) => {
        if (data['status'] == 401) {
          this.popup.open(EditSuccessComponent, ({ data: { context: 'Session Expired. Please Login Again', title: 'Session Expired', isUnauthenticationFailed: true } }));
        } else if (data) {
          this.loading = false;
          // Set pagination
          this.page = data as Page;
          this.page.totalPages = this.page.totalCount / this.page.pageSize;
          // Data assign to table
          this.getAllData = data['items'];
          const isCreateButtonShowMRV = this.getAllData.filter(el => el.recordState == 'Active').length > 0 ? true : false;
          if (isCreateButtonShowMRV) {
            this.mrvCreateButtonShow.emit();
            // Restore op[tion disable if one record is active
            this.getAllData = this.getAllData.map(v => v.recordState == 'Archived' ? ({ ...v, isActive: false }) : ({ ...v, isActive: true }));
          } else {
            this.mrvCreateButtonHide.emit();
          }
          // replace |@@@@| from string
          this.getAllData.forEach(element => {
            if (element.reviewControlType) {
              element.reviewControlType = element.reviewControlType.split('|@@@@|').toString().replace(',', ', ');
            } if (element.approvalControlType) {
              element.approvalControlType = element.approvalControlType.split('|@@@@|').toString().replace(',', ', ');
            }
          });

          if (data['items'].length > 0) {
            this.isActiveRMDesign = data['items'].filter((el: any) => el.recordState == 'Active');
            if (this.isActiveRMDesign && this.isActiveRMDesign.length > 0) {
              const isShowRMClassification = this.commonService.isShowRMClassification(this.isActiveRMDesign);
              this.recordManagerClassificationShow.emit(isShowRMClassification);
            }

            // Record Review and Approval Tab show
            // const isShowRRA = this.commonService.isShowRRA(isActiveRMDesign);
            // this.recordReviewandApprovalShow.emit(isShowRRA);
          } else if (data['items'].length == 0) {
            this.recordManagerClassificationShow.emit(false);
          }

          // Create GET API request
          this.getCreateGetData();
        }


      }).catch((error) => {
        // const msg = error?.substr(error?.indexOf('.: ') + 1);
        // this.error_msg = msg?.split('.-1');
        this.apiErrorEvent.emit(error.error);
      });
  }

  // Record Manager person Records
  getRecordManagerPersonData(event: any, reasonForEdit: any) {
    this.loading = true;
    this.service.gePersonAllListGetData(this.baseModelTableData?.id, this.recordManagerDesign == this.constant.designonRecord ? this.recordId : null, 0, '100',
      this.sortinParam, this.sortOrder).then((data: any) => {
        this.loading = false;
        if (data['status'] == 401) {
          sessionOutPopup(this.popup);
        } else if (data) {
          this.loading = false;
          this.tableData = data['items'];

          if (this.tableData.length > 0) {
            this.onStatusUpdateData(event, reasonForEdit);
          }
        } else if (data['status'] == 400 || data['status'] == 404) {
          this.error_msg = this.utils.apiError('inline', data);
        }
      });
  }

  // Record Manager Person Get Record API call
  recordManagerPersonGet() {
    this.loading = true;
    this.service.gePersonAllListGetData(this.baseModelTableData?.id, this.recordManagerDesign == this.constant.designonRecord ? this.recordId : null, 0, '100',
      null, null).then((data: any) => {
        this.loading = false;
        if (data['status'] == 401) {
          // sessionOutPopup(this.popup);
        } else if (data) {
          this.loading = false;
          this.tableData = data['items'];
        } else if (data['status'] == 400 || data['status'] == 404) {
          this.error_msg = this.utils.apiError('inline', data);
        }
      });
  }

  // Record Manager Person Record Update
  onStatusUpdateData(event: any, reasonForEdit: any) {
    this.service.errormessagesRemove();
    this.loading = true;
    const recordManagerDesignId = event.id;

    this.error_msg = [];
    // Reason for edit check on create
    this.mainlayout.checkPassworCogIcon('Record_Manager_Person').then((data1: any) => {
      if (data1) {
        // JSON['password'] = data1?.password;
        const reason = data1.reasonForEdit == 'Required' ? reasonForEdit : null;
        const isActiveRMDesign = this.isActiveRMDesign && this.isActiveRMDesign.length > 0 ? this.isActiveRMDesign : null;
        const reviewApprovalRequest: any = this.jsonService.updateRMPersonJson(this.baseModelTableData.id, this.recordId, this.tableData, recordManagerDesignId, reason, isActiveRMDesign);
        // Create post API
        this.service.updateRecordPerson(reviewApprovalRequest).then((data: any) => {
          if (data['ok'] !== undefined && data['ok'] === false) {
            throw data;
          }
          if (data) {
            this.loading = false;
          }
        }).catch((error: any) => {
          this.loading = false;
          this.apiErrorEvent.emit(error.error);
        });
      } else {
        this.error_msg.push('Password Incorrect .');
      }
    }).catch((err) => {
      this.apiErrorEvent.emit(err.error);
    });
  }

  // Create get API
  getCreateGetData() {
    this.loading = true;
    // create Get API
    this.service.getCreateGetData().then((data: any) => {
      if (data['status'] == 401) {
        this.popup.open(EditSuccessComponent, ({ data: { context: 'Session Expired. Please Login Again', title: 'Session Expired', isUnauthenticationFailed: true } }));
      } else if (data) {
        this.loading = false;
        this.createGetData = data;
        const reviewControlTypes: any = [];
        const approvalControlTypes: any = [];
        // Assign value from array to array object for multiselect dropdown control [Review Control (Type)]
        if (this.createGetData.reviewControlTypes) {
          this.createGetData.reviewControlTypes.forEach((element: any) => {
            reviewControlTypes.push({ 'id': element, 'itemName': element });
          });
        }
        // Assign value from array to array object for multiselect dropdown control [Approval Control (Type)]
        if (this.createGetData.approvalControlTypes) {
          this.createGetData.approvalControlTypes.forEach((element: any) => {
            approvalControlTypes.push({ 'id': element, 'itemName': element });
          });
        }
        this.createGetData.reviewControlTypes = reviewControlTypes;
        this.createGetData.approvalControlTypes = approvalControlTypes;
      }
    }).catch((error: any) => {
      this.loading = false;
      this.apiErrorEvent.emit(error.error);
    });
  }

  getControlIsValid(index: any) {
    this.commonService.setControlIsValidCommon(this.isValidControl, this.propertyValues);
    // Review Control (Type) column based condition value assingment
    if (this.getAllData[index].reviewControlType && this.getAllData[index].reviewControlType.length > 0) {
      for (let i = 0; i < this.getAllData[index].reviewControlType.length; i++) {
        const reviewControlTypeValue = this.getAllData[index].reviewControlType[i].itemName;
        this.commonService.reviewControlTypeRelatedColumnDataCommon(reviewControlTypeValue, this.isValidControl, this.propertyValues, this.getAllData, index);
      }
    } else if (!this.getAllData[index].reviewControlType || this.getAllData[index].reviewControlType.length == 0) {
      this.getAllData[index].reviewControlOrder = null;
      this.getAllData[index].reviewControlUser = null;
    }

    // Approval Control (Type) column based condition value assingment
    if (this.getAllData[index].approvalControlType && this.getAllData[index].approvalControlType.length > 0) {
      for (let i = 0; i < this.getAllData[index].approvalControlType.length; i++) {
        const approvalControlTypeValue = this.getAllData[index].approvalControlType[i].itemName;
        this.commonService.approvalControlTypeRelatedColumnDataCommon(approvalControlTypeValue, this.isValidControl, this.propertyValues, this.getAllData, index);
      }
    } else if (!this.getAllData[index].approvalControlType || this.getAllData[index].approvalControlType.length == 0) {
      this.getAllData[index].approvalControlOrder = null;
      this.getAllData[index].approvalControlUser = null;
    }
    // Assignment Control (User) column value assignment based on Assignment Control (Acknowledgment) column base
    this.commonService.assignmentControlUser(this.isValidControl, this.propertyValues, this.getAllData, index);
    const ownershipControlAckValue = this.getAllData[index].ownershipControlAcknowledgement;
    // Ownership Control (User) value assign
    this.commonService.ownershipControlUserValueAssignCommon(ownershipControlAckValue, this.isValidControl, this.propertyValues, this.getAllData, index);
    // Ownership Control (Acknowledgement) value assign
    this.commonService.ownershipControlAcknowledgementValueAssignCommon(this.isValidControl, this.propertyValues, this.getAllData, index);
    // Remove duplicate assigned value from array
    this.commonService.duplicateValueRemoveCommon(this.propertyValues);
  }

  disableReviewControlType(control: any, notUserValue: any, data: any, index: any) {
    const controlTypes = control == 'reviewControlType' ? 'reviewControlTypes' : 'approvalControlTypes';
    if (this.createGetData && this.createGetData[data]) {
      for (let i = 0; i < this.createGetData[data].length; i++) {
        this.createGetData[data][i] = Object.assign({}, this.createGetData[data][i], { isDisabled: false });
      }
    }

    if (this.getAllData[index][control] && this.createGetData) {
      const filterValue = this.getAllData[index][control].filter((el: any) => el.itemName == notUserValue);
      if (filterValue.length > 0) {
        if (this.getAllData[index][control].length > 1) {
          this.getAllData[index][control] = filterValue;
          if (data == 'approvalControlTypes') {
            this.getAllData[index].approvalControlUser = null;
          } else {
            this.getAllData[index].reviewControlUser = null;
          }
        }
        const indexNotUserValue = this.createGetData[data].findIndex((el: any) => el.itemName == notUserValue);
        for (let i = 0; i < this.createGetData[data].length; i++) {
          if (i != indexNotUserValue) {
            this.createGetData[data][i] = Object.assign({}, this.createGetData[data][i], { isDisabled: true });
          } else {
            this.createGetData[data][i] = Object.assign({}, this.createGetData[data][i], { isDisabled: false });
          }
        }
      } else {
        const reviewControlValue = [this.constant.controller.primaryOwner, this.constant.controller.primaryOwnerPlusOrgLevelByPrimaryOwner, this.constant.controller.primaryOwnerPlusOrgLevelPerDesign];
        const filterReviewControlValue = this.getAllData[index][control].filter((el: any) => reviewControlValue.indexOf(el.itemName) != -1);
        if (filterReviewControlValue.length > 0) {
          const startI = this.createGetData[controlTypes].findIndex((el: any) => el.itemName === this.constant.controller.primaryOwner);
          const endI = this.createGetData[controlTypes].findIndex((el: any) => el.itemName === this.constant.controller.primaryOwnerPlusOrgLevelPerDesign);
          for (let i = startI; i <= endI; i++) {
            if (this.createGetData[data][i].itemName !== filterReviewControlValue[0].itemName) {
              this.createGetData[data][i] = Object.assign({}, this.createGetData[data][i], { isDisabled: true });
            } else {
              this.createGetData[data][i] = Object.assign({}, this.createGetData[data][i], { isDisabled: false });
            }
          }
        }
      }
      const cloneCreateGet = _.cloneDeep(this.createGetData[data]);
      this.createGetData[data] = cloneCreateGet;
      this.cd.detectChanges();
    }
  }

  cancel() {
    confirmtationPageLeave(this.popup).then((val) => {
      val.afterClosed().subscribe((resultPromise: any) => {
        if (resultPromise) {
          this.tableData = [];
          this.rowIdList = '';
          this.editview = false;
          this.multiEditsave = false;
          // this.rows = this.rowsOldData;
          this.error_msg = [];
          this.apiErrorEvent.emit(this.error_msg);
          sessionStorage.setItem('returnStop', 'Yes');
          this.getRecordManagerGetData({ offset: 0, pageSize: '10', sort: this.sortinParam, order: this.sortOrder });
          this.isRecordManagerDesignInlineEdit.emit(false);
        }
      });
    });
  }

  updateData(): any {
    // Validation Check all control
    this.service.errormessagesRemove();
    this.errorHandling.clearError();
    this.objErrorMsg = [];
    let activeRecord = null;
    const iindex = this.getAllData.findIndex(i => i.recordState == "Active");
    if (iindex > -1) {
      activeRecord = this.getAllData[iindex].id;
    }
    this.commonService.validateRecord(this.getAllData, this.objErrorMsg, this.error_msg, this.isValidControl, iindex);
    if (this.objErrorMsg.length > 2) {
      this.error_msg = [];
      this.error_msg.push('Please fill the required values');
      this.apiErrorEvent.emit(this.error_msg);
      return false;
    } else if (this.objErrorMsg.length > 0 && this.objErrorMsg.length <= 2) {
      this.error_msg = this.objErrorMsg;
      this.apiErrorEvent.emit(this.error_msg);
      return false;
    }
    // Validate Record Manager Person User Type is match with Record Manager Design column
    const activeRMDRecord = this.getAllData.filter(i => i.recordState == "Active");
    if (activeRMDRecord.length > 0) {
      const errorPop = this.commonService.userTypeCheck(activeRMDRecord, this.tableData);
      if (errorPop) {
        this.popup.open(EditSuccessComponent,
          ({ data: { title: 'Error', context: errorPop } }));
        return false;
      }
    }
    this.loading = true;
    const JOSN = this.jsonService.srvUpdateJSON(this.baseModelTableData.id, this.recordId, this.getAllData, activeRecord, iindex);
    this.service.updateRecord(JOSN).then((data: any) => {
      if (data['ok'] !== undefined && data['ok'] === false) {
        throw data;
      }
      if (data['status'] === 200 || data == 'The record(s) edited successfully.') {
        sessionStorage.setItem('returnStop', 'Yes');
        this.popup.open(EditSuccessComponent, ({ data: { title: 'Record Manager Design', context: 'Record Manager Design Record updated successfully' } }));
        this.getRecordManagerGetData({ offset: 0, pageSize: '10', sort: this.sortinParam, order: this.sortOrder });
        this.isRecordManagerDesignInlineEdit.emit(false);
        this.loading = false;
        this.error_msg = [];
        this.apiErrorEvent.emit(this.error_msg);
        this.RecordReviewAndApprovalGet();
      }
    }).catch((error: any) => {
      this.loading = false;
      this.apiErrorEvent.emit(error.error);
    });
  }

  // Filter data
  filterData(event: any) {
    if (event != null) {
      this.loading = false;
      this.isFilterApplied = true;
      this.page = event as Page;
      this.page.totalPages = this.page.pageSize / this.page.totalCount;
      this.tableData = event.items;
    }
    else {
      this.isFilterApplied = false;
      this.loading = true;
      // Get api for model table get Data
      this.service.getModelTableData(this.baseTableName).then((data: any) => {
        if (data['status'] == 401) {
          this.popup.open(EditSuccessComponent, ({ data: { context: 'Session Expired. Please Login Again', title: 'Session Expired', isUnauthenticationFailed: true } }));
        } else if (data) {
          this.loading = false;
          this.baseModelTableData = data;
          this.getRecordManagerGetData({ offset: this.page.pageIndex, pageSize: this.page.pageSize, sort: this.sortinParam, order: this.sortOrder });
        }
      }).catch((error: any) => {
        this.apiErrorEvent.emit(error.error);
      });
    }
  }

  // Record Review and Approval Get Record API call
  RecordReviewAndApprovalGet() {
    this.loading = true;
    this.service.geAllRecordReviewAndApprovalGetData(this.baseModelTableData?.id, (this.recordManagerDesign == this.constant.designonRecord || this.recordManagerDesign == this.constant.dependentonFileDesign) ? this.recordId : null, 0, '100',
      null, null).then((data: any) => {
        this.loading = false;
        if (data['status'] == 401) {
          // sessionOutPopup(this.popup);
        } else if (data) {
          this.loading = false;
          this.recordReviewAndApprovalData = data['items'];
          if (this.recordReviewAndApprovalData.length > 0) {
            this.onSaveRMDUpdateRecordReview();
          }
        } else if (data['status'] == 400 || data['status'] == 404) {
          this.error_msg = this.utils.apiError('inline', data);
        }
      });
  }

  onSaveRMDUpdateRecordReview() {
    this.service.errormessagesRemove();
    this.loading = true;
    const recordManagerDesignId: any = null;

    this.error_msg = [];
    // Reason for edit check on create
    this.mainlayout.checkPassworCogIcon('Record_Manager_Design').then((data1: any) => {
      if (data1) {
        // JSON['password'] = data1?.password;
        const reason = data1.reasonForEdit == 'Required' ? 'test' : null;
        const activeRMDRecord = this.getAllData.filter(i => i.recordState == "Active");
        const reviewApprovalRequest: any = this.jsonService.updateRRAJson(this.baseModelTableData.id, this.recordId, this.recordReviewAndApprovalData, recordManagerDesignId, reason, activeRMDRecord[0]);
        // Create post API
        this.service.updateRRARecord(reviewApprovalRequest).then((data: any) => {
          if (data['ok'] !== undefined && data['ok'] === false) {
            throw data;
          }
          if (data) {
            this.loading = false;
          }
        }).catch((error: any) => {
          this.loading = false;
          this.error_msg = this.utils.apiError('inline', error);
        });
      } else {
        this.error_msg.push('Password Incorrect .');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
