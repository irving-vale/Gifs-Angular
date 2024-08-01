import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    this.reTagGifs();
    console.log({ tagHistory: this.tagHistory });
  }

  private _tagHistory: string[] = [];

  private apiKey: string = 'WUJDkXSalBtYtYFM2kL4l2juw7B9CHrL';

  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[] = [];

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string): void {
    if (this.tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) {
      return;
    }
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params: params })
      .subscribe((response) => {
        this.gifList = response.data;
        console.log({ Gifs: this.gifList });
      });
  }
  //  salvar local storage
  private saveLocalStorage(): void {
    localStorage.setItem('tagHistory', JSON.stringify(this._tagHistory));
  }

  // Leer local storage
  private loadLocalStorage(): void {
    if (!localStorage.getItem('tagHistory')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('tagHistory')!);
    // if(this._tagHistory.length === 0) return;
    // this.searchTag(this._tagHistory[0]);
  }

  private reTagGifs(): void {
    const tags = this._tagHistory;
    if (tags.length === 0) return;
    this.searchTag(tags[0]);
  }
}
