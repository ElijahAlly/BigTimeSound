import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


const App = () => (
    <div>
        <div>
            Welcome to BigTimeSound!
        </div>
        {/* <div>
            <header>
                <Link to="/" className="header-link">
                </Link>
                <GreetingContainer />
            </header>
            <Switch>
                <AuthRoute exact path="/login" component={LogInFormContainer} />
                <AuthRoute exact path="/signup" component={SignUpFormContainer} />
                <ProtectedRoute exact path="/benches/new" component={BenchFormContainer} />
                <Route path="/benches/:benchId" component={BenchShowContainer} />
                <Route exact path="/" component={SearchContainer} />
            </Switch>
        </div> */}
    </div>
  );
  
  export default App;