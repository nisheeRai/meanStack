import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postsService: PostsService) {

  }

  ngOnInit(): void {
    this.posts = this.postsService.getPost();
    this.postSub = this.postsService.getUpdateListerner().subscribe((posts: Post[])=> {
      this.posts = posts;
    } );
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
