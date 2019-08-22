import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import NavBar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Uploader from './components/records/ImageUpload';
import AllReceiptsImages from './components/records/AllReceiptsImages';
import SingleReceiptDetail from './components/records/SingleReceiptDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/signIn' component={SignIn} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/ImageUpload' component={Uploader}/>
          <Route path='/allReceipts' component={AllReceiptsImages} />
          <Route path='/receiptDetail/:id' component={SingleReceiptDetail}/>
        </Switch>
      </h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
