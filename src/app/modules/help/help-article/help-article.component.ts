import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/models/Topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-help-article',
  templateUrl: './help-article.component.html',
  styleUrls: ['./help-article.component.scss']
})
export class HelpArticleComponent implements OnInit {
  topic?: Topic;
  constructor(private topicService: TopicService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(PARAMS => {
      if (PARAMS) {
        this.topicService.getTopicById(PARAMS.id).then(res => {
          this.topic = res
        })
      }
    })
  }

}
