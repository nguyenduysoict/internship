import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-store-post',
  templateUrl: './store-post.component.html',
  styleUrls: ['./store-post.component.css']
})
export class StorePostComponent implements OnInit {

  data: any[] = [];
  len: number;
  posts: Post[];
  title: string;
  NotFound: boolean;
  constructor( private accountService: AccountService, private router: Router, private postService: PostService) { }

  ngOnInit() {
    this.posts = this.accountService.getLogPost();
    this.len = this.posts.length;
    if (this.len === 0) {
      this.NotFound = true;
    } else {
      this.NotFound = false;
    }

  }
  onPostDetail(str, item) {
    this.title = str;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '-');
    str = str.replace(/ /g, '-');
    str = str.trim();
    this.postService.passPostDetail(item);
    this.router.navigate(['posts/', str]);
  }
}
