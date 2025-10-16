import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToggle } from "@ionic/react"
import logoUTFPR from "../../assets/images/logo_utfpr.png";
import { personCircle, lockClosed, navigate, mail } from "ionicons/icons";
import './LoginPage.css';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Authorization } from "../controller.tsx/Authorization";

const LoginPage: React.FC = () => {
    const history = useHistory();
    let username = localStorage.getItem("username") || "";
    let usertoken = localStorage.getItem("token") || "";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function tryLogin() {
        await Authorization.login(email, password).then((result) => {
            if (result) {
                window.location.href = "/solicitacoesPage";
            } else {
                alert("Erro ao fazer login. Verifique suas credenciais.");
            }
        });
    }

    function logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <IonPage id="main-content">
            <IonContent fullscreen>
                <div className="setCenter">
                    <div className="mainContainer"> 
                        <IonImg src={logoUTFPR} onClick={() => window.location.href = "/solicitacoesPage"}></IonImg>
                        <IonItem id="II01" className="ionItemBottonBorder itemLightBackground1" style={{marginTop : "20px"}}>
                            <IonTitle className="ion-text-center" size="large" style={{marginBottom: "20px", marginTop: "20px", color:"#000", fontSize:"40px"}}>LOGIN</IonTitle>
                        </IonItem>
                        {
                            (username !== "" && usertoken !== "") ? (
                                <div id="subscribeContainer">
                                    <IonIcon icon={personCircle} id="userIcon"/>
                                    <IonLabel id="usernameLabel">{username}</IonLabel>
                                    <div style={{display:"block"}}>
                                        <IonButton id="loginButton" className="loginButtons" onClick={() => {history.push("/solicitacoesPage")}}>LOGIN</IonButton>
                                        <IonButton id="logoutButton" className="loginButtons" onClick={logout}>LOGOUT</IonButton>
                                    </div>
                                </div>
                            ) : 
                                <>
                                    <IonItem id="II02" className="ion-item-login itemLightBackground1" style={{maxWidth: "600px"}}>
                                        {/* <form onSubmit={handleSubmit(tryLogin)}> */}
                                        <form>
                                            <IonItem id="II03" className="ion-item-login itemLightBackground1 greyText" style={{ "--min-height": "80px", marginTop: "20px"}}>
                                                <IonIcon icon={mail} color="primary" style={{marginRight: "20px"}}></IonIcon>
                                                <IonInput className="ion-input-login" label="Email" labelPlacement="floating"  placeholder="Email" id="User" required style={{width:"460px"}}
                                                value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                                            </IonItem>
                                            <IonItem id="II04" className="ion-item-login itemLightBackground1 greyText" style={{ "--min-height": "80px", Width: "400px" }}>
                                                <IonIcon icon={lockClosed} color="primary" style={{marginRight: "20px"}}></IonIcon>
                                                <IonInput className="ion-input-login" label="Senha" labelPlacement="floating" placeholder="Senha" id="password" type="password" required style={{width:"460px"}}
                                                value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                                            </IonItem>
                                            <div className="setCenter">
                                            {
                                                    (username !== "" && usertoken !== "") ? (
                                                        <>
                                                            <IonButton id="loginButton" className="loginButtons">LOGIN AS {username}</IonButton>
                                                            <IonButton id="logoutButton" className="loginButtons">LOGOUT</IonButton>
                                                        </>
                                                    ) : (
                                                        <IonButton id="loginButton" className="loginButtons" onClick={tryLogin}>LOGIN</IonButton>
                                                )
                                            }
                                            </div>
                                        </form>
                                    </IonItem>
                                    <IonItem style={{justifyContent:"center"}} id="subscribeContainer" className="ion-item-login itemLightBackground1 greyText" lines="none">
                                        <p>Does you not have an login?</p>
                                        <a href="/signin" style={{paddingLeft:"3px"}}>Subscribe!</a>
                                    </IonItem>
                                </>
                        }
                        {/* <IonItem>
                            <IonToggle checked={username !== "" && usertoken !== ""} onIonChange={e => {
                                if (e.detail.checked) {
                                    localStorage.setItem("username", "testuser");
                                    localStorage.setItem("usertoken", "testtoken");
                                } else {
                                    localStorage.removeItem("username");
                                    localStorage.removeItem("usertoken");
                                }
                            }}></IonToggle> Remember me
                        </IonItem> */}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )

}

export default LoginPage;