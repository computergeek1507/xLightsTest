import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";

import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app";
//import { getAnalytics, logEvent } from "firebase/analytics";


export function initSavedDB() {
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  //logEvent(analytics, 'started');
  //Analytics.logEvent("login");
}   

// export function writeData(key, data) {
//   const db = getDatabase();
//   const reference = ref(db,`historyData/${key}`);
//   set(reference, data);
// }
export function storePrintItem(item) {
  //firebase.database().ref("historyData/").push(item);
    const db = getDatabase();
    const reference = ref(db,'printData/');
    push(reference, item);
}

export function setupPrintListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "printData/");
  onValue(reference, (snapshot) => {
    //console.log("setupHistoryListener fires up with: ", snapshot);
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        //console.log(key, "||", index, "||", fbObject[key]);
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
} 

export function deletePrintData(item) {
  const db = getDatabase();
  const reference = ref(db, `printData/${item.id}`);
  remove(reference);
}