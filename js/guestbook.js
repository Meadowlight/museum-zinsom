// Firebase SDK 초기화 (index.html에 firebase-app.js, firestore.js 포함되어야 함)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 데이터 불러오기
function loadEntries(target) {
  const container = document.getElementById(`entries-${target}`);
  container.innerHTML = '';

  db.collection(target)
    .orderBy('timestamp', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
          <div contenteditable="false" class="msg" id="msg-${doc.id}">${data.message}</div>
          <div class="actions">
            <button onclick="editEntry('${target}', '${doc.id}')">수정</button>
            <button onclick="deleteEntry('${target}', '${doc.id}')">삭제</button>
          </div>
        `;
        container.appendChild(div);
      });
    });
}

// 작성하기
function addEntry(target) {
  const input = document.getElementById(`input-${target}`);
  const message = input.value.trim();
  if (!message) return;

  db.collection(target).add({
    message,
    timestamp: new Date()
  }).then(() => {
    input.value = '';
    loadEntries(target);
  });
}

// 삭제하기
function deleteEntry(target, id) {
  db.collection(target).doc(id).delete().then(() => {
    loadEntries(target);
  });
}

// 수정하기
function editEntry(target, id) {
  const msgEl = document.getElementById(`msg-${id}`);
  const isEditing = msgEl.contentEditable === 'true';

  if (isEditing) {
    db.collection(target).doc(id).update({
      message: msgEl.innerText.trim()
    }).then(() => {
      msgEl.contentEditable = 'false';
    });
  } else {
    msgEl.contentEditable = 'true';
    msgEl.focus();
  }
}

// 초기 불러오기
loadEntries('jjin');
loadEntries('ssom');
