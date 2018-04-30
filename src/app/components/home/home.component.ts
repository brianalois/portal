import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';

const USER_QUERY = gql`
  query User {
    allUsers{
      id
      email
    }
  }
`;

const USER_ADDED_SUB = gql`
        subscription onUserAdded{
          userAdded{
            id
            email
          }
        }`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allUsersQuery: QueryRef<any>;
  users: Observable<any>;
  params: any;

  constructor(apollo: Apollo) {
    this.allUsersQuery = apollo.watchQuery({
      query: USER_QUERY
    });

    this.users = this.allUsersQuery.valueChanges;

    // apollo.query({query:USER_QUERY}).subscribe(console.log);
  }

  async ngOnInit() {
    this.t();
    this.users.subscribe((data)=>{
      console.log('got data', data)
    });
  }

  t(){
    this.allUsersQuery.subscribeToMore(({
      document:USER_ADDED_SUB,
      updateQuery: (prev, {subscriptionData}) => {
        console.log(prev, subscriptionData);
        if (!subscriptionData.data) {
          return prev;
        }

        const newFeedItem = subscriptionData.data.userAdded;

        console.log('new', newFeedItem);

        return Object.assign({}, prev, {
            allUsers:[newFeedItem, ...prev.allUsers]
        });
      }
    }));
  }


}
