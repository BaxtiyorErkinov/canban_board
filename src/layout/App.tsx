import { Container } from '../features';

import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <main className={styles.main__wrapper}>
        <Container />
      </main>
    </div>
  );
}

export default App;
