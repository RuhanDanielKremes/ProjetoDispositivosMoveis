import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

import { add, exit } from 'ionicons/icons';
import { Requisition } from '../models/Requisitions';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { RequisitionController } from '../controller.tsx/RequisitionController';

const SolicitacoesPage: React.FC = () => {

  const history = useHistory();
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);

  useEffect(() => {
  const fetchRequisitions = async () => {
    const data = await RequisitionController.listRequisitions();
    setRequisitions(data);
  };

  fetchRequisitions();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonTitle>Solicitações Públicas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push("/CadastroSolicitacao")}>
              <IonIcon icon={add}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" />
        <IonFab slot='fixed' vertical='bottom' horizontal='end'>
          <IonFabButton onClick={() => history.push("/login")} color={"danger"}>
            <IonIcon icon={exit}></IonIcon>
          </IonFabButton>
        </IonFab>
          <div className='MainDiv'>
            <IonItem>LISTA DE SOLICITAÇÕES PÚBLICAS</IonItem>
            <IonList>
            {
              requisitions.length > 0 ? (
                requisitions
                  .sort((a, b) => b.getDate().getTime() - a.getDate().getTime())
                  .map((req, index) => (
                    <IonItem
                      key={index} // usa id ou índice se id for undefined
                      onClick={() => {
                        window.location.href = `/SolicitacoesShowdownPage/${req.getId()}`;
                      }}
                    >
                    <IonLabel>
                      <h2>{req.getTitle()} - {req.getDate().toLocaleDateString()}</h2>
                      <p>{req.getDescription()}</p>
                    </IonLabel>
                  </IonItem>
                ))
              ) : (
                <IonItem>Nenhuma solicitação encontrada.</IonItem>
              )
            }
            </IonList>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default SolicitacoesPage;
