import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, retry } from 'rxjs';
import { Recipes } from 'src/shared/Models/Recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  Recipes: any = [];
  recipes: Recipes[] = [];
  Api_Key = '0ffe4b45d37943c7b78e0aceb5181215';
  Orec: any;

  constructor(private http: HttpClient) {}

  getRecipes() {
    const data = localStorage.getItem('Recipes');
    if (data) {
      this.Recipes = JSON.parse(data);
      return of(this.Recipes);
    } else {
      return this.http.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.Api_Key}&number=100`
      );
    }
  }

  storeRecipe(data: any) {
    this.getRecipes().subscribe((data) => {
      this.Recipes = data;
      console.warn(data);
    });
    localStorage.setItem('Recipes', JSON.stringify(this.Orec));
  }

  // getAllFoodsSearch(search: string) {
  //   this.getRecipes().subscribe((data) => {
  //     this.Recipes = data;
  //     this.Orec = this.Recipes.results;
  //   });
  //   return this.Orec.filter((recipes: any) =>
  //     recipes.title.toLowerCase().includes(search.toLocaleLowerCase)
  //   );
  // }
}
