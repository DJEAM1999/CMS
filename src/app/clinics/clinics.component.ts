import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicService } from '../shared/clinic/clinic.service';
import { Clinic } from '../shared/clinic/clinic.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styles: [],
})
export class ClinicsComponent implements OnInit {
[x: string]: any;
  constructor(public service: ClinicService ,
    private toastr:ToastrService) {}

    displayedColumns: string[] = ['id', 'name', 'cityName', 'actions'];
    dataSource = new MatTableDataSource<Clinic>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.service.refreshList2().subscribe({
      next:(clinics:Clinic[]) =>{
        this.dataSource.data = clinics;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching cities:', err);
      },
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getIndex(i: number): number {
    return i + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
  }
  onDelete(id: number) {
    if (confirm('هل انت متأكد من مسح العيادة؟')) {
      this.service.deleteClinic(id).
      subscribe({
        next: (res) => {
          this.service.refreshList()
          this.service.clinics = res as Clinic[];
          this.toastr.error('تم المسح بنجاح')
        },
        error: (err) => {
          if (err.status === 409) {
            this.toastr.error('لا يمكن مسح العيادة لأنها تحتوي على ملفات مرضى مرتبطة.');
          } else {
            console.log(err.message);
            this.toastr.error('حدث خطأ غير متوقع');
          }
        },
      });
    }
  }
}
