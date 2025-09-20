import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor() { }

  public init(){
    console.log("App initialized");
  }

}
