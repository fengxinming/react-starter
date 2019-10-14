import styles from './index.module.css';

function BasicLayout(props) {
  return props.location.pathname !== '/' ? props.children : (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
