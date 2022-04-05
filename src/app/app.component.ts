import { Component } from '@angular/core';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { UrlInfo } from 'aws-appsync-subscription-link/lib/types/index';
import { onError } from '@apollo/client/link/error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'TestApolloClient';

  constructor() {
  }
  createApolloClient() {
    const url: string = '<aws appsync url>';
    const region: string = '<aws appsync region>';
    const auth: any = '<auth token>';
    const httpLink: ApolloLink = createHttpLink({ uri: url, fetch: fetch });

    const urlInfo: UrlInfo = {
      url: url,
      auth: auth,
      region: region,
    };

    const link: ApolloLink = ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {}),
      createAuthLink({ url, region, auth }),
      createSubscriptionHandshakeLink(urlInfo, httpLink)
    ]);
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }
}
