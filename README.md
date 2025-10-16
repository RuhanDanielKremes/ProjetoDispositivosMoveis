npm install
npm run build

Isso vai gerar a pasta build com os arquivos web que o Capacitor usa.
Depois disso, você sincroniza para o Android:

npx cap sync android

No Android Studio
Clique em Open (ou Open an existing project).
Navegue até o diretório do seu projeto projetodispositivosmoveisfront/android/.
Confirme. O Android Studio vai reconhecer o Gradle e o SDK.
Espere ou realize a ação de sicronizar completar

OPÇÃO 1
Build > Build APK(s) > Build APK ou Generate Signed Bundle / APK
projetodispositivosmoveisfront\android\app\build\outputs\apk\release\app-release-unsigned.apk

OPÇÃO 2
Escolha seu dispositivo e rode como DEBUG

OPÇÃO 3 (RECOMENDADO)
Baixe a extensão WebNative, depois de instalar, abra o projeto na pasta raiz
Quando ele terminar de carregar ele vai disponibilizar para exibição nas versões
-> WEB (testado)
-> Android (testado)
-> IOS (não testado)

----VIDEO DO APP---
https://photos.app.goo.gl/7zuNHbGSQJnT2hWM7
---APK do APP---
https://drive.google.com/file/d/1VRsWjTnGkOISyiMz8EF0LzHVA8daeu3j/view?usp=sharing

1. Requisitos de Sistema

Antes de rodar o projeto, certifique-se de ter instalado:

Node.js (v18 ou superior recomendável)
Java Development Kit (JDK)
Necessário para compilar o projeto Android. Pode ser:

Java 17 E Java 21
Download JDK

Android Studio (para compilar e testar no Android)
Download Android Studio

Ionic CLI
Para rodar e compilar o projeto Ionic:

npm install -g @ionic/cli


Capacitor (já vem com o projeto Ionic, mas pode instalar globalmente):

npm install @capacitor/core @capacitor/cli


Firebase Tools (opcional, mas necessário para deploy ou debug avançado):

npm install -g firebase-tools

2. Configuração do Projeto

Clonar o projeto:

git clone [<URL_DO_REPOSITORIO>](https://github.com/RuhanDanielKremes/ProjetoDispositivosMoveis/)
cd projetodispositivosmoveisfront


Instalar dependências:

npm install


Configurar Firebase:

Criar projeto no Firebase Console

Adicionar Web App (para localhost) e copiar o Firebase Config.

Colocar o config no arquivo src/firebase.ts:

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


Permissões do Firebase (Firestore e Storage)

Para teste rápido, você pode colocar modo aberto:

// Firestore rules
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

// Storage rules
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}

3. Rodando o Projeto
3.1 Web
ionic serve


Abrirá o projeto no navegador em http://localhost:8100.

3.2 Android

Adicionar plataforma Android:

npx cap add android


Abrir Android Studio:

npx cap open android


Compilar e rodar no emulador ou dispositivo físico.

4. Estrutura do Projeto

src/ – código-fonte React + Ionic

src/firebase.ts – configuração do Firebase

src/models/ – modelos de dados (Requisition, User, etc)

src/controller/ – classes de acesso a Firestore e Storage

src/pages/ – telas do aplicativo

5. Dependências Principais

@ionic/react – framework Ionic React

@ionic/react-router – roteamento Ionic

firebase – Firebase SDK

react-router-dom – navegação

@capacitor/core – ponte para dispositivos móveis

6. Observações

Certifique-se de que o dispositivo/mobile e o PC estão na mesma rede para rodar no navegador e no dispositivo físico.

Para Firebase Authentication, se usar localhost, adicione http://localhost:8100 nos domínios autorizados.

Para upload de imagens, configure CORS no Firebase Storage para permitir requisições do localhost.
