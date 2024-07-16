import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {

  constructor(private gifServices:GifsService) {}

  @ViewChild('txtTagInput') // Acceder al input con #
  public tagInput!: ElementRef<HTMLInputElement>; // Acceder al input con ViewChild

  public searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifServices.searchTag(newTag);
    this.tagInput.nativeElement.value = '';

  }
}
