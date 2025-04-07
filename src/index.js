import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Priere from './pages/priere';
import { DemandeAmi } from './pages/demandeAmi';
import { MesGroupes } from './pages/mesGroupes';
import { LesGroupes } from './pages/lesGroupes';
import { Groupes } from './pages/groupe';
import { ApercuGroupe } from './pages/apercuGroupe';
import { InfoGroupe } from './pages/infoGroupe';
import { SuggestionPersonne } from './pages/suggestionFriend';
import  Amitie  from './pages/amitie';
import { Musique } from './pages/musique';
import { Profile } from './pages/profile';
import { Predication } from './pages/predication';
import { EditProfile } from './pages/editProfile';
import { PremierAmi } from './pages/premierAmi';
import { PremierGroupe } from './pages/premierGroupe';
import Login from './pages/login';
import Signup from './pages/signup';
import FormDon from './pages/formdon';
import NousJoindre from './pages/nousJoindre';
import EnvoyerSuggestion from './pages/envoyerSuggestion';
import { DiscussionInbox } from './pages/discussionInbox';
import { ListeDiscussion } from './pages/listeDiscussion';
import { Notification } from './pages/notification';
import { FriendInline } from './pages/friendInline';
import { HomepageSkeleton } from './skeletons/homepage';
import { GroupeSkeleton } from './skeletons/groupe';
import { MesGroupeSkeleton } from './skeletons/mesgroupes';
import { LesGroupeSkeleton } from './skeletons/lesgroupes';
import { PredicationMusique } from './skeletons/predicationmusique';
import { SuggestionAmi } from './skeletons/suggestionami';
import { DemandeSkeleton } from './skeletons/demande';
import { NotificationSkeleton } from './skeletons/notification';
import { ListeDiscussionSkeleton } from './skeletons/listediscussion';
import { ProfileSkeleton } from './skeletons/profile';
import { NouvelleDiscussion } from './pages/nouvellediscussion';
import { EmailNotice } from './pages/authentification/emailnotice';
import { EmailVerify } from './pages/authentification/emailverify';
import { ForgotNotice } from './pages/authentification/forgotPasswordNotice';
import { EnterEmail } from './pages/authentification/enterEmail';
import { NewPassword } from './pages/authentification/newPassword';
import { MonoGroupe } from './pages/monogroupe';
import { Monopublicationgroupe } from './pages/monopublicationgroupe';
import { TokenProvider } from './contexte/tokenContexte';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Pourriezconnaitre } from './skeletons/pourriezconnaitre';
import { Quelquegroupe } from './skeletons/quelquegroupe';
import { Partageskeleton } from './skeletons/partageskeleton';
import { PublicationCardSkeleton } from './skeletons/publication-skeleton';
import { RecherchePersonne } from './pages/recherchepersonne';
import { UserProvider } from './contexte/userContexte';
import { Monopublicationactualite } from './pages/monopost';
import { MonoPublicationCardGroupeSkeleton } from './skeletons/monopostgroupe';
import { ApercuGroupeSkeleton } from './skeletons/apercuGroupeSkeleton';
import { DemandeDivDroitSkeleton } from './skeletons/demandedivdroit';
import { DiscussionInboxSkeleton } from './skeletons/discussionInbox';
import { NouvelleDiscussionSkeleton } from './skeletons/nouvellediscussion';
import { EditProfileSkeleton } from './skeletons/editProfil';
import { Monopredication } from './pages/monopredication';
import { Monomusique } from './pages/monomusique';
import { AddPredication } from './pages/addpredication';
import { AddMusique } from './pages/addmusique';
import { TotalUser } from './pages/totaluser';
import { VerificationGroupe } from './pages/verificationgroupe';
import { GroupeNonValide } from './pages/groupenonvalide';
import { Description } from './pages/description';
import InformerUser from './pages/informerUser';
import NotifierUser from './pages/notifierUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient= new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:true
    }
  }
});

