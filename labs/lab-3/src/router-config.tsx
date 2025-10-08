import App from './App.tsx';
import WelcomePage from './welcome-page.tsx';
import ComposeSalad from './compose-salad';
import ViewCart from './view-cart.tsx';
import PageNotFound from './page-not-found.tsx';

export const routerConfig = [
  {
    Component: App,
    children: [
      {
        index: true, 
        Component: WelcomePage
      },
      {
        path:'/compose-salad',
        Component: ComposeSalad
      },
      {
        path: '/view-cart/salad?/:saladId?',
        Component: ViewCart
      },
      {
        path:'/*',
        Component: PageNotFound
      }
    ]
  },
]