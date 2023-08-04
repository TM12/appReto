import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.component.html',
  styleUrls: ['./build-info.component.sass']
})
export class BuildInfoComponent implements OnInit {
  commitHash = environment.commitHash;
  buildDate = environment.buildDate;
  
  constructor() { }

  ngOnInit(): void {
  }

}
