import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './news-home.component';
import { NewsService } from '../services/news.service';
import { APP_BASE_HREF } from '@angular/common';
import { NewsMaterialModule } from '..//news-material/news-material.module';
import { NewsComponent } from '../news-feed/news-feed.component';
import { NewsContainerComponent } from '../news-container/news-container.component';
import { Observable } from 'rxjs';
import { News } from '../models/news';
import { HttpModule } from '@angular/http';
import { NewsRoutingModule } from '../news-route/news-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { INews } from '../models/news.inteface';
import { NewsSearchComponent } from '../news-search/news-search.component';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, NewsComponent, NewsContainerComponent,NewsSearchComponent],
      imports: [NewsMaterialModule,HttpModule,HttpClientModule, NewsRoutingModule, BrowserAnimationsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        NewsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    newsService = TestBed.get(NewsService);
    spyOn(newsService, 'get').and.returnValue(new Observable<Array<INews>>());
   
    newsService.get('');
    spyOn(component, 'categoryChange').and.returnValue(new Observable<Array<INews>>());
    spyOn(component, 'getHeadLines').and.stub();
    spyOn(component, 'getCategory').and.stub();
  });

  it('getHeadLines method should get top headlines news.', async(() => {
    component.getHeadLines();
    fixture.detectChanges();   
    expect(newsService.get).toHaveBeenCalled();
    expect(component.categoryChange).not.toHaveBeenCalled();
  }));

  it('getCategory method should get category wise news.', async(() => {
    component.getCategory();
    fixture.detectChanges();
    expect(newsService.get).toHaveBeenCalledWith(jasmine.any(String));
  }));

  it('category Change method should get category wise news by calling getCategory method.', async(() => {
    component.categoryChange();
    fixture.detectChanges();
    expect(component.categoryChange).toHaveBeenCalled();
  }));
});
