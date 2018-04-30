import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(apollo: Apollo) {
    apollo.query({query:
        gql`query{
              getUser(id:1){
                id
                email
              }
            }`
    }).subscribe(console.log);
  }

  async ngOnInit() {

  }


}
