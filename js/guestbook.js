// js/guestbook.js

// Firebase import (v9 모듈 방식)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "zzinsom-diary.firebaseapp.com",
  projectId: "zzinsom-diary",
  storageBucket: "zzinsom-diary.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 글 불러오기
async function loadEntries(target) {
  const container = document.getElementById(`entries-${target}`);
  container.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, target));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <div class="msg" contenteditable="false" id="msg-${target}-${docSnap.id}">${data.message}</div>
      <div class="actions">
        <button onclick="editEntry('${target}', '${docSnap.id}')">수정</button>
        <button onclick="deleteEntry('${target}', '${docSnap.id}')">삭제</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// 글 작성하기
window.addEntry = async function(target) {
  const input = document.getElementById(`input-${target}`);
  const msg = input.value.trim();
  if (msg === '') return;
  await addDoc(collection(db, target), { message: msg });
  input.value = '';
  loadEntries(target);
}

// 글 삭제하기
window.deleteEntry = async function(target, id) {
  await deleteDoc(doc(db, target, id));
  loadEntries(target);
}

// 글 수정하기
window.editEntry = async function(target, id) {
  const msgEl = document.getElementById(`msg-${target}-${id}`);
  if (msgEl.contentEditable === 'true') {
    await updateDoc(doc(db, target, id), { message: msgEl.innerText.trim() });
    msgEl.contentEditable = 'false';
  } else {
    msgEl.contentEditable = 'true';
    msgEl.focus();
  }
}

// 초기 로딩
window.onload = () => {
  loadEntries('jjin');
  loadEntries('ssom');
}
