import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/models/News.model';
import { NewsMedia } from 'src/app/models/NewsMedia.model';
import { MediaService } from 'src/app/services/media.service';
import { NewsMediaService } from 'src/app/services/news-media.service';
import { NewsService } from 'src/app/services/news.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  public newsItem: News | undefined;
  public newsImage: string = '';
  public imgApi: string = environment.imgApi
  constructor(private activeRoute: ActivatedRoute, private newsService: NewsService, private newsMedia: NewsMediaService, private mediaService: MediaService, private tagService: TagsService) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((P) => {
      this.newsService.getNewsById(Number(P.id)).then((news) => {
        this.newsItem = news;
        if (this.newsItem && this.newsItem.id) {
          this.newsMedia.getNewsMediaById(this.newsItem.id).then(res => {
            let _newsMedia: NewsMedia | undefined = res;
            if (_newsMedia && _newsMedia.mediaId) {
              this.mediaService.getMediaById(_newsMedia.mediaId).then(media => {
                if (media && media.id) {
                  this.newsImage = `${this.imgApi}/Media/GetMedia?id=${media.id}`;
                }
              })
            }
          })
        }
      });
    });
  }

}
