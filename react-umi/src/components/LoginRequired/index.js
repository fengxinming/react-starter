import { Redirect } from 'umi';

// 模拟校验
function isLogged() {
  return document.cookie.indexOf('TMD_SESSIONID=') > -1;
}

export default (props) => {
  return isLogged()
    ? (<>{props.children}</>)
    : (<Redirect to="/login" />)
    ;
}
