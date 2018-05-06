import * as firebase from 'firebase';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Switch, Route, withRouter } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import AsyncContainer from './AsyncContainer';

import firebaseConf from '../configs/firebase';
import util from '../util';
import constants from '../constants';

const GlobalHeader = AsyncContainer(() => import('./GlobalHeader').then(module => module.default), {});
const Top = AsyncContainer(() => import('./Top').then(module => module.default), {});
const Login = AsyncContainer(() => import('./Login').then(module => module.default), {});
const Logout = AsyncContainer(() => import('./Logout').then(module => module.default), {});
const Signup = AsyncContainer(() => import('./Signup').then(module => module.default), {});
const Settings = AsyncContainer(() => import('./Settings').then(module => module.default), {});
const Core = AsyncContainer(() => import('./Core').then(module => module.default), {});

firebase.initializeApp(firebaseConf);

const styles = {
  root: {
    minHeight: '100vh',
  },
  circularProgress: {
    overflow: 'hidden',
    padding: 0,
  },
};

// constants.authType.EMAIL_AND_PASSWORDの方法でユーザーを登録すると
// displayNameが設定されないため一次的にこの変数に格納する。
let tmpDisplayName = '';

const database = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        displayName: '', photoURL: '', uid: '', email: '',
      },
      isOpenSupportBrowserDialog: false,
      isOpenHelpDialog: false,
      processing: true,
    };
  }

  componentWillMount() {
    // 認証でfirebaseのdefaultのhosturl(https://myapp.firebaseapp.com)にリダイレクトされた場合にURLを書き換える処理
    // https:// stackoverflow.com/questions/34212039/redirect-to-firebase-hosting-custom-domain
    const url = process.env.NODE_ENV === 'production' ? [constants.URL] : [constants.DEVURL1, constants.DEVURL2];
    if (url.indexOf(window.location.origin) === -1) window.location.href = constants.URL;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // dimension1はgaではuidとしている
        ReactGA.set({ dimension1: user.uid });
        database.ref(`/users/${user.uid}/settings/`).once('value').then((snapshot) => {
          if (snapshot.exists()) {
            const mySettings = snapshot.val();
            this.setState({
              user: {
                displayName: mySettings.displayName, photoURL: mySettings.photoURL, uid: mySettings.uid, email: mySettings.email,
              },
            });
          } else {
            // アカウント作成後の処理
            const mySettings = {
              displayName: user.displayName || tmpDisplayName, photoURL: user.photoURL || '', uid: user.uid, email: user.email,
            };
            this.setState({ user: mySettings });
            // EMAIL_AND_PASSWORDでユーザーを作成した場合、displayNameがnullなので、firebaseのauthで管理しているユーザーのプロフィールを更新する
            if (!user.displayName) user.updateProfile({ displayName: tmpDisplayName });
            database.ref(`/users/${user.uid}/settings/`).set(mySettings);
          }
        }).then(() => {
          this.setState({ processing: false });
          this.props.history.push('/');
        });
      }
      this.setState({ processing: false });
    });
  }

  componentDidMount() {
  }

  openHelpDialog() {
    this.setState({ isOpenHelpDialog: true });
  }

  closeHelpDialog() {
    this.setState({ isOpenHelpDialog: false });
  }

  toggleHelpDialog() {
    this.setState({ isOpenHelpDialog: !this.state.isOpenHelpDialog });
  }

  handleUser({ displayName, email, photoURL }) {
    this.setState({ user: Object.assign(this.state.user, { displayName, email, photoURL }) });
  }

  signup({
    type, username, email, password,
  }) {
    tmpDisplayName = username;
    this.setState({ processing: true });
    if (type === constants.authType.EMAIL_AND_PASSWORD) {
      if (!util.validateEmail(email) || password.length < 6) {
        this.setState({ processing: false, isOpenSnackbar: true, snackbarText: 'メールアドレスとパスワードを正しく入力してください。' });
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        this.setState({ processing: false, isOpenSnackbar: true, snackbarText: 'アカウントを作成しました。' });
      }, () => {
        this.setState({ processing: false, isOpenSnackbar: true, snackbarText: 'アカウント作成に失敗しました。' });
      });
    }
  }

  login({ type, email, password }) {
    if (util.isSupportBrowser()) {
      this.setState({ processing: true });
      if (type === constants.authType.GOOGLE) {
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      } else if (type === constants.authType.EMAIL_AND_PASSWORD) {
        if (!util.validateEmail(email) || password.length < 6) {
          this.setState({ processing: false, isOpenSnackbar: true, snackbarText: 'メールアドレスとパスワードを正しく入力してください。' });
          return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
          this.setState({ processing: false, isOpenSnackbar: true, snackbarText: 'ログインしました。' });
        }, () => {
          this.setState({ processing: false, isOpenSnackbar: true, snackbarText: 'ログインに失敗しました。' });
        });
      }
    } else {
      this.setState({ isOpenSupportBrowserDialog: true });
    }
  }

  logout() {
    firebase.auth().signOut().then(() => {
      // userの初期化
      this.setState({
        user: {
          displayName: '', photoURL: '', uid: '', email: '',
        },
      });
      this.props.history.push('/logout');
    }).catch((error) => {
      throw new Error(error);
    });
  }

  goSettings() {
    this.props.history.push(`/${this.state.user.uid}/settings`);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GlobalHeader
          user={this.state.user}
          isOpenHelpDialog={this.state.isOpenHelpDialog}
          openHelpDialog={this.openHelpDialog.bind(this)}
          closeHelpDialog={this.closeHelpDialog.bind(this)}
          logout={this.logout.bind(this)}
          goSettings={this.goSettings.bind(this)}
        />
        <Switch>
          <Route exact strict path="/" render={(props) => { if (this.state.user.uid !== '') { return <Core userId={this.state.user.uid} {...props} />; } return (<Top {...props} />); }} />
          <Route exact strict path="/signup" render={props => <Signup signup={this.signup.bind(this)} login={this.login.bind(this)} {...props} />} />
          <Route exact strict path="/login" render={props => <Login login={this.login.bind(this)} {...props} />} />
          <Route exact strict path="/logout" render={props => <Logout {...props} />} />
          <Route exact strict path="/:id/settings" render={(props) => { if (this.state.user.uid !== '') { return <Settings user={this.state.user} handleUser={this.handleUser.bind(this)} {...props} />; } return null; }} />
        </Switch>
        <Dialog open={this.state.processing}>
          <CircularProgress className={classes.circularProgress} size={60} />
        </Dialog>
        <Dialog open={this.state.isOpenSupportBrowserDialog}>
          <DialogTitle>サポート対象外ブラウザです</DialogTitle>
          <DialogContent>
            <DialogContentText>
            本サービスは現在{constants.SUPPORTEDBROWSERS}での動作をサポートしております。<br />
            お手数ですが、{constants.SUPPORTEDBROWSERS}で開きなおすか、下記のボタンを押してダウンロードして下さい。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                window.open(constants.CHROME_DL_URL);
                this.setState({ isOpenSupportBrowserDialog: false });
              }}
              color="primary"
              autoFocus
            >
              ダウンロードする
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.isOpenSnackbar}
          onClose={() => { this.setState({ isOpenSnackbar: false, snackbarText: '' }); }}
          message={this.state.snackbarText}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  history: PropTypes.object.isRequired, // eslint-disable-line
};


export default withRouter(withStyles(styles)(App));

