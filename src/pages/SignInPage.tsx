import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonPage, IonTitle, IonToggle } from "@ionic/react"
import logoUTFPR from "../../assets/images/logo_utfpr.png";
import { personCircle, lockClosed, navigate, mail } from "ionicons/icons";
import './SignInPage.css';
import { useHistory } from "react-router-dom";
import { Authorization } from "../controller.tsx/Authorization";
import { useState } from "react";
import { auth } from "../firebase";

const SignInPage: React.FC = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signIn() {
        await Authorization.createAccount(name, email, password).then(async (bool) => {
            if (bool) {
                await alert("Conta criada com sucesso!");
                history.push("/login");
            } else {
                alert("Erro ao criar conta. Tente novamente.");
            }
        });
    }

    return (
        <IonPage id="main-content">
            <IonContent fullscreen>
                <div className="setCenter">
                    <div className="mainContainer"> 
                        <IonImg src={logoUTFPR} onClick={() => history.push("/recipes")}></IonImg>
                        <IonItem id="II01" className="ionItemBottonBorder itemLightBackground1" style={{marginTop : "20px"}}>
                            <IonTitle className="ion-text-center" size="large" style={{marginBottom: "20px", marginTop: "20px", color:"#000", fontSize:"40px"}}>Subscribe</IonTitle>
                        </IonItem>
                        <IonItem id="II02" className="ion-item-login itemLightBackground1" style={{maxWidth: "600px"}}>
                            {/* <form onSubmit={handleSubmit(tryLogin)}> */}
                            <form>
                                <IonItem id="II03" className="ion-item-login itemLightBackground1 greyText" style={{ "--min-height": "80px", marginTop: "20px"}}>
                                    <IonIcon icon={personCircle} color="primary" style={{marginRight: "20px"}}></IonIcon>
                                    <IonInput className="ion-input-login" label="Usuário" labelPlacement="floating"  placeholder="Usuário" id="User" required style={{width:"460px"}}
                                    value={name} onIonChange={(e) => setName(e.detail.value!)}></IonInput>
                                </IonItem>
                                <IonItem id="II05" className="ion-item-login itemLightBackground1 greyText" style={{ "--min-height": "80px", Width: "400px" }}>
                                    <IonIcon icon={mail} color="primary" style={{marginRight: "20px"}}></IonIcon>
                                    <IonInput className="ion-input-login" label="Email" labelPlacement="floating" placeholder="Email" id="email" required style={{ width: "460px" }}
                                    value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                                </IonItem>
                                <IonItem id="II04" className="ion-item-login itemLightBackground1 greyText" style={{ "--min-height": "80px", Width: "400px" }}>
                                    <IonIcon icon={lockClosed} color="primary" style={{marginRight: "20px"}}></IonIcon>
                                    <IonInput className="ion-input-login" label="Senha" labelPlacement="floating" placeholder="Senha" id="password" type="password" required style={{width:"460px"}}
                                    value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                                </IonItem>
                                <div className="setCenter">
                                    <IonButton id="signInButton" className="loginButtons" onClick={() => (signIn())}>Subscribe</IonButton>
                                </div>
                            </form>
                        </IonItem>
                        <IonItem style={{justifyContent:"center"}} id="subscribeContainer" className="ion-item-login itemLightBackground1 greyText" lines="none">
                            <p>Already have an account?</p>
                            <a href="/login" style={{paddingLeft:"3px"}}>Login!</a>
                        </IonItem>
                        {/* <IonButton type="button" onClick={() => history.push("/recipe")}>Go to recipes</IonButton> */}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )

}

export default SignInPage;