import { observable, action, runInAction } from 'mobx';
import sleep from 'celia/sleep';

class LoginStore {
  @observable disabledUsername = true;

  @observable disabledPassword = true;

  @observable isLogging = false;

  @observable passwordStatus = '';

  @observable password = '';

  @observable fields = {
    username: '',
    password: ''
  };

  @action
  updateFields(content) {
    Object.assign(this.fields, content);
  }

  @action
  updateState(content) {
    Object.assign(this, content);
  }

  @action
  loginSuccess() {
    let now = Date.now();
    const session = Math.random().toString(36).slice(2) + now.toString(36);
    now = new Date(now + 30 * 60 * 1000);
    document.cookie = `TMD_SESSIONID=${session};expires=${now.toUTCString()}`;

    this.isLogging = false;
  }

  @action
  async login() {
    // 按钮上出现loading
    this.isLogging = true;

    const { username, password } = this.fields;
    if (username === 'admin' && password === 'admin') {
      await sleep(2000);
      runInAction('loginSuccess', () => {
        this.loginSuccess();
      });
      return { code: 200 };
    } else {
      runInAction('updateState', () => {
        this.isLogging = false;
      });
      return Promise.reject({ code: 401, message: '用户名或者密码错误' });
    }
  }
};

export default new LoginStore();
