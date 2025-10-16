import { IonAlert, IonContent, IonFab, IonFabButton, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle } from '@ionic/react';
import './Tab1.css';
import { arrowBack, chatbox, checkmarkDone, close, pencil, trashBin } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { Requisition } from '../models/Requisitions';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { RequisitionController } from '../controller.tsx/RequisitionController';
import { UserController } from '../controller.tsx/UserController';

interface RouteParams {
  id: string;
}

const SolicitacoesShowdownPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [requisition, setRequisition] = useState<Requisition | null>(null);
  const [requisitionOwner, setRequisitionOwner] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return; // evita erro se id não existir
    const fetchRequisition = async () => {
      const req = await RequisitionController.getRequisitionById(id);
      setRequisition(req);
      const userId = await UserController.getUserId();
      setRequisitionOwner(req?.getUserId() === userId);
    };
    fetchRequisition();
  }, [id]);

  const history = useHistory();


  const [showAlert, setShowAlert] = useState(false);

  const [edit, setEdit] = useState(false);

  async function handleDelete() {
    if (requisition) {
      console.log("Deletando requisição id: " + requisition.getId());
      await RequisitionController.deleteRequisition(requisition);
    } else {
      console.log("Requisição não encontrada para deletar.");
    }
    window.location.href = "/SolicitacoesPage";
  }

  function handleCancelEdit() {
    setEdit(false);
  }

  async function handleSaveEdit() {
    setEdit(false);

    if (!requisition) {
      console.log("Requisição não encontrada para editar.");
      return;
    }

    await RequisitionController.updateRequisition(requisition).then((success) => {
      if (success) {
        console.log("Requisição atualizada com sucesso.");
        alert("Requisição atualizada com sucesso.");
      } else {
        alert("Erro ao atualizar a requisição.");
        console.log("Erro ao atualizar a requisição.");
      }
    });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonFab slot='fixed' vertical='bottom' horizontal='start'>
          <IonFabButton onClick={() => history.push("/SolicitacoesPage")} style={{background:"mone"}}>
            <IonIcon icon={arrowBack}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonFab slot='fixed' vertical='bottom' horizontal='end'>
          <IonFabButton onClick={() => setShowAlert(true)}>
            <IonIcon icon={chatbox}></IonIcon>
          </IonFabButton>
        </IonFab>
        <div className='MainDiv'>
          <IonItem>
            <IonLabel>DATA: {requisition?.getDate() ? new Date(requisition.getDate()).toLocaleDateString() : ""}</IonLabel>
            {requisitionOwner && (
              <>
                <IonIcon icon={!edit ? pencil : checkmarkDone} size="large" onClick={() => (!edit ? setEdit(true) : handleSaveEdit())} color={!edit?"primary":"success"} />
                <IonIcon icon={!edit ? trashBin : close} size="large" onClick={() => (!edit ? handleDelete() : handleCancelEdit())} color={!edit?"danger":"medium"}/>
              </>
            )}
          </IonItem>
          <IonItem>
            <IonInput
              value={requisition?.getTitle() ?? "Sem título"}
              disabled={!edit}
              onIonInput={(e: CustomEvent) => requisition?.setTitle(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>LATITUDE: {requisition?.getLatitude() ?? "Sem latitude"}</IonLabel>
            <IonLabel>LONGITUDE: {requisition?.getLongitude() ?? "Sem longitude"}</IonLabel>
          </IonItem>
          <IonTextarea
            value={requisition?.getDescription() ?? "Sem descrição"}
            disabled={!edit}
            onIonInput={(e: CustomEvent) => requisition?.setDescription(e.detail.value!)}
          ></IonTextarea>
          <IonImg src={requisition?.getPhotoUrl() ?? ""} />
        </div>
        <div className='MainDiv'>
          <IonTitle>Comentários</IonTitle>
          {
            requisition?.comments && requisition.comments.length > 0 ? (
              requisition.comments.map((comment, index) => (
                <IonItem key={index}>
                  <IonLabel>{comment}</IonLabel>
                </IonItem>
              ))
            ) : (
              <IonItem>Nenhum comentário.</IonItem>
            )
          }
        </div>


        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Novo Comentário"
          inputs={[
            {
              name: 'comentarioTexto',
              type: 'text',
              placeholder: 'Digite seu comentário aqui...'
            }
          ]}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Comentário cancelado');
              }
            },
            {
              text: 'Salvar',
              handler: (data) => {
                if (!data.comentarioTexto || data.comentarioTexto.trim() === '') {
                  console.log('Comentário vazio, não salvo.');
                  return;
                }
                if (!requisition) {
                  console.log('Requisição não encontrada, comentário não salvo.');
                  return;
                }
                if (!requisition.comments) {
                  requisition.comments = [];
                }
                requisition.comments.push(data.comentarioTexto);
                setRequisition(Object.assign(Object.create(Object.getPrototypeOf(requisition)), requisition));
                RequisitionController.addComment(requisition.getId()!, data.comentarioTexto);
                console.log('Comentário salvo:', data.comentarioTexto);
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default SolicitacoesShowdownPage;