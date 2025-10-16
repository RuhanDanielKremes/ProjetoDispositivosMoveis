import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import CadastroSolicitacao from './pages/CadastroSolicitacao';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import SolicitacoesPage from './pages/SolicitacoesPage';
import SolicitacoesShowdownPage from './pages/SolicitacoesShowdownPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';

async function testFirebase() {
  try {
    const snapshot = await getDocs(collection(db, "test"));
    console.log("🔥 Firebase conectado!", snapshot.size, "documentos encontrados.");
  } catch (error) {
    console.error("❌ Erro ao conectar:", error);
  }
}

testFirebase();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/SolicitacoesShowdownPage/:id">
            <SolicitacoesShowdownPage />
          </Route>
          <Route exact path="/SolicitacoesShowdownPage">
            <Redirect to="/solicitacoesPage" />
          </Route>
          <Route exact path="/solicitacoesPage">
            <SolicitacoesPage />
          </Route>
          <Route path="/CadastroSolicitacao">
            <CadastroSolicitacao />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
