import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { CityService } from '../shared/city/city.service';
import { City } from '../shared/city/city.model';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styles: [],
})

export class CitiesComponent implements OnInit {
i: any;
  constructor(public service: CityService,
    private toastr: ToastrService) {}

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<City>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.service.refreshList2().subscribe({
      next: (cities: City[]) => {
        this.dataSource.data = cities;
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
    if (confirm('هل أنت متأكد من مسح المدينه المحددة')) {
      this.service.deleteCity(id).subscribe({
        next: (res) => {
          this.service.cities = res as City[];
          this.toastr.error('تم المسح بنجاح');
        },
        error: (err) => {
          if (err.status === 409) {
            this.toastr.error(
              'لا يمكن مسح المدينة لأنها تحتوي على عيادات مرتبطة.'
            );
          } else {
            console.log(err.message);
            this.toastr.error('حدث خطأ غير متوقع');
          }
        },
      });
    }
  }
}
