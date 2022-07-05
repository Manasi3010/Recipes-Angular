import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/Service/recipe.service';

interface Recipes {
  id: string;
  title: string;
  image: string;
  imageType: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Rec: any = [];
  Orec: Array<any> = [];
  displayedColumns: string[] = ['Id', 'Title'];
  dataSource!: MatTableDataSource<any>;
  obs!: Observable<any>;
  pageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  title: string = '';
  constructor(
    private recipe: RecipeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.recipe.getRecipes().subscribe((data: Recipes[]) => {
      console.log(data);
      this.Rec = data;
      this.Orec = this.Rec.results;
      console.log(this.Orec);
      this.dataSource.data = this.Rec.results;
      this.obs = this.dataSource.connect();
    });
  }
  search() {
    if (this.title != null) {
      this.Orec = this.Orec.filter((val) => {
        return val.title.toLowerCase().match(this.title.toLocaleLowerCase());
      });
    }
  }
}
