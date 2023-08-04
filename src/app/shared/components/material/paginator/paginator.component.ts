import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Result } from 'src/app/core/interfaces/pokemon.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  @Input() items : Result[] = [];
  @Input() length : number = 0;
  @Input() pageIndex : number = 0;
  itemsSlice : Result[] = [];
  pageSize : number = 12;
  pageEvent!: PageEvent;
  @Output() paginated: EventEmitter<Result[]> = new EventEmitter();

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    console.log(event.pageSize);
    console.log(startIndex);
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.items.length) {
      endIndex = this.items.length;
    }
    this.itemsSlice = this.items.slice(startIndex, endIndex);
    console.log(startIndex, endIndex);
    console.log(this.itemsSlice);
    this.paginated.emit(this.itemsSlice);
  }

}
