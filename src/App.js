import './App.css';
import { Suspense,lazy } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import Header from './component/Header';
import Error from './component/Error';
import Order from './component/Order';
import Cart from './component/Cart';
import Wishlist from './component/Wishlist';
import Admin from './component/Admin';
import Footer from './Footer';
import Profile from './component/Profile';
import Notification from './component/Notification';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './component/Redux/store';
import { Provider } from 'react-redux';
import Product from './component/Product';
function App() {
  return (
    <Provider store={store}>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Router>
    <Header/>
      <Routes>
        <Route path="/" exact Component={Product} />
        <Route path="/cart" exact Component={ Cart} />
        <Route path="/admin" exact Component={Admin } />
        <Route path="/profile" exact Component={Profile}/>
        <Route path="/notification" exact Component={Notification}/>
        <Route path="/wishlist" exact Component={Wishlist}/>
        <Route path="/orders" exact Component={Order}/>
        <Route path="*" Component={Error} />
      </Routes> 
      <Footer />
    </Router>
  </ErrorBoundary>
  </Provider>
  );
}

export default App;