root.render(
  <React.StrictMode>
  <TokenProvider>
  <QueryClientProvider client={queryClient}>
 <UserProvider>
 
  <BrowserRouter>
   <Routes>
    <Route path='/' element={ <App />}/>
    {/* <Route path='/priere' element={ <Priere />}/> */}
    <Route path='/demande' element={ <DemandeAmi />}/>
    <Route path='/mes-groupes' element={ <MesGroupes />}/>
    <Route path='/les-groupes/:categorie' element={ <LesGroupes />}/>
    <Route path='/groupes' element={ <Groupes />}/>
    <Route path='/groupe/:id' element={ <ApercuGroupe />}/>
    <Route path='/info-groupe/:id' element={ <InfoGroupe />}/>
    <Route path='/suggestion-personne' element={ <SuggestionPersonne />}/>
    <Route path='/amitie' element={ <Amitie />}/>
    <Route path='/musique' element={ <Musique />}/>
    <Route path='/profile/:id' element={ <Profile />}/>
    <Route path='/predication' element={ <Predication />}/>
    <Route path='/edit-profile/:id' element={ <EditProfile />}/>
    <Route path='/premiere-suggestion' element={ <PremierAmi />}/>
    <Route path='/premiers-groupes' element={ <PremierGroupe />}/>
    <Route path='/login' element={ <Login />}/>
    <Route path='/signup' element={ <Signup />}/>
    <Route path='/don' element={ <FormDon />}/>
    <Route path='/nous-joindre' element={ <NousJoindre />}/>
    <Route path='/envoyer-suggestion' element={ <EnvoyerSuggestion />}/>
    <Route path='/discussion/:id' element={ <DiscussionInbox />}/>
    <Route path='/liste-discussion' element={ <ListeDiscussion />}/>
    <Route path='/notifications' element={ <Notification />}/>
    <Route path='/friend-inline' element={ <FriendInline />}/>
    <Route path='/email-notice/:email' element={ <EmailNotice />}/>
    <Route path='/verify-email' element={ <EmailVerify />}/>
    {/* <Route path='/verify-password/:email/:token' element={ <PasswordVerify />}/> */}
    <Route path='/forgot-notice/:email' element={ <ForgotNotice />}/>
    <Route path='/enter-email' element={ <EnterEmail />}/>
    <Route path='/new-password/:email/:token' element={ <NewPassword />}/>
    <Route path='/mono-groupe/:id/:cle' element={ <MonoGroupe />}/>
    <Route path='/mono-publication-groupe/:id' element={ <Monopublicationgroupe />}/>
    <Route path='/rechercher-personne' element={ <RecherchePersonne />}/>
    <Route path='/mono-post-actualite/:id' element={ <Monopublicationactualite />}/>
    <Route path='/predication/:idpredication' element={ <Monopredication />}/>
    <Route path='/musique/:idmusique' element={ <Monomusique />}/>
    <Route path='/add-secret-predication' element={ <AddPredication />}/>
    <Route path='/add-secret-musique' element={ <AddMusique />}/>
    <Route path='/all-users' element={ <TotalUser/>}/>
    <Route path='/secret-groupe-non-valide' element={ <GroupeNonValide/>}/>
    <Route path='/verification-groupe' element={ <VerificationGroupe/>}/>
    <Route path='/description' element={ <Description/>}/>
    <Route path='/informer-users' element={ <InformerUser/>}/>
    <Route path='/notifier-users' element={ <NotifierUser/>}/>



    {/* partie des skeletons  */}
    <Route path='/homepage-skeleton' element={ <HomepageSkeleton />}/>
    <Route path='/groupes-skeleton' element={ <GroupeSkeleton />}/>
    <Route path='/mesgroupes-skeleton' element={ <MesGroupeSkeleton />}/>
    <Route path='/lesgroupes-skeleton' element={ <LesGroupeSkeleton />}/>
    <Route path='/predicationmusique-skeleton' element={ <PredicationMusique />}/>
    <Route path='/suggestion-skeleton' element={ <SuggestionAmi />}/>
    <Route path='/demande-skeleton' element={ <DemandeSkeleton />}/>
    <Route path='/notification-skeleton' element={ <NotificationSkeleton />}/>
    <Route path='/listediscussion-skeleton' element={ <ListeDiscussionSkeleton />}/>
    <Route path='/profile-skeleton' element={ <ProfileSkeleton />}/>
    <Route path='/nouvelle-discussion' element={ <NouvelleDiscussion />}/>
    <Route path='/pourriez-connaitre' element={ <Pourriezconnaitre />}/>
    <Route path='/quelque-groupe' element={ <Quelquegroupe />}/>
    <Route path='/partage-skeleton' element={ <Partageskeleton />}/>
    <Route path='/publication-card-skeleton' element={ <PublicationCardSkeleton />}/>
    <Route path='/publication-card-groupe-skeleton' element={ <MonoPublicationCardGroupeSkeleton />}/>
    <Route path='/apercugroupe-skeleton' element={ <ApercuGroupeSkeleton />}/>
    <Route path='/demande-divdroit' element={ <DemandeDivDroitSkeleton />}/>
    <Route path='/inbox-skeleton' element={ <DiscussionInboxSkeleton />}/>
    <Route path='/nouvelle-discussion-skeleton' element={ <NouvelleDiscussionSkeleton />}/>
    <Route path='/edit-profile-skeleton' element={ <EditProfileSkeleton />}/>
   </Routes>
   </BrowserRouter>
  
 </UserProvider>
 </QueryClientProvider>
  </TokenProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
