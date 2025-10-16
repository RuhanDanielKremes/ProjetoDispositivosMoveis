import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './CadastroSolicitacao.css';
import { useHistory } from 'react-router-dom';
import { arrowBack, cameraOutline, exit } from 'ionicons/icons';
import { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { RequisitionController } from '../controller.tsx/RequisitionController';
import { Requisition } from '../models/Requisitions';
import { ImageController } from '../controller.tsx/ImageController';
import { UserController } from '../controller.tsx/UserController';

const CadastroSolicitacao: React.FC = () => {
  
  const history = useHistory();
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

   const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl // retorna em base64
      });

      setPhoto(image.dataUrl || null);
    } catch (err) {
      console.error("Erro ao tirar foto:", err);
    }
  };
  
  const handleSubmit = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      let requisition = new Requisition();
      requisition.setTitle(title);
      requisition.setDescription(description);
      requisition.setDate(new Date());
      requisition.setLatitude(position.coords.latitude);
      requisition.setLongitude(position.coords.longitude);
      let data = await RequisitionController.createRequisition(requisition);
      console.log("Requisição criada com sucesso:", data);
      if (photo) {
        const userId = await UserController.getUserId();
        if (userId) {
          let imageUrl = await ImageController.uploadImage(photo, userId);
          console.log("Imagem enviada com sucesso:", imageUrl);
          if (imageUrl) {
            let updated = await RequisitionController.updatePhotoUrl(data, imageUrl);
            if (updated) {
              console.log("URL da foto atualizada com sucesso na requisição.");
              alert("Requisição criada com sucesso!");
              window.location.href = "/solicitacoesPage";
            } else {
              console.error("Erro ao atualizar a URL da foto na requisição.");
              alert("Requisição criada, mas houve um erro ao atualizar a foto.");
            }
          } else {
            console.error("Erro ao fazer upload da imagem.");
            alert("Requisição criada, mas houve um erro ao enviar a foto.");
          }
        } else {
          console.error("Usuário não está autenticado. Não foi possível obter o userId.");
          alert("Requisição criada, mas houve um erro de autenticação.");
        }
      } else {
        console.warn("Nenhuma foto foi tirada para upload.");
        alert("Requisição criada com sucesso, sem foto.");
      }
    } catch (err) {
      console.error("Erro ao pegar localização:", err);
      alert("Erro ao criar requisição: " + err);
    }
  };

  return (
    <IonPage>
      <IonHeader color='white'>
        <IonToolbar className='custom-toolbar2'>
          <IonButtons slot='start'>
            <IonButton onClick={() => history.push("/solicitacoesPage")}>
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>NOVA SOLICITAÇÃO</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={handleSubmit}>CADASTRAR</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">NOVA SOLICITAÇÃO</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab slot='fixed' vertical='bottom' horizontal='end'>
          <IonFabButton onClick={() => history.push("/login")} color={"danger"}>
            <IonIcon icon={exit}></IonIcon>
          </IonFabButton>
        </IonFab>
        <div className='MainDiv'>
            <form>
              <IonItem>
                <IonInput 
                  placeholder='Título' 
                  value={title} 
                  onIonChange={(e) => setTitle(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonTextarea 
                  placeholder='Descrição' 
                  value={description} 
                  onIonChange={(e) => setDescription(e.detail.value!)}
                />
              </IonItem>
              <IonButton expand="block" onClick={takePhoto} className="ion-margin-top">
                <IonIcon slot="start" icon={cameraOutline} />
                Tirar Foto
              </IonButton>
              {photo && (
                <IonImg src={photo} className="ion-margin-top" />
              )}
            </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CadastroSolicitacao;
